import React from 'react'
import {
  Switch,
  Route,
  NavLink,
  HashRouter as Router
} from "react-router-dom";
import PForm from './PForm';


const Menu = () => {
  //let match = useRouteMatch(); can use this for dynamic routes
  return (

    <Router>
     
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <img src="dist/img/logoSC.png" alt="Smart Cursus logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
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
                <a href="fake_url" className="d-block">Ala Hamadi</a>
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
                      <NavLink to={"/PForm"} activeStyle={{ color: 'blue' }} className="nav-link">Degrees</NavLink>
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
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="/ProjectHolder">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>

                <div className="container-fluid">

                  <Switch>
                    <Route path={"/PForm"} exact component={PForm} />
                    <Route exact path="/">
                      <div>
                        <h1>WELCOME Project Holder</h1>
                        <p>this app was made to ease and facilitate the making of curricula and adapting them into establishments</p>
                      </div>
                    </Route>
                  </Switch>


                </div>{/* /.col */}

                {/* /.col */}
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
export default Menu;