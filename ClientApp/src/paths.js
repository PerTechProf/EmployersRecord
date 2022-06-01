import React from 'react';

import {
  Routes,
  Route
} from "react-router-dom";
import { About } from './pages/About';
import { Results } from './pages/Results';
import { Login } from './pages/Login';
import { Employers } from './pages/Employers';
import { Applications } from './pages/Applications';
import { MyInfo } from './pages/MyInfo';
import { useToken, useIsEditor } from './logic/hooks';

const Paths = () => {
  const token = useToken();
  const isEditor = useIsEditor();

  return (
    <Routes>
      <Route path="/" element={<About />}/>
      <Route path="about" element={<About />}/>
      {token ? <>
        <Route path="employers" element={<Employers />}/>,
        <Route path="applications" element={<Applications />}/>,
        <Route path="account-info" element={<MyInfo />}/>,
        isEditor && ([
          
        ])
      </> : <>
        <Route path="login" element={<Login />}/>
      </>}
    </Routes>
  )
}

export default Paths;