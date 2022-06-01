import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { ReportsList } from '../components/ReportsList';
import { useApi } from '../logic/hooks';

export const Reports = () => {
  const [reports, setApplications] = useState([]);
  const api = useApi();

  const loadApplications = 
    async () => setApplications(await api.getApplications()); 
  useEffect(() => {
    loadApplications();
  }, []);
  
  return (
    <div style={{ width: "90%", margin: "0 auto", marginTop: "2%" }}>
      <Container className='mt-5'><ReportsList reports={reports} /></Container>
    </div>
  )
}