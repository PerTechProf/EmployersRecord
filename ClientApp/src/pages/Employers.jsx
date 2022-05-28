import React from 'react'
import { AddEmployerForm } from '../components/AddEmployerForm'
import { EmployersList } from '../components/EmployersList'
import { Container } from 'react-bootstrap'

export const Employers = () => {
  const employers = [
    {
      Id: 1,
      Name: "abc",
      Position: "ABC",
      Number: "7999",
      HireDate: "21.01.22",
      FireDate: "23.04.22"
    },
    {
      Id: 2,
      Name: "abc",
      Position: "ABC",
      Number: "7999",
      HireDate: "21.01.22",
      FireDate: "23.04.21"
    }
  ];
  return <div style={{ width: "90%", margin: "0 auto", marginTop: "2%" }}>
    <AddEmployerForm />
    <Container className='mt-5'><EmployersList employers={employers} /></Container>
  </div>
}