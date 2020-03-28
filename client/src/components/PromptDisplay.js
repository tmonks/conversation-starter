import React from "react";
import { Button, Spinner } from "reactstrap";
import "./PromptDisplay.scss";
import "./ContentContainer.scss";

function PromptDisplay(props) {
  return (
    <div className={"content-container center " + (props.isLoading ? "loading" : "")}>
      {/* If loading, show the spinner */
      props.isLoading ? (
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
