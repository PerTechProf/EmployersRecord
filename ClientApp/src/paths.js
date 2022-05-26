import React from 'react';

import {
  Routes,
  Route
} from "react-router-dom";
import { About } from './pages/About';
import { Results } from './pages/Results';

const Paths = () => (
    <Routes>
      <Route path="/" element={<About />}/>
      <Route path="about" element={<About />}/>
      <Route path="results" element={<Results />}/>
    </Routes>
  )

export default Paths;