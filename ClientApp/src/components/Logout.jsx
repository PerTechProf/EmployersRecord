import React from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useApi } from '../logic/hooks'

export const Logout = () => {
  const { auth } = useApi();
  
  auth.logout();

  return <Navigate to="/"/>
}