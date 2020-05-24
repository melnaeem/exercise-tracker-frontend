import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
          <NavLink to="/" className="navbar-brand">ExcerTracker</NavLink>

          <div className="collpase navbar-collapse">
            <ul className="navbar-nav ml-auto">
              <li className="navbar-item">
                <NavLink to="/exercises/list" className="nav-link">Exercises</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/exercises/create" className="nav-link">Create Exercise</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/user/create" className="nav-link">Create User</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}