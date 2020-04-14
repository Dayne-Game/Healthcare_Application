import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';

const ResidentDetails = ({
  resident: { dob, nhi, gender, date, height, weight, bloodtype },
}) => (
  <Fragment>
    <div className='details'>
      <div className='details-box'>
        <div className='detail-items'>
          <p className='gray'>NHI Number</p>
          <p>{nhi ? `${nhi}` : 'NHI not Known'}</p>
        </div>
        <div className='detail-items'>
          <p className='gray'>Date of Birth</p>
          <p>
            <Moment format='DD-MM-YYYY'>{dob}</Moment>
          </p>
        </div>
        <div className='detail-items'>
          <p className='gray'>Gender</p>
          <p>{gender ? `${gender}` : 'Gender not specified'}</p>
        </div>
        <div className='detail-items'>
          <p className='gray'>Height</p>
          <p>{height ? `${height} cm` : 'Height not Known'}</p>
        </div>
        <div className='detail-items'>
          <p className='gray'>Weight</p>
          <p>{weight ? `${weight} kg` : 'Weight not known'}</p>
        </div>
        <div className='detail-items'>
          <p className='gray'>Blood Type</p>
          <p>{bloodtype ? `${bloodtype}` : 'Blood Type not known'}</p>
        </div>
        <div className='detail-items'>
          <p className='gray'>Age</p>
          <p>{`${moment().diff(dob, 'years', false)} years old`}</p>
        </div>
        <div className='detail-items'>
          <p className='gray'>Date Created</p>
          <Moment format='DD-MM-YYYY'>{date}</Moment>
        </div>
      </div>
    </div>
  </Fragment>
);

ResidentDetails.propTypes = {
  resident: PropTypes.object.isRequired,
  vital: PropTypes.object.isRequired,
};

export default ResidentDetails;
