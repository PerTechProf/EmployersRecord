import React, { useEffect, useState, useCallback } from 'react'
import { AddEmployerForm } from '../components/AddEmployerForm'
import { EmployersList } from '../components/EmployersList'
import { Container } from 'react-bootstrap'
import { useApi } from '../logic/hooks'

export const Employers = () => {
  const [employers, setEmployers] = useState([]);
  const [employerOnEdit, setEmployerOnEdit] = useState(null);
  const api = useApi();
  console.log(employerOnEdit);

  const loadEmployers = useCallback(
      async () => setEmployers(await api.auth.getEmployers()),
      [api]
  )

  useEffect(() => {
    loadEmployers();
  }, [loadEmployers]);

  return <Container className='p-5 d-sm-mw-60'>
    <AddEmployerForm {...employerOnEdit} onAddition={loadEmployers} setEmployerOnEdit={setEmployerOnEdit}/>
    <Container className='mw-100 mt-5'>
      <EmployersList employers={employers} onEmployerEdit={setEmployerOnEdit}/>
    </Container>
  </Container>
}