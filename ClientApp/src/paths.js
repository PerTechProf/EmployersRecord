import React from 'react';

import {
  Routes,
  Route
} from "react-router-dom";
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Employers } from './pages/Employers';
import { Applications } from './pages/Applications';
import { UserInfo } from './pages/UserInfo';
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
        <Route path="account-info" element={<UserInfo />}/>,
        isEditor && ([
          
        ])
      </> : <>
        <Route path="login" element={<Login />}/>
      </>}
    </Routes>
  )
}

export default Paths;