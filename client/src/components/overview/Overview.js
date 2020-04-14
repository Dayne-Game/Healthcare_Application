import React, { Fragment } from 'react';
import Sidebar from '../layout/Sidebar';

export default function Overview() {
  return (
    <Fragment>
      <Sidebar />
      <div className='auth_container'>
        <div className='overview-grid-container'>
          <div className='overview-card'>
            <div className='overview-card-content'>
              <div className='overview-icon'>
                <i className='fas fa-procedures' />
              </div>
              <div className='card-text-box'>
                <p className='overview-card-value'>1256 / 1500</p>
                <p className='overview-card-label'>Residents</p>
              </div>
            </div>
          </div>
          <div className='overview-card'>
            <div className='overview-card-content'>
              <p>Residents</p>
            </div>
          </div>
          <div className='overview-card'>
            <div className='overview-card-content'>
              <p>Residents</p>
            </div>
          </div>
          <div className='overview-card'>
            <div className='overview-card-content'>
              <p>Residents</p>
            </div>
          </div>
          <div className='overview-card span-3'>
            <h1>Out and in</h1>
          </div>
          <div className='overview-card'>
            <h1>Gender</h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
