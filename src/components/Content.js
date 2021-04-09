import React from "react";
import { Card, Button } from "react-bootstrap";

const Content = ({ img, content_title, content_text, content_comment }) => {
  return (
    <div className="div-content">
      <Card style={{ width: "18rem" }} className="card-content">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{content_title}</Card.Title>
          <Card.Text>{content_text}</Card.Text>
          <Card.Text>{content_comment}</Card.Text>
          <Button variant="primary">READ MORE</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Content;
