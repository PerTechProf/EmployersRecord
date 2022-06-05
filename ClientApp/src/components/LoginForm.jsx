import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useApi, useToken } from '../logic/hooks';


export const LoginForm = () => {
  const { auth: { login } } = useApi();

  const token = useToken();

  const onSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;
    if (!(email && password))
      return;
    login(email, password);
  }

  console.log(token);

  if (token)
    return <Navigate to="applications"/>;
  
  return (
    <form onSubmit={onSubmit}>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example1">Email </label>
        <input type="email" id="form2Example1" className="form-control" name="email" />
      </div>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form2Example2">Пароль</label>
        <input type="password" id="form2Example2" className="form-control" name="password" />
      </div>

      <button type="submit" className="btn btn-primary btn-block mb-4">Войти</button>

    </form>
  )
}