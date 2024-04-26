import React, { useEffect, useState, } from 'react';
import Table from '~/components/Table';
import { Modal, Pagination, UpdateButton, } from '~/components';
import { UpdateActive, } from './components';

export default function CustomerList() {
  const [users, setUsers,] = useState([]);
  const [updateCustomer, setUpdateCustomer,] = useState(false);
  const [customerId, setCustomerId,] = useState(null);
  const [currentPage, setCurrentPage,] = useState(1);
  const [totalPage, setTotalPage,] = useState(0);

  useEffect(() => {
    getCustomer();
  }, [currentPage,]);

  const getCustomer = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/user/`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
        'Accept': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const users = data.data.map(item => {
          // Nếu is_female là true, thì chuyển thành "Nam", ngược lại chuyển thành "Nữ"
          return {
            ...item,
            is_female: item.is_female ? 'Nữ' : 'Nam',
            is_banned: item.is_banned ? 'Cấm': 'Bình thường',
          };
        });
        setTotalPage(data.meta.total_pages);
        setUsers(users);
      })
      .catch(error => console.log(error));
  };

  const updateBanned = ({ id, is_banned, }) => {
    const form = new FormData();
    form.append('is_banned', is_banned);

    fetch(`${process.env.REACT_APP_HOST_IP}/user/?username=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      method: 'PUT',
      body: form,
    })
      .then((res) => {
        setCustomerId(null);
        getCustomer();
        return res.status === 200 ? res.json() : Promise.reject(res.json());
      })
      .catch(error => alert(error.error));
    
  };

  const setShowUpdateLocation = (id) => {
    setUpdateCustomer(!updateCustomer);
    if(updateCustomer)
      setCustomerId(id);
    else
      setCustomerId(null);
  };

  const buttonGroup = ({ data, }) => {
    return (
      <>
        <UpdateButton onClick={() =>setShowUpdateLocation(data)}/>
        {
          customerId && <Modal title={'Cập nhật trạng thái khách hàng'} setShow={setShowUpdateLocation}>
            <UpdateActive onUpdate={updateBanned} username={customerId}/>
          </Modal>
        }
      </>
    );
  };

  return (
    <>
      <Table data={users} columns={[
        {
          key: 'full_name', label: 'Khách hàng',
        },
        {
          key: 'phone', label: 'Số điện thoại',
        },
        {
          key: 'is_female', label: 'Giới tính',
        },
        {
          key: 'email', label: 'Email',
        },
        {
          key: 'is_banned', label: 'Trạng thái hoạt động',
        },
        {
          key: 'username', label: '', type: 'component', component: buttonGroup,
        },
      ]}/>
      <Pagination onPageChange={setCurrentPage} totalPage={totalPage} currentPage={currentPage}/>
    </>
  );
}