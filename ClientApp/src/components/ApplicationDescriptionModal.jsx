import React from "react"
import { Modal } from "react-bootstrap"

export const ApplicationDescriptionModal = ({show, name, content, onHide}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
    </Modal>
  );
}