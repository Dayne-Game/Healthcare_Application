import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ResidentTop from './ResidentTop';
import ResidentDetails from './ResidentDetails';
import { getResident } from '../../actions/resident';
import Sidebar from '../layout/Sidebar';
import Multiple from '../multiple/Multiple';
import AddNote from '../resident-forms/AddNote';
import Alert from '../layout/Alert';
import { Link } from 'react-router-dom';

const Resident = ({ getResident, resident: { resident, loading }, match }) => {
  useEffect(() => {
    getResident(match.params.id);
  }, [getResident, match.params.id]);

  return loading || resident === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Sidebar />
      <div className='display-resident-container'>
        <ResidentTop resident={resident} />
        <Alert />
        <div className='main-container'>
          <div className='resident-details'>
            <ResidentDetails resident={resident} vital={resident} />
          </div>
          <div className='notes-container resident-card'>
            <div className='note-navbar'>
              <p>Notes</p>
              <Link to={`/notes/${resident._id}`} className='link-blue'>
                See all
              </Link>
            </div>
            <AddNote residentID={resident._id} />
          </div>
          <div className='conditions-container resident-card'>
            <Multiple
              condition={resident.conditions}
              heartrate={resident.heartrate}
              residentID={resident._id}
            />
          </div>
          <div className='form-container resident-card'>
            <p>Good as</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Resident.propTypes = {
  getResident: PropTypes.func.isRequired,
  resident: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  resident: state.resident,
});

export default connect(mapStateToProps, { getResident })(Resident);
