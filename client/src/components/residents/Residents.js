import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ResidentItem from './ResidentItem';
import { getResidents } from '../../actions/resident';
import Sidebar from '../layout/Sidebar';
import Alert from '../layout/Alert';

const Residents = ({ getResidents, resident: { residents, loading } }) => {
  useEffect(() => {
    getResidents();
  }, [getResidents]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Sidebar />
      <div className='display-resident-container'>
        <div className='navigation-bar slight-change-navbar'>
          <div className='items-left'>
            <Link to='/residents' className='link-blue'>
              Residents
            </Link>
          </div>
          <div className='right-button grid-c-auto'>
            <Link to='/addresident' className='edit-button top-edit'>
              Add Resident
            </Link>
          </div>
        </div>
      </div>
      <div className='auth_container '>
        <div className='residents-tagline'>
          <p>
            Here you will see a list of all your residents that you have added
            into the system. If you see no Residents, you will need to start
            adding them in!
          </p>
          <p className='my-1'>
            To View one of the Residents click on the name of the resident you
            would like to view
          </p>
        </div>
        <Alert />
        <div className='residents-container'>
          {residents.length > 0 ? (
            <Fragment>
              <div className='heading'>
                <p>Name</p>
                <p>Date of Birth</p>
                <p>NHI</p>
                <p>Date Created</p>
              </div>
              {residents.map(resident => (
                <ResidentItem key={resident._id} resident={resident} />
              ))}
            </Fragment>
          ) : (
            <p>There are no Residents. Start adding some now!</p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Residents.propTypes = {
  getResidents: PropTypes.func.isRequired,
  resident: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  resident: state.resident
});

export default connect(mapStateToProps, { getResidents })(Residents);
