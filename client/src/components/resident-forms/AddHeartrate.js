import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addHeartrate } from '../../actions/resident';

const AddHeartrate = ({ residentID, addHeartrate }) => {
  const [heartrate, setHeartrate] = useState('');

  return (
    <Fragment>
      <form
        className='condition-form'
        onSubmit={(e) => {
          e.preventDefault();
          addHeartrate(residentID, { heartrate });
          setHeartrate('');
        }}
      >
        <input
          type='number'
          placeholder='Current Heartrate'
          name='heartrate'
          value={heartrate}
          onChange={(e) => setHeartrate(e.target.value)}
          className='resident_form_input'
          required
        />
        <input
          type='submit'
          className='btn submit_button text-center'
          value='Save'
        />
      </form>
    </Fragment>
  );
};

AddHeartrate.propTypes = {
  addHeartrate: PropTypes.func.isRequired,
};

export default connect(null, { addHeartrate })(AddHeartrate);
