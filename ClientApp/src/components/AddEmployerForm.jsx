import React, { useRef, useState } from 'react'
import { Form, InputGroup, Button, Col } from 'react-bootstrap'
import { auth } from "../logic/api";

export const AddEmployerForm = ({ id = null, name = "", position = "", email = "", password = "", phoneNumber = "", hireDate = new Date().toISOString(), isEditing = false }) => {
  const [validated, setValidated] = useState(false);
  const nameInput = useRef(name);
  const positionInput = useRef(position);
  const emailInput = useRef(email);
  const passwordInput = useRef(password);
  const phoneNumberInput = useRef(phoneNumber);
  const hireDateInput = useRef(hireDate);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    auth.createEmployer(
      nameInput.current.value,
      positionInput.current.val,
      emailInput.value,
      passwordInput.value,
      phoneNumberInput.value,
      hireDateInput.value
    );
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            ref={nameInput}
            required
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Должность</Form.Label>
          <Form.Control
            ref={positionInput}
            required
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Почта</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              ref={emailInput}
              type="email"
              placeholder="Email"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Пожалуйста введите почту
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            ref={passwordInput}
            type="password"
            placeholder="password"
            required
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control
            ref={phoneNumberInput}
            type="text"
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Дата устройства</Form.Label>
          <Form.Control
            ref={hireDateInput}
            type="text"
            required
          />
        </Form.Group>
      </Form.Row>
      <Button className='float-right' type="submit">Добавить сотрудника</Button>
    </Form>
  );
}
