import React from "react";
import { Table, Button } from "react-bootstrap";

export const EmployersList = ({employers}) => {
  return (
// @ts-ignore
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th className="d-none d-md-table-cell">#</th>
          <th>Имя</th>
          <th className="d-none d-md-table-cell">Почта</th>
          <th className="d-none d-sm-table-cell">Должность</th>
          <th className="d-none d-sm-table-cell">Номер телефона</th>
          <th className="d-none d-md-table-cell">Дата устройства</th>
          <th className="d-none d-md-table-cell">Дата увольнения</th>
        </tr>
      </thead>
      <tbody>
        {employers.map((employer, index) =>
                <tr key={employer.id}>
                  <td className="d-none d-md-table-cell">{index + 1}</td>
                  <td>{employer.name}</td>
                  <td className="d-none d-md-table-cell">{employer.email}</td>
                  <td className="d-none d-sm-table-cell">{employer.position}</td>
                  <td className="d-none d-sm-table-cell">{employer.phoneNumber}</td>
                  <td className="d-none d-md-table-cell">{employer.hireDate}</td>
                  <td className="d-none d-md-table-cell">{employer.fireDate}</td>
                  <td>
                      <Button className="mr-auto ml-auto" variant="outline-primary">Изменить</Button>
                  </td>
                </tr>
          )}

      </tbody>
    </Table>
  );
};
