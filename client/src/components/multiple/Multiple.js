import React, { Component, Fragment } from 'react';

import Conditions from '../resident/Conditions';
import Notes from '../resident/Notes';
import AddCondition from '../resident-forms/AddCondition';
import Heartrate from '../utilities/Heartrate';
import AddHeartrate from '../resident-forms/AddHeartrate';

class Multiple extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedComponent: 'condition',
      active: false,
    };
  }

  toggleContent = (event) => {
    const currentState = this.state.active;
    event.preventDefault();
    this.setState({
      selectedComponent: event.target.value,
      active: !currentState,
    });
  };

  switchContent = (value) => {
    switch (value) {
      case 'condition':
        return (
          <Fragment>
            <div className='note-navbar multiple-top'>
              <p>Conditions</p>
            </div>
            <div className='content-container'>
              <Conditions condition={this.props.condition} />
            </div>
          </Fragment>
        );
      case 'heartrate':
        return (
          <Fragment>
            <div className='note-navbar multiple-top'>
              <p>Add Heartrate</p>
            </div>
            <div className='content-container'>
              <AddHeartrate residentID={this.props.residentID} />
            </div>
          </Fragment>
        );
      case 'add_condition':
        return (
          <Fragment>
            <div className='note-navbar multiple-top'>
              <p>Add Condition</p>
            </div>
            <div className='content-container'>
              <AddCondition residentID={this.props.residentID} />
            </div>
          </Fragment>
        );
      default:
        return null;
    }
  };

  render() {
    const { selectedComponent } = this.state;

    return (
      <Fragment>
        <div className='item-navbar'>
          <button
            className={
              selectedComponent === 'condition'
                ? 'item-button-active'
                : 'navbar-item-button'
            }
            value='condition'
            onClick={this.toggleContent}
          >
            Conditions
          </button>
          <button
            className={
              selectedComponent === 'add_condition'
                ? 'item-button-active'
                : 'navbar-item-button'
            }
            value='add_condition'
            onClick={this.toggleContent}
          >
            Add Condition
          </button>
          <button
            className={
              selectedComponent === 'heartrate'
                ? 'item-button-active'
                : 'navbar-item-button'
            }
            value='heartrate'
            onClick={this.toggleContent}
          >
            Add Heartrate
          </button>
        </div>
        {this.switchContent(selectedComponent)}
      </Fragment>
    );
  }
}

export default Multiple;
