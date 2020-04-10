import React, { Component } from 'react'
import DesInt from './Designer/DesInt';
import Login from './Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PrHInt from './PrHolder/PrHInt'

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact Component={Login} >
              <Login />
            </Route>
            <Route path="/Designer" exact Component={DesInt} >
              <DesInt />
            </Route>
            <Route path="/ProjectHolder" exact Component={PrHInt} >
              <PrHInt />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
