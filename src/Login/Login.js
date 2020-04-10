import React , { useState } from 'react';
import store from 'store'
import { Message } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import isLoggedIn from '../helpers/isLoggedIn';




const Login = () => {
  /*if(isLoggedIn()){
    return <redirect to="/this will be a var"
  }*/
  const [iserror, setError] = useState(false);

  let history = useHistory();
  let username = '';
  let password = '';
  

  let onSubmit = (e) => { 
    setError("false");
    e.preventDefault();
    if (!((username === 'a' || username === 'b') && password === 'a')) {
      setError("true");
      return true ;
    }

    console.log("you're logged in. yay!");
    store.set('loggedIn', true);

    if (username === 'a') {
      history.push("/Designer");
    } else
      history.push("/ProjectHolder");
  }

  let handleChangeUsername = (e) => {
    const { name, value } = e.target;
    username = value;
  }
  
  let handleChangePassword = (e) => {
    const { name, value } = e.target;
    password = value;
  }

  return (
    <div>
      <div>
        <div className="login-box">
          <div className="login-logo">
            <a href="/"> <b>Smart</b>Cursus</a>
          </div>
          {/* /.login-logo */}
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              {iserror && <Message
                iserror={iserror}
                content="That username/password is incorrect. Try again!"
              />}
              <form onSubmit={onSubmit} >
                <div className="input-group mb-3">
                  <input type="Text" className="form-control" placeholder="NIC"
                    label="Username"
                    name="username"
                    onChange={handleChangeUsername} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" placeholder="Password"
                    label="Password"
                    name="password"
                    onChange={handleChangePassword} />
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
};



export default Login;