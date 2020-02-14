import React from "react";
import "./PromptDisplay.scss";
import { Jumbotron, Button } from "reactstrap";

function PromptDisplay(props) {
  return (
    <Jumbotron>
      <h3>{props.isLoading ? "..." : props.prompt.text}</h3>
      {/* <p className="lead">Would You Rather</p> */}
      <Button color="primary" onClick={props.clickHandler}>
        Next
      </Button>
    </Jumbotron>
  );
}

export default PromptDisplay;
