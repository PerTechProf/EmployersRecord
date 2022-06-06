import React, { useRef, useEffect } from 'react'
import { Form, InputGroup, Button, Col } from 'react-bootstrap'
import { useApi } from '../logic/hooks';

export const AddEmployerForm = ({
  id = null,
  name = "",
  position = "",
  email = "",
  phoneNumber = "",
  hireDate = null,
  fireDate = null,
  setEmployerOnEdit = async (x) => {},
  onAddition
}) => {
  const { auth } = useApi();

  const hireDateParsed = new Date(hireDate).toISOString().slice(0,10);
  const fireDateParsed = fireDate && new Date(fireDate).toISOString().slice(0,10);

  const nameInput = useRef({value: name});
  const positionInput = useRef({value: position});
  const emailInput = useRef({value: email});
  const passwordInput = useRef({value: ""});
  const phoneNumberInput = useRef({value: phoneNumber});
  const hireDateInput = useRef({value: hireDateParsed});
  const fireDateInput = useRef({value: fireDateParsed});

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (!id)
      await auth.createEmployer(
        nameInput?.current?.value,
        positionInput?.current?.value,
        emailInput?.current?.value,
        passwordInput?.current?.value,
        phoneNumberInput?.current?.value
      );
    if (id) {
      await auth.editEmployer(
        id,
        nameInput?.current?.value,
        positionInput?.current?.value,
        emailInput?.current?.value,
        phoneNumberInput?.current?.value,
        hireDateInput.current.value && new Date(hireDateInput.current.value) || hireDate,
        fireDateInput.current.value ? new Date(fireDateInput.current.value) : null
      );
    }
    setEmployerOnEdit(null);
    await onAddition();
  }

  useEffect(() => {
    nameInput.current.value = name;
    positionInput.current.value = position;
    emailInput.current.value = email;
    phoneNumberInput.current.value = phoneNumber;
  })

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="8">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            ref={nameInput}
            defaultValue={name}
            required
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
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
        <Form.Group as={Col} md="4">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            disabled={id ? true : false}
            ref={passwordInput}
            defaultValue={(id && "ffffffff") || ""}
            type="password"
            placeholder="password"
            required
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
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
        <Form.Group as={Col} md="4">
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control
            ref={phoneNumberInput}
            defaultValue={phoneNumber}
            type="tel"
            required
          />
        </Form.Group>
      </Form.Row>
      {id && <Form.Row>
        <Form.Group as={Col} md="4">
          <Form.Label>Дата найма</Form.Label>
          <InputGroup>
            <Form.Control
              formNoValidate
              ref={hireDateInput}
              defaultValue={hireDateParsed}
              type="date"
            />
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Дата увольнения</Form.Label>
          <Form.Control
            formNoValidate
            ref={fireDateInput}
            defaultValue={fireDateParsed}
            type="date"
          />
        </Form.Group>
        <Form.Group as={Col} md="3">
          <Form.Label>Отменить увольнение</Form.Label>
          <Button onClick={() => fireDateInput.current.value = null}>Вернуть сотрудника</Button>
        </Form.Group>
      </Form.Row>}
      <Button className='float-right' type="submit">{id ? "Изменить данные" : "Добавить сотрудника"}</Button>
    </Form>
  );
}
