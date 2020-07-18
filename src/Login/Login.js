import React, { useState } from 'react';
import store from 'store'
import { Message } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import isLoggedIn from '../helpers/isLoggedIn';
import axios from 'axios';
import './Login.css';


const Login = () => {
  //this line of code will redirect the user back to the main menu he was on if Prholder then to sm/pr and vice versa
  /*if(isLoggedIn()){
    return <redirect to="/this will be a var"
  }*/
  const [iserror, setError] = useState(false);
  let history = useHistory();
  let onSubmit = (e) => {
    //setError("false");
    e.preventDefault();
//loginState.username
let raw = JSON.stringify({"grant_type":"password","username":String(loginState.username),"password":String(loginState.password)});

const headers={
  'Authorization': 'Basic dGVzdGNsaWVudDp0ZXN0', 
  'Content-Type': 'application/json'
}

    axios.post("http://pfe.tn/oauth",raw,{headers:headers}
      
    )
      .then((response) => {
        console.log(response);
        axios.get("http://pfe.tn/user-type/"+loginState.username).then((response)=>{
          //handle successful login
          setError("false");
          store.set('loggedIn', true);
          if(response.data[0].userType ==='Designer'){
            history.push("/Designer");
          }
          else
               history.push("/ProjectHolder");
          console.log(response)
        })
      })
      .catch(error => {
        console.log(error)
        setError("true");
        return iserror;
      });
  }
  const [loginState, setLoginState] = useState({
    username: '',
    password: '',
  });

  const handleLoginChange = (e) => setLoginState({
    ...loginState,
    [e.target.name]: [e.target.value],
  });
  return (
    <div className="LoginContainer">
      {/* for fun */}
      <div className="row justify-content-center">
        <div className="login-box">
          <div className="login-logo">
            <h1><a href="/"> <b>Smart</b>Cursus</a></h1>
          </div>
          {/* /.login-logo */}
          <div>
            <div className="card-body login-card-body">
              <p className="login-box-msg">Sign in to start your session</p>
              {iserror && <Message
                iserror={iserror}
                content="That NIC/password is incorrect. Try again!"
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
            <br /><br />
            <div className="about ">
              <h4>Welcome to Smart Cursus !</h4>
              <p className="info">You can only access this website if you've already been added by a designer</p>
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