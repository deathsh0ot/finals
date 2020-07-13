import React from 'react';
import store from 'store';
import {
  useHistory
} from "react-router-dom";


const Header = () => {
  let history = useHistory();

  function handleLogout() {
    store.remove('loggedIn');
    history.push('/');
  };
  return (
    <div>
      <div>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* Left navbar links */}
          <ul className="navbar-nav">
            <li className="nav-item d-none d-sm-inline-block">
              <a className="nav-link">Home</a>
            </li>
          </ul>
          {/* Right navbar links */}
          <ul className="navbar-nav ml-auto">
            {/* Messages Dropdown Menu */}

            {/* Notifications Dropdown Menu */}
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="fake_url"><i className="fas fa-bars" /></a>
            </li>
            <li className="nav-item">
              <div>
                <input type="submit"
                  className="btn btn-danger"
                  value="LogOut"
                  onClick={() => handleLogout()} />
              </div>
            </li>
          </ul>
        </nav>
        {/* /.navbar */}
        {/* Main Sidebar Container */}

        {/* /.control-sidebar */}
        {/* Main Footer */}

      </div>


    </div>
  )
}
export default Header;
