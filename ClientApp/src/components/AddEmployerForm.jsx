import React, {useState} from 'react'
import {Form,InputGroup,Button,Col} from 'react-bootstrap'

export const AddEmployerForm = ({id, name, position, email, number, hireDate, fireDate}) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Имя</Form.Label>
          <Form.Control
            required
            type="text"
            value={name}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Должность</Form.Label>
          <Form.Control
            required
            type="text"
            value={position}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Почта</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="email"
              placeholder="Логин"
              value={email}
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
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>Номер телефона</Form.Label>
          <Form.Control 
          type="text" 
          required
          value={number} />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>Дата устройства</Form.Label>
          <Form.Control 
          type="text" 
          required
          value={hireDate} />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Дата увольнения</Form.Label>
          <Form.Control 
          type="text" 
          placeholder="Дата увольнения"
          value={fireDate} 
          required />
        </Form.Group>
      </Form.Row>
      <Button className='float-right' type="submit">Добавить сотрудника</Button>
    </Form>
  );
}
