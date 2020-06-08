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
        <Router>
          <Switch>
            <Route exact path="/"  Component={Login}>
            <Login/>
            </Route>
            <Route exact path="/Designer"  Component={DesInt} >
              <DesInt />
            </Route>
            <Route exact path="/ProjectHolder"  Component={PrHInt} >
              <PrHInt />
            </Route>
          </Switch>
        </Router>
    )
  }
}
