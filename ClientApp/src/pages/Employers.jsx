import React from 'react'
import { AddEmployerForm } from '../components/AddEmployerForm'
import { EmployersList } from '../components/EmployersList'
import { Container } from 'react-bootstrap'
import { auth } from '../logic/api'

export const Employers = () => {
  const employers = [
    {
      id: 1,
      name: "abc",
      position: "ABC",
      number: "7999",
      hireDate: "21.01.22",
      fireDate: "23.04.22"
    }
  ];

  return <Container className='p-5 d-sm-mw-60'>
    <AddEmployerForm/>
    <Container className='mw-100 mt-5'>
      <EmployersList employers={employers} onEmployerEdit={""}/>
    </Container>
  </Container>
}