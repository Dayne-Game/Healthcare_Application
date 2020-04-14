import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateResident, getResident } from '../../actions/resident';
import Alert from '../layout/Alert';
import { Link, withRouter } from 'react-router-dom';

const initalState = {
  name: '',
  dob: '',
  nhi: '',
  gender: '',
  height: '',
  weight: '',
  bloodtype: '',
  bloodpressure: '',
  heartrate: '',
};

const UpdateResident = ({
  updateResident,
  getResident,
  resident: { resident, loading },
  match,
}) => {
  const [formData, setFormData] = useState(initalState);

  useEffect(() => {
    if (!resident) getResident(match.params.id);
    if (!loading) {
      const residentData = { ...initalState };
      for (const key in resident) {
        if (key in residentData) residentData[key] = resident[key];
      }
      for (const key in resident.vitals) {
        if (key in residentData) residentData[key] = resident.vitals[key];
      }
      console.log(residentData);
      setFormData(residentData);
    }
  }, [getResident, loading, resident, match.params.id]);

  const { name, dob, nhi, gender, height, weight, bloodtype } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateResident(match.params.id, formData);
  };

  return (
    <Fragment>
      <div className='not_auth_container'>
        <div className='back-container'>
          <Link to={`/resident/${match.params.id}`} className='back-button'>
            <i className='fas fa-angle-left' />
            {''}
            {`Back to ${resident.name} page`}
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
                  placeholder='First Middle Surname'
                  name='name'
                  value={name}
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
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
                    onChange={onChange}
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
                    onChange={onChange}
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
                  onChange={onChange}
                  className='form_input'
                />
              </div>
            </div>
            <input
              type='submit'
              className='btn submit_button text-center'
              value='Update'
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

UpdateResident.propTypes = {
  updateResident: PropTypes.func.isRequired,
  getResident: PropTypes.func.isRequired,
  resident: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  resident: state.resident,
});

export default connect(mapStateToProps, { updateResident, getResident })(
  withRouter(UpdateResident)
);
