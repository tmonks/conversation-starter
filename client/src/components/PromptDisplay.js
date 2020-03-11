import React from "react";
import "./PromptDisplay.scss";
import { Jumbotron, Button, Spinner } from "reactstrap";

function PromptDisplay(props) {
  return (
    <Jumbotron className={props.isLoading ? "loading" : ""}>
      {props.isLoading ? (
        <Spinner />
      ) : (
        <div>
          <p className="category-title">{props.prompt ? props.prompt.category.title : ""}</p>
          <h3 className="prompt-text">{props.prompt ? props.prompt.text : "Loading..."}</h3>
          <Button color="dark" size="lg" onClick={props.clickHandler}>
            Next
          </Button>
        </div>
      )}
    </Jumbotron>
  );
}

export default PromptDisplay;
