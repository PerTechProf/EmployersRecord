import React from "react";
import { Table, Button } from "react-bootstrap";

export const EmployersList = ({employers}) => {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Должность</th>
          <th>Номер телефона</th>
          <th>Дата устройства</th>
          <th>Дата увольнения</th>
        </tr>
      </thead>
      <tbody>
        {employers.map((employer) =>
                <tr key={employer.Id}>
                  <td>{employer.Id}</td>
                  <td>{employer.Name}</td>
                  <td>{employer.Position}</td>
                  <td>{employer.Number}</td>
                  <td>{employer.HireDate}</td>
                  <td>{employer.FireDate}</td>
                  <td><Button variant="outline-primary">Изменить</Button></td>
                </tr>
          )}

      </tbody>
    </Table>
  );
};
