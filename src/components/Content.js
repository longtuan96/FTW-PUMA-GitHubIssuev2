import React from "react";
import { Card, Button } from "react-bootstrap";

const Content = ({ img }) => {
  return (
    <div className="div-content">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">READ MORE</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Content;
