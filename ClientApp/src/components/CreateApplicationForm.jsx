import React, {useRef, useState} from 'react'
import {Form,InputGroup,Button,Col,FormControl} from 'react-bootstrap'
import { useApi } from '../logic/hooks';
import { applicationTypes } from '../logic/mappers';

export const CreateApplicationForm = () => {
  const [validated, setValidated] = useState(false);
  const {applications} = useApi();
  const nameInput = useRef();
  const typeInput = useRef();
  const contentInput = useRef();


  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(event.target.checkValidity());
    if (event.target.checkValidity())
      applications.postApplication(
        nameInput.current.value,
        typeInput.current.value,
        contentInput.current.value
      );
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="8">
          <Form.Label>Оглавление заявки</Form.Label>
          <Form.Control
            ref={nameInput}
            required
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} md="4">
          <Form.Label>Тип заявки</Form.Label>
          <Form.Control as="select" ref={typeInput}>
            {applicationTypes.map(
              (type, index) => <option key={index} value={index}>{type}</option>
            )}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12">
          <Form.Label>Описание заявки</Form.Label>
          <FormControl as="textarea" aria-label="Ввод описания" ref={contentInput} />
        </Form.Group>
      </Form.Row>
      <Button className='float-right' type="submit">Отправить заявку</Button>
    </Form>
  );
}