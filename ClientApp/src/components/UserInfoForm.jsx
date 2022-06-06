import React, { useRef } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useApi } from "../logic/hooks";

export const UserInfoForm = ({
  name,
  position,
  email,
  phoneNumber,
  hireDate = new Date().toLocaleDateString(),
}) => {
  const { auth } = useApi();

  const oldPassword = useRef({value: ""});
  const newPassword = useRef({value: ""});

  const phoneNumberInput = useRef({value: phoneNumber});

  const updatePassword = () => {
    auth.changePassword(oldPassword.current.value, newPassword.current.value);
    oldPassword.current.value = "";
    newPassword.current.value = "";
  }

  const updatePhoneNumber = () => {
    try {
      auth.changePhoneNumber(phoneNumberInput.current.value);
    } catch {
      phoneNumberInput.current.value = phoneNumber;
    }
  }

  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Имя
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={name} />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Почта
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={email} />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Должность
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={position} />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Дата устройства
        </Form.Label>
        <Col sm="10">
          <Form.Control plaintext readOnly defaultValue={hireDate} />
        </Col>
      </Form.Group>

      <Row className="mt-4">
        <Col>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Номер телефона
            </Form.Label>
            <Col sm="10">
              <Form.Control ref={phoneNumberInput} type="tel" defaultValue={phoneNumber} />
            </Col>
          </Form.Group>
          <Button onClick={updatePhoneNumber} className='float-right'>Изменить номер телефона</Button>
        </Col>
      </Row>

      <Row className="mt-4">
          <Container as={Row}>
            <Form.Group as={Col} md="6">
              <Form.Label>
                Старый пароль
              </Form.Label>
              <Form.Control ref={oldPassword} type="password" placeholder="Старый пароль" />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>
                Новый пароль
              </Form.Label>
              <Form.Control ref={newPassword} type="password" placeholder="Новый пароль" />
            </Form.Group>
          </Container>
          <Container as={Col} md="12">
            <Button onClick={updatePassword} className='float-right'>Изменить пароль</Button>
          </Container>
      </Row>

    </Form>
  )
}