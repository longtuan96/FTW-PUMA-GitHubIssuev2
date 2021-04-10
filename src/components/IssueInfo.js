import React, { useState } from "react";
import { Button, Media, Modal, ModalFooter, Pagination } from "react-bootstrap";

const IssueInfo = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <ModalFooter>
            <Media>
              <img
                width={64}
                height={64}
                className="mr-3"
                src={props.comment_avatar}
                alt="The avatar"
              />
              <Media.Body>
                {/* <div className={"d-flex"}>
                  <p>{props.issue_number}</p>

                  <p></p>
                </div> */}
              </Media.Body>
            </Media>
          </ModalFooter>
        </Modal>
      </>
    </div>
  );
};

export default IssueInfo;
