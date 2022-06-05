import React, { useRef, useState } from 'react'
import { Form, InputGroup, Button, Col } from 'react-bootstrap'
import { useApi } from '../logic/hooks';

export const AddEmployerForm = ({
  id = null,
  name = "",
  position = "",
  email = "",
  password = "",
  phoneNumber = "",
  hireDate = new Date().toISOString(),
  isEditor = false
}) => {
  const [validated, setValidated] = useState(false);

  const { auth } = useApi();

  const nameInput = useRef();
  const positionInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const phoneNumberInput = useRef();
  const hireDateInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(event.target.checkValidity());
    if (event.target.checkValidity())
      auth.createEmployer(
        nameInput?.current?.value,
        positionInput?.current?.value,
        emailInput?.current?.value,
        passwordInput?.current?.value,
        phoneNumberInput?.current?.value
      );
  }

  return (
    <Form validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="8" controlId="validationCustom01">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            ref={nameInput}
            defaultValue={name}
            required
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Должность</Form.Label>
          <Form.Control
            ref={positionInput}
            defaultValue={position}
            required
            type="text"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom05">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            ref={passwordInput}
            defaultValue={password}
            type="password"
            placeholder="password"
            required
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
              defaultValue={email}
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
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control
            ref={phoneNumberInput}
            defaultValue={phoneNumber}
            type="text"
            required
          />
        </Form.Group>
      </Form.Row>
      <Button className='float-right' type="submit">Добавить сотрудника</Button>
    </Form>
  );
}
