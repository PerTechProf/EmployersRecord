import React, { Component, Context } from 'react';
import {
  BrowserRouter as Router, Outlet,
} from "react-router-dom";
import Paths from './paths';
import { NavBar } from './components/NavBar';
import './custom.css'

export default function App() {
  return (
    <Router>
      <NavBar />
      <Paths />
    </Router>
  );
}
