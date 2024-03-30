import React, { useEffect, useState, } from 'react';
import Table from '~/components/Table';
import { CreateButton, DeleteButton, Modal, } from '~/components';
import { Create, } from '~/pages/User/components';

export default function StaffList() {
  const [staffs, setStaffs,] = useState([]);
  const [addUser, setAddUser,] = useState(false);

  useEffect(() => {
    getStaffs();
  }, []);

  const getStaffs = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/admin-user/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const users = data.data.map(item => {
          return {
            ...item,
            is_female: item.is_female ? 'Nữ' : 'Nam',
          };
        });
        setStaffs(users);
      })
      .catch((error) => console.log(error));
  };

  const createStaff = ({ fullname, username, gender, phone, email, }) => {
    const form = new FormData();
    form.append('full_name', fullname);
    form.append('username', username);
    form.append('is_female', gender === 'Nữ');
    form.append('phone', phone);
    form.append('email', email);
    form.append('is_staff', true);
    form.append('password', 'Bike@123');

    fetch(`${process.env.REACT_APP_HOST_IP}/admin-user/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    }).then((res) => {
      if(res.status === 201)
        alert('Tạo thành công nhân viên');
      else
        return Promise.reject(res.json());
      getStaffs();
      setAddUser(!addUser);
    })
      .catch(error => alert(error));
  };

  const handleDelete = ({ id, }) => {
    fetch(`${process.env.REACT_APP_HOST_IP}/admin-user/?username=${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if(res.status === 204)
          alert('Xóa tài khoản thành công');
        else
          return Promise.reject('Xóa tài khoản thất bại');
        getStaffs();
      })
      .catch((error) => console.log(error));
  };

  const deleteContainer = ({ data, }) => {
    return (
      <DeleteButton onClick={() => handleDelete({
        id: data,
      })}/>
    );
  };

  return (
    <>
      <CreateButton onClick={() => setAddUser(!addUser)} />
      { addUser &&
        <Modal setShow={() => setAddUser(!addUser)} title={'Thêm nhân viên'}>
          <Create onCreate={createStaff}/>
        </Modal>
      }
      <Table data={staffs} columns={[
        {
          key:'full_name', label: 'Nhân viên',
        },
        {
          key:'phone', label: 'Số điện thoại',
        },
        {
          key:'is_female', label: 'Giới tính',
        },
        {
          key:'email', label: 'Email',
        },
        {
          key:'username', label: '', type: 'component', component: deleteContainer,
        },
      ]} />
    </>
  );
}
