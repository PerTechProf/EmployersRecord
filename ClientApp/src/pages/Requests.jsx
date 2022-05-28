import React from 'react'
import { Container } from 'react-bootstrap'

export const Requests = () => {
  const requests = [
    {
      Id: 1,
      Name: "abc",
      Email: "a@a.com",
      Request: "qqq",
      Status: "status"
    }
  ];
  return <div style={{ width: "90%", margin: "0 auto", marginTop: "2%" }}>
    <AddEmployerForm />
    <Container className='mt-5'><RequestsList requests={requests} /></Container>
  </div>
}