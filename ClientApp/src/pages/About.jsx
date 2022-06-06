import React from 'react'

import { Link, Navigate } from 'react-router-dom'
import { useToken } from '../logic/hooks'

export const About = () => {
  const token = useToken();

  return !token ? <div style={{ width: "90%", margin: "0 auto", marginTop: "2%" }}>
          <h2>Веб-приложение для учёта кадров предприятия Tinfoil</h2>
          <span> Для начала работы с приложением требуется <Link to="login">войти</Link> в систему</span>
        </div> : <Navigate to="applications" replace />
}