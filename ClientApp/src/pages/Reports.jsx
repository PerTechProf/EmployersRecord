import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { ReportsList } from '../components/ReportsList';
import { useApi } from '../logic/hooks';

export const Reports = () => {
  const [reports, setReports] = useState([]);
  const api = useApi();

  const loadReports = 
    async () => setReports(await api.reports.getReports()); 

  useEffect(() => {
    loadReports();
  }, []);
  
  return (
    <div style={{ width: "90%", margin: "0 auto", marginTop: "2%" }}>
      <Container className='mt-5'><ReportsList reports={reports} /></Container>
    </div>
  )
}