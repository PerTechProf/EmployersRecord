import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useApi } from "../logic/hooks";
import { applicationTypes, statusTypes } from "../logic/mappers";
import { selectIsEditor } from "../store/authReducer";
import { ApplicationDescriptionModal } from "./ApplicationDescriptionModal";

export const ApplicationsList = ({applications, updateList}) => {
  const isEditor = useSelector(selectIsEditor);

  const [modalApplication, setModalApplication] = useState({});
  const [isShowModal, setShowModal] = useState(false);
  
  const { applications: { approveApplication, rejectApplication } } = useApi();

  const onShowModal = (name, content) => {
    setShowModal(true);
    setModalApplication({name, content});
  }

  const approve = async (id) => {
    await approveApplication(id);
    await updateList();
  }

  const reject = async (id) => {
    await rejectApplication(id);
    await updateList();
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
                  <td>{index+1}</td>
                  <td>{application.name}</td>
                  {isEditor && <td>{application.employer.name}</td>}
                  <td>{applicationTypes[application.type]}</td>
                  <td style={{color: ["black","green","red"][application.status]}}>{statusTypes[application.status]}</td>
                  <td>{application.date.toLocaleDateString()}</td>
                  {isEditor && <td>
                    <Button onClick={() => approve(application.id)} variant="outline-success">Принять</Button>
                    <Button onClick={() => reject(application.id)} className="ml-3" variant="outline-danger">Отклонить</Button>
                  </td>}
                  <td>
                    <Button variant="outline-primary" 
                      onClick={() => onShowModal(application.name, application.content)}
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