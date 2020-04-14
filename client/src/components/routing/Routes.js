import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import AddResident from '../residents/AddResident';
import Resident from '../resident/Resident';
import Residents from '../residents/Residents';
import PrivateRoute from '../routing/PrivateRoute';
import NotFound from '../layout/NotFound';
import UpdateResident from '../resident/UpdateResident';
import Overview from '../overview/Overview';
import Notes from '../utilities/Notes';
import Heartrate from '../utilities/Heartrate';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/heartrate/:id' component={Heartrate} />
        <PrivateRoute exact path='/addresident' component={AddResident} />
        <PrivateRoute exact path='/residents' component={Residents} />
        <PrivateRoute exact path='/resident/:id' component={Resident} />
        <PrivateRoute
          exact
          path='/editresident/:id'
          component={UpdateResident}
        />
        <PrivateRoute exact path='/overview' component={Overview} />
        <PrivateRoute exact path='/notes/:id' component={Notes} />
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
