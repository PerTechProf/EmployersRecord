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
import { Reports } from './pages/Reports';
import { Navigate } from 'react-router-dom';
import { Logout } from './components/Logout';

const Paths = () => {
  const token = useToken();
  const isEditor = useIsEditor();

  return (
    <Routes>
      <Route path="/" element={<About />}/>
      <Route path="about" element={<About />}/>
      {token ? <>
        {console.log(token)}
        {isEditor && <Route path="employers" element={<Employers />}/>}
        <Route path="applications" element={<Applications />}/>
        <Route path="account-info" element={<UserInfo />}/>
        <Route path="logout" element={<Logout />}/>
        {isEditor && <Route path="reports" element={<Reports />}/>}
      </> : <>
        <Route path="login" element={<Login />}/>
      </>}
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  )
}

export default Paths;