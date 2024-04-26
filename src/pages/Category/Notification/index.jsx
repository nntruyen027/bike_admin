import React, { useEffect, useState, } from 'react';
import { DeleteButton, Loading, Pagination, Table, } from '~/components';
import { Filter,Create, } from './components';
import Modal from '../../../components/Modal';

export default function Notification() {
  const [currentPage, setCurrentPage,] = useState(1);
  const [totalPage, setTotalPage,] = useState(0);
  const [loading, setLoading,] = useState(true);
  const [notifications, setNotification,] = useState([]);
  const [filterData, setFilterData,] = useState([]);
  const [showCreate, setShowCreate,] = useState(false);

  useEffect(() => {
    getNotification();
  }, [currentPage,]);

  const getNotification = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/notifications/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(res => res.status === 200 ? res.json() : Promise.reject(res.json().error))
      .then(data => {
        setTotalPage(data.meta.total_pages);
        setNotification(data.data);
        setFilterData(data.data);
        setLoading(false);
      })
      .catch(err => alert(err));
  };

  const handleCreate = ({ title, text, }) => {
    setLoading(true);

    const form = new FormData();
    form.append('title', title);
    form.append('text', text);

    fetch(`${process.env.REACT_APP_HOST_IP}/notifications/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
      body: form,
    })
      .then(res => res.status === 201 ? getNotification() : alert('Thêm thất bại'))
      .then(() => {
        setLoading(false);
        setShowCreate(!showCreate);
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  const handleDelete = ({ id, }) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_HOST_IP}/notifications/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
        Accept: 'application/json',
      },
    })
      .then(res => res.status === 204 ? getNotification() : alert('Xóa thất bại'))
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        alert(err);
        setLoading(false);
      });
  };

  // eslint-disable-next-line react/prop-types
  const ButtonGroup = ({ data, }) => {
    return (
      <>
        <DeleteButton onClick={() => handleDelete({
          id: data,
        })}/>
      </>
    );
  };

  return (
    <div id={'notification'}>
      {loading && <Loading/>}
      <Filter data={filterData} originData={notifications} setData={setFilterData} showCreateModal={() => setShowCreate(!showCreate)}/>
      <Table data={notifications} columns={
        [
          {
            label: 'Tiêu đề',
            key: 'title',
          },
          {
            label: 'Nội dung',
            key: 'text',
          },
          {
            label: 'Hành động',
            component: ButtonGroup,
            type: 'component',
            key: 'id',
          },
        ]
      }/>
      <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={setCurrentPage}/>
      {showCreate && (
        <Modal
          setShow={() => setShowCreate(!showCreate)}
          title={'Thêm thông báo'}
        >
          <Create onCreate={handleCreate} />
        </Modal>)
      }
    </div>
  );
}