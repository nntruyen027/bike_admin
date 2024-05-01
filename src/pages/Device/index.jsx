import './index.css';
import React, { useEffect, useState, } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import Table from '~/components/Table';
import { DeleteButton, Loading, Modal, Pagination, UpdateButton, } from '~/components';
import { Create, Filter, Update, } from './components';

export default function Device() {
  const [addDevice, setAddDevice,] = useState(false);
  const [updateDevice, setUpdateDevice,] = useState(false);
  const [bicycleList, setBicycleList,] = useState([]);
  const [selectedId, setSelectedId,] = useState(null);
  const [filterData, setFilterData,] = useState([]);
  const [currentPage, setCurrentPage,] = useState(1);
  const [totalPage, setTotalPage,] = useState(0);
  const [loading, setLoading,] = useState(true);

  useEffect(() => {
    handleGetDevices();
  }, [currentPage,]);

  const handleGetDevices = () => {
    fetch(`${process.env.REACT_APP_HOST_IP}/bicycles/?page=${currentPage}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBicycleList(data.data);
        setTotalPage(data.meta.total_pages);
        setFilterData(data.data);
        setLoading(false);
      })
      .catch((error) => alert(error));
  };

  const handleDeleteDevice = (id) => {
    fetch(`${process.env.REACT_APP_HOST_IP}/bicycles/${id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
    })
      .then(()=> handleGetDevices())
      .catch(error => alert(error));
  };

  const handleCreate = ({ selectedLocation, selectedType, selectedStatus, }) => {
    const form = new FormData();
    form.append('location', selectedLocation);
    form.append('type', selectedType);
    form.append('status', selectedStatus);

    fetch(`${process.env.REACT_APP_HOST_IP}/bicycles/`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
      body: form,
    })
      .then(() => handleGetDevices())
      .catch((err) => console.log(err));
  };

  const handleUpdate = ({ id, selectedLocation, selectedType, selectedStatus, }) => {
    const form = new FormData();
    form.append('location', selectedLocation);
    form.append('type', selectedType);
    form.append('status', selectedStatus);

    fetch(`${process.env.REACT_APP_HOST_IP}/bicycles/${id}/`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access'),
        Accept: 'application/json',
      },
      body: form,
    })
      .then(() => handleGetDevices())
      .catch((err) => console.log(err));
  };

  const setShowUpdateLocation = (id) => {
    setUpdateDevice(!updateDevice);
    if(updateDevice)
      setSelectedId(id);
    else
      setSelectedId(null);
  };

  // eslint-disable-next-line react/prop-types
  const ButtonGroup = ({ data, }) => {
    return (
      <>
        <DeleteButton onClick={() => handleDeleteDevice(data)}/>
        <UpdateButton onClick={() => setShowUpdateLocation(data)}/>
        {selectedId === data && <Modal title={'Chỉnh sửa địa điểm'} setShow={setShowUpdateLocation}>
          <Update id={data} onUpdate={handleUpdate}/>
        </Modal> }
      </>
    );
  };

  function renderBody() {
    return <Table columns={[{
      key:'id', label: 'QR code', type: 'component', component: QRComponent,
    }, {
      key:'type', label: 'Loại xe',
    }, {
      key: 'location', label:'Địa điểm hiện tại',
    }, {
      key:'status', label: 'Trạng thái',
    }, {
      key: 'id', component: ButtonGroup, label: '', type: 'component',
    },

    ]} data={filterData} />;
  }

  return (
    <div id={'Device'}>
      {loading && <Loading/>}
      <Filter filterData={filterData} setFilterData={setFilterData} originData={bicycleList} onShowCreate={() => { setAddDevice(!addDevice); }}/>
      {addDevice && <Modal title={'Thêm xe đạp'} setShow={() => { setAddDevice(!addDevice); }}>
        <Create onCreate={handleCreate} />
      </Modal>}
      {renderBody()}
      <Pagination onPageChange={setCurrentPage} totalPage={totalPage} currentPage={currentPage}/>
    </div>
  );
}

function QRComponent ({ data, }) {
  return <QRCode value={data} />;
}

QRComponent.propTypes = {
  data: PropTypes.any,
};
