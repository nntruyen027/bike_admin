import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function Detail({ user, }) {
  const [messages, setMessages,] = useState([]);
  const [newMessage, setNewMessage,] = useState('');
  const [socket, setSocket,] = useState(null);

  useEffect(() => {
    getMessages();
    // Khởi tạo socket khi component được mount
    const ws = new WebSocket('ws://localhost:8000/ws/chat/');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      // Đóng kết nối khi component bị unmount
      if (socket) {
        socket.close();
      }
    };
  }, [user,]);

  useEffect(() => {
    if (socket) {
      // Lắng nghe tin nhắn khi socket được khởi tạo
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message,]);
      };
    }
  }, [socket,]);

  const getMessages = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/messengers/${user}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(res => res.status === 200 ? res.json() : Promise.reject(res.json()))
      .then(data => setMessages(data.data))
      .catch(err => console.log(err));
  };

  const sendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      const newMessageData = {
        id: messages.length + 1,
        content: newMessage,
        sender: 'You',
      };
      setMessages([...messages, newMessageData,]);
      setNewMessage('');

      const messageData = {
        message: newMessage,
        sender: 'super',
        recipient: user,
      };
      socket.send(JSON.stringify(messageData));
    }
  };

  return (
    <div id='detail'>
      <div className='messages'>
        {messages.map((message) => (
          <div key={message.id} className='message'>
            <div className={message.sender === 'You' ? 'sent sender' : 'sender'}>{message.sender}:</div>
            <div className={message.sender === 'You' ? 'sent content' : 'content'}>{message.content}</div>
          </div>
        ))}
      </div>
      <div className='input-container'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Nhập tin nhắn mới...'
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  );
}

Detail.propTypes = {
  user: PropTypes.string,
};
