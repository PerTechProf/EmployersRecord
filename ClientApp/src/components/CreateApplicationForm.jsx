import React, {useState} from 'react'
import {Form,InputGroup,Button,Col,FormControl} from 'react-bootstrap'

export const CreateApplicationForm = ({id = null, name = "", type = ""}) => {
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
        <Form.Group as={Col} md="8">
          <Form.Label>Оглавление заявки</Form.Label>
          <Form.Control
            required
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Тип заявки</Form.Label>
          <Form.Control
            required
            type="text"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12">
          <Form.Label>Описание заявки</Form.Label>
          <FormControl as="textarea" aria-label="Ввод описания" />
        </Form.Group>
      </Form.Row>
      <Button className='float-right' type="submit">Отправить заявку</Button>
    </Form>
  );
}