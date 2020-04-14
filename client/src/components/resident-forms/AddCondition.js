import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCondition } from '../../actions/resident';
import Alert from '../layout/Alert';

const AddCondition = ({ residentID, addCondition }) => {
  const [treatment, setTreatment] = useState('');
  const [name, setName] = useState('');

  return (
    <Fragment>
      <form
        className='condition-form'
        onSubmit={e => {
          e.preventDefault();
          addCondition(residentID, { name, treatment });
          setTreatment('');
          setName('');
        }}
      >
        <input
          type='text'
          placeholder='Name of Condition'
          name='name'
          value={name}
          onChange={e => setName(e.target.value)}
          className='resident_form_input'
          required
        />
        <input
          type='text'
          placeholder='Treatment'
          name='treatment'
          value={treatment}
          onChange={e => setTreatment(e.target.value)}
          className='resident_form_input'
          required
        />
        <input type='submit' className='resident_form_button' value='Save' />
      </form>
    </Fragment>
  );
};

AddCondition.propTypes = {
  addCondition: PropTypes.func.isRequired
};

export default connect(null, { addCondition })(AddCondition);
