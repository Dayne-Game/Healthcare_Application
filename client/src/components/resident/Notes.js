import React, { Fragment } from 'react';
import Moment from 'react-moment';

const Notes = (props) => {
  return (
    <div className='multiple-content'>
      {props.note.length > 0 ? (
        props.note.map((item, index) => {
          return (
            <Fragment key={index}>
              <div className='notes-card'>
                <div className='note-navbar mt-10'>
                  <p>
                    <Moment
                      format='DD-MM-YYYY, hh:mm A'
                      className='gray mini-date'
                    >
                      {item.date}
                    </Moment>
                  </p>
                </div>
                <div className='main-note-content-container'>
                  <div className='note-textbox-container'>
                    <p>{item.text}</p>
                  </div>
                  <div className='note-footer'>
                    <p className='gray'>{`Posted by ${item.name}`}</p>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })
      ) : (
        <Fragment>
          <p>Their are no notes created about this Resident</p>
        </Fragment>
      )}
    </div>
  );
};

export default Notes;
