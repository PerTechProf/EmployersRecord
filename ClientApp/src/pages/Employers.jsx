import React, { useEffect, useState } from 'react'
import { AddEmployerForm } from '../components/AddEmployerForm'
import { EmployersList } from '../components/EmployersList'
import { Container } from 'react-bootstrap'
import { useApi } from '../logic/hooks'

export const Employers = () => {
  const [employers, setEmployers] = useState([]);
  const api = useApi();

  const loadEmployers = 
    async () => setEmployers(await api.auth.getEmployers()); 
  useEffect(() => {
    loadEmployers();
  }, []);

  return <Container className='p-5 d-sm-mw-60'>
    <AddEmployerForm/>
    <Container className='mw-100 mt-5'>
      <EmployersList employers={employers} onEmployerEdit={""}/>
    </Container>
  </Container>
}