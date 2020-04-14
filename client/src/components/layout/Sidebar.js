import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <ul>
        <li>
          <NavLink exact activeClassName='active' to='/overview'>
            <i className='icon_link fas fa-chart-pie' />
            <div className='span_links'>
              <span className='sidenav_links'>Overview</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='active' to='/Residents'>
            <i className='icon_link fas fa-user-friends' />
            <div className='span_links'>
              <span className='sidenav_links'>Residents</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='active' to='/staff'>
            <i className='icon_link fas fa-user-nurse' />
            <div className='span_links'>
              <span className='sidenav_links'>Staff</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='active' to='/history'>
            <i className='icon_link fas fa-book-medical' />
            <div className='span_links'>
              <span className='sidenav_links'>History</span>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink exact activeClassName='active' to='/settings'>
            <i className='icon_link fas fa-cog' />
            <div className='span_links'>
              <span className='sidenav_links'>Settings</span>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
