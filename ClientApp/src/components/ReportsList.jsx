import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { applicationTypes } from "../logic/mappers";
import { ApplicationDescriptionModal } from "./ApplicationDescriptionModal";

export const ReportsList = ({reports}) => {
  const [isShowModal, setShowModal] = useState(false);
  const [modalReport, setModalReport] = useState(null);

  const onHide = () =>
    setShowModal(false);
  
  const onShowDescription = async (report) => {
    setModalReport(report);
    setShowModal(true);
  }

  return ( <>
    {/* @ts-ignore */}
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Имя заявки</th>
          <th>Имя сотрудника</th>
          <th>Тип заявки</th>
          <th>Дата</th>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) =>
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.application.name}</td>
                  <td>{report.application.employer.name}</td>
                  <td>{applicationTypes[report.application.type]}</td>
                  <td>{new Date(report.application.date).toLocaleDateString()}</td>
                  <td>
                    <Button 
                      onClick={() => onShowDescription(report)} 
                      variant="outline-primary"
                    >
                      Подробно
                    </Button>
                  </td>
                </tr>
          )}

      </tbody>
    </Table>
    <ApplicationDescriptionModal 
      show={isShowModal} 
      name={modalReport?.application.name} 
      content={modalReport?.application.content}
      onHide={onHide}
    />
    </>
  );
};