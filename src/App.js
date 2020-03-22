import React, { Component } from 'react'
import DesInt from './DesInt';
import Login from './Login/Login';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';

export default class App extends Component {
  render() {
    return (
     <div>
       <DesInt/>
     </div>
    )
  }
}
