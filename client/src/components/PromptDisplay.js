import React from "react";
import "./PromptDisplay.scss";
import "./ContentContainer.scss";
import { Button, Spinner } from "reactstrap";

function PromptDisplay(props) {
  return (
    <div className={"content-container center " + (props.isLoading ? "loading" : "")}>
      {props.isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <div>
          <p className="category-title">{props.prompt ? props.prompt.category.title : ""}</p>
          <h3 className="prompt-text">{props.prompt ? props.prompt.text : "Loading..."}</h3>
          <Button size="lg" className="next-button" onClick={props.clickHandler}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default PromptDisplay;
