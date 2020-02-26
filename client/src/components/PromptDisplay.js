import React from "react";
import "./PromptDisplay.scss";
import { Jumbotron, Button } from "reactstrap";

function PromptDisplay(props) {
  return (
    <div className="jumbotron-container">
      <Jumbotron>
        <p className="category-title">{props.isLoading ? "" : props.prompt.category.title}</p>
        <h3 className="prompt-text">{props.isLoading ? "..." : props.prompt.text}</h3>
        {/* <p classNae="lead">Would You Rather</p> */}
        <Button color="dark" size="lg" onClick={props.clickHandler}>
          Next
        </Button>
      </Jumbotron>
    </div>
  );
}

export default PromptDisplay;
