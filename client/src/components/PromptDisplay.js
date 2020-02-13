import React from "react";
import "./PromptDisplay.scss";
import { Jumbotron, Button } from "reactstrap";

function PromptDisplay(props) {
  return (
    <Jumbotron>
      <h2>Would you rather be a zookeeper or a vet?</h2>
      <p className="lead">Would You Rather</p>
      <Button color="primary">Next</Button>
    </Jumbotron>
  );
}

export default PromptDisplay;
