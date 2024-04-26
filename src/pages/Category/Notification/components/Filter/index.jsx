import React from 'react';
import PropTypes from 'prop-types';
import './Filter.css';
import { CreateButton, } from '~/components';

export default function Filter({ showCreateModal, }) {

  return (
    <div id={'Location-Filter'}>
      <CreateButton onClick={showCreateModal} />
    </div>
  );
}

Filter.propTypes = {
  showCreateModal: PropTypes.func,
};
