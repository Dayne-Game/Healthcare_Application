import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteNote } from '../../actions/resident';
import Moment from 'react-moment';

const NoteItem = ({
  deleteNote,
  auth,
  residentId,
  note: { _id, name, text, date, resthomeid },
}) => (
  <Fragment>
    <div className='notes-card'>
      <div className='note-navbar mt-10'>
        <p>
          <Moment format='DD-MM-YYYY, hh:mm A' className='gray mini-date'>
            {date}
          </Moment>
        </p>
      </div>
      <div className='main-note-content-container'>
        <div className='note-textbox-container'>
          <p>{text}</p>
        </div>
        <div className='note-footer'>
          <p className='gray'>{`Posted by ${name}`}</p>
        </div>
      </div>
    </div>
  </Fragment>
);

NoteItem.propTypes = {
  residentId: PropTypes.string.isRequired,
  note: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteNote })(NoteItem);
