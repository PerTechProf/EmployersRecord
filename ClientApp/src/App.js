import React, { Component, Context } from 'react';
import {
  BrowserRouter as Router, Outlet,
} from "react-router-dom";
import Paths from './paths';
import { NavBar } from './components/NavBar';
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Router>
        <NavBar />
        <Paths />
      </Router>
    );
  }
}
