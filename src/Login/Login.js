import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div>
                <div>
  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <title>AdminLTE 3 | Log in</title>
  {/* Tell the browser to be responsive to screen width */}
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  {/* Font Awesome */}
  <link rel="stylesheet" href="../../plugins/fontawesome-free/css/all.min.css" />
  {/* Ionicons */}
  <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
  {/* icheck bootstrap */}
  <link rel="stylesheet" href="../../plugins/icheck-bootstrap/icheck-bootstrap.min.css" />
  {/* Theme style */}
  <link rel="stylesheet" href="../../dist/css/adminlte.min.css" />
  {/* Google Font: Source Sans Pro */}
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet" />
  <div className="login-box">
    <div className="login-logo">
      <a href="../../index2.html"><b>Smart</b>Cursus</a>
    </div>
    {/* /.login-logo */}
    <div className="card">
      <div className="card-body login-card-body">
        <p className="login-box-msg">Sign in to start your session</p>
        <form action="../../index3.html" method="post">
          <div className="input-group mb-3">
            <input type="email" className="form-control" placeholder="Email" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Password" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="icheck-primary">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">
                  Remember Me
                </label>
              </div>
            </div>
            {/* /.col */}
            <div className="col-4">
              <button type="submit" className="btn btn-primary btn-block">Sign In</button>
            </div>
            {/* /.col */}
          </div>
        </form>
      
      
      </div>
      {/* /.login-card-body */}
    </div>
  </div>
  {/* /.login-box */}
  {/* jQuery */}
  {/* Bootstrap 4 */}
  {/* AdminLTE App */}
</div>

            </div>
        )
    }
}