import React, { Fragment } from 'react';

const Conditions = props => {
  console.log(props.condition);
  return (
    <div className='multiple-content'>
      {props.condition.length > 0 ? (
        props.condition.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className='treatment'>
                <div className='pill-container'>
                  <i className='fas fa-pills' />
                </div>
                <div className='treatment-text-box'>
                  <p className='condition-name'>{item.name}</p>
                  <p className='condition-treatment'>{item.treatment}</p>
                </div>
              </div>
            </Fragment>
          );
        })
      ) : (
        <Fragment>
          <p>This Resident has no underlining conditions</p>
        </Fragment>
      )}
    </div>
  );
};

export default Conditions;
