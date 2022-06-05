import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserInfoForm } from "../components/UserInfoForm";
import { useApi } from "../logic/hooks";

export const UserInfo =() => {
  const [userInfo, setUserInfo] = useState([]);
  const api = useApi();

  const loadUserInfo = 
    async () => setUserInfo(await api.auth.getUserInfo()); 
  useEffect(() => {
    loadUserInfo();
  }, []);
  
  return (
    <Container className="mt-5">
      <Row>
        <Col><UserInfoForm {...userInfo}/></Col>
      </Row>
    </Container>
  )
}