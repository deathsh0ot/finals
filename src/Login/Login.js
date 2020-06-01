import React, { useState } from 'react';
import store from 'store'
import { Message } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import isLoggedIn from '../helpers/isLoggedIn';
import axios from 'axios';




const Login = () => {
  //this line of code will redirect the user back to the main menu he was on if Prholder then to sm/pr and vice versa
  /*if(isLoggedIn()){
    return <redirect to="/this will be a var"
  }*/
  const [iserror, setError] = useState(false);

  let history = useHistory();


  let onSubmit = (e) => {
    axios.get("http://smart.com/appusers",{
     
          headers:{ nic: loginState.username[0],
            password:loginState.password[0]}
          
      
    })
    .then((response) => {
      console.log("Login response",response.data);
    })
    .catch(error =>{
      console.log(error.response)
    });
    setError("false");
    e.preventDefault();
    if (!((loginState.username[0] === 'aaa' || loginState.username[0] === 'b') && loginState.password[0] === 'akk')) {
      setError("true");
      return iserror;
    }

    console.log("you're logged in. yay!");
    store.set('loggedIn', true);

    if (loginState.username[0] === 'aaa') {
      history.push("/Designer");
    } else
      history.push("/ProjectHolder");
  }
const [loginState, setLoginState] = useState({
    username: '',
    password: '',
});

const handleLoginChange = (e) => setLoginState({
    ...loginState,
    [e.target.name]: [e.target.value],
});
console.log(loginState.username);
console.log(loginState.password);
  return (
    <div>
      <div className="row justify-content-center">
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
                    name="username"
                    id="username"
                    value={loginState.username}
                    onChange={handleLoginChange} />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input type="password" className="form-control" placeholder="Password"
                    name="password"
                    id="password"
                    value={loginState.password}
                    onChange={handleLoginChange} />
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