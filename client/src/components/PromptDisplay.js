import React from "react";
import "./PromptDisplay.scss";
import "./ContentContainer.scss";
import { Jumbotron, Button, Spinner } from "reactstrap";

function PromptDisplay(props) {
  return (
    <div className={"prompt-container " + (props.isLoading ? "loading" : "")}>
      {props.isLoading ? (
        <Spinner />
      ) : (
        <div>
          <p className="category-title">{props.prompt ? props.prompt.category.title : ""}</p>
          <h3 className="prompt-text">{props.prompt ? props.prompt.text : "Loading..."}</h3>
          <Button color="dark" size="lg" className="next-button" onClick={props.clickHandler}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default PromptDisplay;
