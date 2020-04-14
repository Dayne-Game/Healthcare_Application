import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Sidebar from '../layout/Sidebar';
import { Link } from 'react-router-dom';
import { getResident } from '../../actions/resident';
import Spinner from '../layout/Spinner';
import NoteItem from './NoteItem';
import Alert from '../layout/Alert';
import HeartrateGraph from './HeartrateGraph';

const Heartrate = ({ getResident, resident: { resident, loading }, match }) => {
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
        <h1 className='note-banner-title'>Heartrate</h1>
        <Alert />
        <div className='heartrate-container'>
          <div className='top-graph-container'>
            <p>Yeah good as</p>
          </div>
          {resident.heartrate.length > 0 ? (
            <HeartrateGraph
              residentID={resident._id}
              heartrateArray={resident.heartrate}
            />
          ) : (
            <Fragment>
              <p>
                There is no current Heartrate's on record or this current
                Resident.
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

Heartrate.propTypes = {
  getResident: PropTypes.func.isRequired,
  resident: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  resident: state.resident,
});

export default connect(mapStateToProps, { getResident })(Heartrate);
