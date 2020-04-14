import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addResident } from '../../actions/resident';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';

const AddResident = ({ addResident }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    nhi: '',
    gender: '',
    height: '',
    weight: '',
    bloodtype: '',
  });

  const { name, dob, nhi, gender, height, weight, bloodtype } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addResident(formData);
  };

  return (
    <Fragment>
      <div className='not_auth_container'>
        <div className='back-container'>
          <Link to='/residents' className='back-button'>
            <i className='fas fa-angle-left' /> Back to Residents
          </Link>
        </div>
        <div className='outer-container'>
          <Alert />
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='add-resident-container'>
              <div className='text-left formgroup'>
                <p>* Resident Full Name</p>
                <input
                  type='text'
                  placeholder='First Middle Last'
                  name='name'
                  value={name}
                  onChange={(e) => onChange(e)}
                  className='form_input'
                />
              </div>
              <div className='text-left formgroup'>
                <p>* Date of Birth</p>
                <input
                  type='date'
                  placeholder='yyyy-mm-dd'
                  name='dob'
                  value={dob}
                  onChange={(e) => onChange(e)}
                  className='form_input'
                />
              </div>
              <div className='text-left formgroup'>
                <p>NHI (Leave Blank if not known)</p>
                <input
                  type='text'
                  placeholder='e.g. abc1234'
                  name='nhi'
                  value={nhi}
                  onChange={(e) => onChange(e)}
                  className='form_input'
                />
              </div>
              <div className='text-left formgroup'>
                <p>Gender</p>
                <select
                  className='option-input'
                  name='gender'
                  value={gender}
                  onChange={onChange}
                >
                  <option>Select Gender</option>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                </select>
              </div>
              <div className='text-left formgroup'>
                <p>Height (Leave Blank if not known)</p>
                <div className='input-grid-container'>
                  <input
                    type='number'
                    placeholder='e.g. 191'
                    name='height'
                    value={height}
                    onChange={(e) => onChange(e)}
                    className='form_input small-input'
                  />
                  <div className='text-center input-side-box'>
                    <p>cm</p>
                  </div>
                </div>
              </div>
              <div className='text-left formgroup'>
                <p>Weight (Leave Blank if not known)</p>
                <div className='input-grid-container'>
                  <input
                    type='number'
                    placeholder='e.g. 78'
                    name='weight'
                    value={weight}
                    onChange={(e) => onChange(e)}
                    className='form_input small-input'
                  />
                  <div className='text-center input-side-box'>
                    <p>kg</p>
                  </div>
                </div>
              </div>
              <div className='text-left formgroup'>
                <p>Blood Type (Leave Blank if not known)</p>
                <input
                  type='text'
                  placeholder='e.g. A+'
                  name='bloodtype'
                  value={bloodtype}
                  onChange={(e) => onChange(e)}
                  className='form_input'
                />
              </div>
            </div>
            <input
              type='submit'
              className='btn submit_button text-center'
              value='Register'
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

AddResident.propTypes = {
  addResident: PropTypes.func.isRequired,
};

export default connect(null, { addResident })(AddResident);
