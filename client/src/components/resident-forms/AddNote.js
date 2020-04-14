import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNote } from '../../actions/resident';

const AddNote = ({ residentID, addNote }) => {
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNote(residentID, { text, name });
          setText('');
          setName('');
        }}
      >
        <textarea
          name='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          cols='30'
          rows='6'
          placeholder='Create a Note!'
          className='note-input'
          required
        />
        <p>Name (Person writing this note)</p>
        <div className='name-save'>
          <input
            type='text'
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='e.g John Doe'
            className='note-input'
            required
          />
          <input
            type='submit'
            className='btn submit_button text-center'
            value='Save Note'
          />
        </div>
      </form>
    </Fragment>
  );
};

AddNote.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default connect(null, { addNote })(AddNote);
