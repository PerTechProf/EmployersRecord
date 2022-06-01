import React from "react";
import { Table, Button } from "react-bootstrap";
import { applicationTypes } from "../logic/mappers";

export const ReportsList = ({reports}) => {
  return (
// @ts-ignore
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
                  <td>{report.application.date}</td>
                  <td>
                    <Button variant="outline-primary">Подробно</Button>
                  </td>
                </tr>
          )}

      </tbody>
    </Table>
  );
};