import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { ApplicationsList } from '../components/ApplicationsList';
import { CreateApplicationForm } from '../components/CreateApplicationForm';

export const Applications = () => {
  const [applications, setApplications] = useState([]);
  const getApplications = async () => {
    setApplications(await (await fetch("api/Applications/GetApplications")).json()) 
  }
  useEffect(() => {
    getApplications();
  }, [])
  
  return <div style={{ width: "90%", margin: "0 auto", marginTop: "2%" }}>
    <CreateApplicationForm/>
    <Container className='mt-5'><ApplicationsList applications={applications} /></Container>
  </div>
}