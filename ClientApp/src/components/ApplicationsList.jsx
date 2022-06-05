import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { applicationTypes, statusTypes } from "../logic/mappers";
import { selectIsEditor } from "../store/authReducer";
import { ApplicationDescriptionModal } from "./ApplicationDescriptionModal";

export const ApplicationsList = ({applications}) => {
  const isEditor = useSelector(selectIsEditor);

  const [modalApplication, setModalApplication] = useState({});
  const [isShowModal, setShowModal] = useState(false);

  const onShowModal = (name, content) => {
    setShowModal(true);
    setModalApplication({name, content});
  }

  const onHide = () => {
    setShowModal(false);
  }

  return (
// @ts-ignore
    <>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Имя</th>
          {isEditor && <th>Имя сотрудника</th>}
          <th>Тип заявки</th>
          <th>Статус заявки</th>
          <th>Дата создания заявки</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application, index) =>
                <tr key={application.id}>
                  <td>{index}</td>
                  <td>{application.name}</td>
                  {isEditor && <td>{application.employer.name}</td>}
                  <td>{applicationTypes[application.type]}</td>
                  <td>{statusTypes[application.status]}</td>
                  <td>{application.date.toLocaleDateString()}</td>
                  <td>
                  {isEditor && <>
                    <Button variant="outline-success">Принять</Button>
                    <Button className="ml-3" variant="outline-danger">Отклонить</Button>
                    </>}
                    <Button variant="outline-primary" 
                      onClick={onShowModal(application.name, application.content)}
                    >
                      Просмотреть
                    </Button>
                  </td>
                </tr>
          )}
      </tbody>
    </Table>
    <ApplicationDescriptionModal 
      show={isShowModal} 
      name={modalApplication.name} 
      content={modalApplication.content}
      onHide={onHide}
    />
    </>
  );
};