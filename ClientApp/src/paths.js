import React from 'react';

import {
  Routes,
  Route
} from "react-router-dom";
import { About } from './pages/About';
import { Results } from './pages/Results';
import { Login } from './pages/Login';

const Paths = () => (
    <Routes>
      <Route path="/" element={<About />}/>
      <Route path="about" element={<About />}/>
      <Route path="results" element={<Results />}/>
      <Route path="login" element={<Login />}/>
    </Routes>
  )

export default Paths;