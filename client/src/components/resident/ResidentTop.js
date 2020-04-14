import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const ResidentTop = ({ resident: { _id, name } }) => {
  return (
    <div className='navigation-bar'>
      <div className='items-left'>
        <Link to='/residents' className='link-blue'>
          Residents
        </Link>
        <i className='fas fa-angle-right' />
        <p>{name}</p>
      </div>
      <div className='right-button grid-c-auto-auto-auto'>
        <Link to={`/editresident/${_id}`} className='edit-button top-edit'>
          Edit Details
        </Link>
        <Link to={`/heartrate/${_id}`} className='edit-button top-edit'>
          Heartrate
        </Link>
      </div>
    </div>
  );
};

ResidentTop.propTypes = {
  resident: PropTypes.object.isRequired,
};

export default ResidentTop;
