import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import Alert from '../layout/Alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    company: '',
    email: '',
    password: '',
    password2: ''
  });

  const { company, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ company, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/residents' />;
  }

  return (
    <div className='not_auth_container'>
      <div className='center_column'>
        <Alert />
        <div className='form_container'>
          <h1 className='large text-center'>Mediee</h1>
          <p className='lead'>Create an Account!</p>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='formgroup'>
              <input
                type='text'
                placeholder='Company Name'
                name='company'
                value={company}
                onChange={e => onChange(e)}
                className='form_input'
              />
            </div>
            <div className='formgroup'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                className='form_input'
              />
            </div>
            <div className='formgroup'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                className='form_input'
              />
            </div>
            <div className='formgroup'>
              <input
                type='password'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
                className='form_input'
              />
            </div>
            <input
              type='submit'
              className='btn submit_button'
              value='Register'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
