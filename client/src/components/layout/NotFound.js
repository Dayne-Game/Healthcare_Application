import React, { Fragment } from 'react';

const NotFound = () => {
  return (
    <div className='not_auth_container'>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='large'>Sorry, this page does not exist</p>
    </div>
  );
};

export default NotFound;
