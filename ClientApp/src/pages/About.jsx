import React from 'react'

import { Link } from 'react-router-dom'

export const About = () => {
  return <div style={{ width: "90%", margin: "0 auto", marginTop: "2%" }}>
          <h2>Веб-приложение для учёта кадров предприятия Tinfoil</h2>
          <span> Для начала работы с приложением требуется <Link to="login">войти</Link> в систему</span>
        </div>
}