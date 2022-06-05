import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export const UserInfoForm = ({
  name,
  position,
  email,
  phoneNumber,
  hireDate,
}) => {
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
              <Form.Control type="tel" defaultValue={phoneNumber} />
            </Col>
          </Form.Group>
          <Button className='float-right' type="submit">Изменить номер телефона</Button>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Form.Group  as={Row}>
            <Form.Label column sm="2">
              Новый пароль
            </Form.Label>
            <Col sm="10">
              <Form.Control type="password" placeholder="Новый пароль" />
            </Col>
          </Form.Group>
          <Button className='float-right' type="submit">Изменить пароль</Button>
        </Col>
      </Row>

    </Form>
  )
}