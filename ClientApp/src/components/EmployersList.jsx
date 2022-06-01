import React from "react";
import { Table, Button } from "react-bootstrap";

export const EmployersList = ({employers}) => {
  return (
    <
// @ts-ignore
    Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Почта</th>
          <th>Должность</th>
          <th>Номер телефона</th>
          <th>Дата устройства</th>
          <th>Дата увольнения</th>
        </tr>
      </thead>
      <tbody>
        {employers.map((employer) =>
                <tr key={employer.id}>
                  <td>{employer.id}</td>
                  <td>{employer.name}</td>
                  <td>{employer.email}</td>
                  <td>{employer.position}</td>
                  <td>{employer.phoneNumber}</td>
                  <td>{employer.hireDate}</td>
                  <td>{employer.fireDate}</td>
                  <td><Button variant="outline-primary">Изменить</Button></td>
                </tr>
          )}

      </tbody>
    </Table>
  );
};
