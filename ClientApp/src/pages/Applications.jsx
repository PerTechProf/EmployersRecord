import React, { useEffect, useState, useCallback } from 'react'
import { Container } from 'react-bootstrap'
import { ApplicationsList } from '../components/ApplicationsList';
import { CreateApplicationForm } from '../components/CreateApplicationForm';
import { useApi } from '../logic/hooks';

export const Applications = () => {
  const [applications, setApplications] = useState([]);

  const api = useApi();

  const loadApplications = async () => setApplications(
    (await api.applications.getApplications())
      .map(
        (application) => 
          ({...application, date: new Date(application.date)})
      )
  );

  useEffect(() => {
    loadApplications();
  }, []);
  
  return (
    <div style={{ width: "90%", margin: "0 auto", marginTop: "2%" }}>
      <CreateApplicationForm/>
      <Container className='mt-5'>
        <ApplicationsList applications={applications}/>
      </Container>
    </div>
  )
}