import React from "react";
import { Table, Button } from "react-bootstrap";

export const ApplicationsList = ({applications}) => {
  return (
    <
// @ts-ignore
    Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Тип заявки</th>
          <th>Статус заявки</th>
          <th>Дата создания заявки</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) =>
                <tr key={application.id}>
                  <td>{application.id}</td>
                  <td>{application.name}</td>
                  <td>{application.type}</td>
                  <td>{application.status}</td>
                  <td>{application.date}</td>
                  <td><Button variant="outline-success">Принять</Button></td>
                  <td><Button variant="outline-danger">Отклонить</Button></td>
                </tr>
          )}

      </tbody>
    </Table>
  );
};