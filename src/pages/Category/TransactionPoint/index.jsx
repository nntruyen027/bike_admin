import './TransactionPoint.css';
import React, { useEffect, useState, } from 'react';
import Table from '~/components/Table';
import { DeleteButton, UpdateButton, } from '~/components';
import Modal from '~/components/Modal';
import { Create, Update, Filter, } from './components';
import QRCode from 'qrcode.react';

export default function TransactionPoint() {
  const [transactions, setTransactions, ] = useState([]);
  const [showCreate, setShowCreate,] = useState(false);
  const [showUpdate, setShowUpdate,] = useState(false);
  const [selectedId, setSelectedId,] = useState(null);
  const [filterData, setFilterData,] = useState([]);

  useEffect(() => {
    handleGetList();
  }, []);
  
  const handleGetList = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/transactions/`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('access'),
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setTransactions(data.data);
        setFilterData(data.data);
      })
      .catch(err => alert(err));
  };

  const handleCreate = ({ name, address, }) => {
    const form = new FormData();
    form.append('name', name);
    form.append('address', address);

    console.log(name, address);

    fetch(`${process.env.REACT_APP_HOST_IP}/transactions/`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => {
        if (res.status === 201) {
          alert('Tạo địa điểm thành công');
          handleGetList();
        } else {
          alert(res.json()?.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleUpdate = ({ id, name, address, }) => {
    const form = new FormData();
    form.append('name', name);
    form.append('address', address);

    console.log(name, address);

    fetch(`${process.env.REACT_APP_HOST_IP}/transactions/${id}/`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
      body: form,
    })
      .then((res) => {
        if (res.status === 201) {
          alert('Sửa địa điểm thành công');
          handleGetList();
        } else {
          alert(res.json()?.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleDetele = ({ id, }) => {
    fetch(`${process.env.REACT_APP_HOST_IP}/transactions/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 204) {
          handleGetList();
          alert('Xóa địa địa điểm thành công');
        } else {
          alert(res.json()?.error);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const setShowCreateLocation = () => {
    setShowCreate(!showCreate);
  };

  const setShowUpdateLocation = (id) => {
    setShowUpdate(!showUpdate);
    if(showUpdate)
      setSelectedId(id);
    else
      setSelectedId(null);
  };

  // eslint-disable-next-line react/prop-types
  const ButtonGroup = ({ data, }) => {
    return (
      <>
        <DeleteButton onClick={() => handleDetele({
          id: data,
        })}/>
        <UpdateButton onClick={() => setShowUpdateLocation(data)}/>
        {selectedId === data && <Modal title={'Chỉnh sửa địa điểm'} setShow={setShowUpdateLocation}>
          <Update id={data} onUpdate={handleUpdate}/>
        </Modal> }
      </>
    );
  };

  // eslint-disable-next-line react/prop-types
  const QRComponent = ({ data, }) => {
    return <QRCode value={data}/>;
  };
  
  return (
    <>
      <Filter data={filterData} setData={setFilterData} originData={transactions} showCreateModal={() => setShowCreate(!showCreate)}/>
      <Table
        data={filterData}
        columns={[
          {
            label: 'ID',
            key: 'id',
            component: QRComponent,
            type: 'component',
          },
          {
            label: 'Điểm giao dịch',
            key: 'name',
          },
          {
            label: 'Địa chỉ',
            key: 'address',
          },
          {
            label: '',
            component: ButtonGroup,
            type: 'component',
            key: 'id',
          },
        ]}
      />
      {showCreate && (
        <Modal
          setShow={setShowCreateLocation}
          title={'Thêm địa điểm giao dịch'}
        >
          <Create onCreate={handleCreate} />
        </Modal>
      )}
    </>
  );
}

