import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '../layout/Sidebar';
import { Link } from 'react-router-dom';
import { getResident, deleteNote } from '../../actions/resident';
import Spinner from '../layout/Spinner';
import NoteItem from './NoteItem';
import Alert from '../layout/Alert';

const Notes = ({ getResident, resident: { resident, loading }, match }) => {
  useEffect(() => {
    getResident(match.params.id);
  }, [getResident, match.params.id]);

  return loading || resident === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Sidebar />
      <div className='display-resident-container'>
        <div className='navigation-bar'>
          <div className='items-left'>
            <Link to={`/resident/${resident._id}`} className='link-blue'>
              <i className='fas fa-angle-left' /> Back to {`${resident.name}'s`}{' '}
              Dashboard
            </Link>
          </div>
        </div>
        <h1 className='note-banner-title'>Notes</h1>
        <Alert />
        <div className='main-notes-container'>
          {resident.notes.length > 0 ? (
            resident.notes.map((note) => (
              <NoteItem key={note._id} note={note} residentId={resident._id} />
            ))
          ) : (
            <Fragment>
              <p>
                There are no notes created about this resident. Start recording
                notes from the chosen resident dashboard.
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Notes.defaultProps = {
  showActions: true,
};

Notes.propTypes = {
  getResident: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  resident: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  resident: state.resident,
  auth: state.auth,
});

export default connect(mapStateToProps, { getResident, deleteNote })(Notes);
