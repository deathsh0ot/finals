import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Form from './Form';
import Users from './Users'

export default class Menu extends Component {
  render() {
    return (<Router>
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light">Smart Cursus</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* Sidebar user panel (optional) */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src="dist/img/blyat.jpg" className="img-circle elevation-2" alt="User" />
              </div>
              <div className="info">
                <a href="fake_url" className="d-block">DeathShot</a>
              </div>
            </div>
            {/* Sidebar Menu */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                <li className="nav-item has-treeview menu-open">
                  <a href="fake_url" className="nav-link active">
                    <i className="nav-icon fas fa-tachometer-alt" />
                    <p>
                      Dashboard
                <i className="right fas fa-angle-left" />
                    </p>
                  </a>

                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <NavLink to="/" exact activeStyle={{ color: 'blue' }} className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Form" activeStyle={{ color: 'blue' }} className="nav-link">Curriculums</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/Users" exact activeStyle={{ color: 'blue' }} className="nav-link">Users</NavLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            {/* /.sidebar-menu */}
          </div>
          {/* /.sidebar */}
        </aside>
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">

                  <Switch>

                    <Route path="/Form">
                      <Form />
                    </Route>
                    <Route path="/Users">
                      <Users />
                    </Route>
                    <Route path="/">
                      <div>
                      <h1>WELCOME DESIGNER</h1>
                      <p>this app was made to ease and facilitate the making of curriculums and adapting them into establishments</p>
                      </div>
                    </Route>
                  </Switch>


                </div>{/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="fake_url">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
          </div>
          {/* /.content-header */}
          {/* Main content */}

        </div>
        {/* /.content-wrapper */}
        {/* Control Sidebar */}
        <aside className="control-sidebar control-sidebar-dark">
          {/* Control sidebar content goes here */}
        </aside>
      </div>
    </Router>
    )
  }
}
