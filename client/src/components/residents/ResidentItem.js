import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteResident } from '../../actions/resident';
import Moment from 'react-moment';

const ResidentItem = ({
  deleteResident,
  auth,
  resident: { _id, name, dob, nhi, date, resthomeid },
  showActions,
}) => (
  <div className='items'>
    <Link to={`/resident/${_id}`} className='link-blue'>
      <p>{name}</p>
    </Link>
    <p>
      <Moment format='DD-MM-YYYY'>{dob}</Moment>
    </p>
    <p>{nhi ? `${nhi}` : 'NHI Not Known'}</p>
    <p>
      <Moment format='DD-MM-YYYY'>{date}</Moment>
    </p>
    {showActions && (
      <Fragment>
        {!auth.loading && resthomeid === auth.resthome._id && (
          <button
            onClick={() => deleteResident(_id)}
            type='button'
            className='delete_resident'
          >
            <i className='far fa-trash-alt' />
          </button>
        )}
      </Fragment>
    )}
  </div>
);

ResidentItem.defaultProps = {
  showActions: true,
};

ResidentItem.propTypes = {
  resident: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteResident: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteResident })(ResidentItem);
