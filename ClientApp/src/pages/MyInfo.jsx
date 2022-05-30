import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserInfoForm } from "../components/UserInfoForm";

export const MyInfo =() => {
  return (
    <Container className="mt-5">
      <Row>
        <Col><UserInfoForm/></Col>
      </Row>
    </Container>
  )
}