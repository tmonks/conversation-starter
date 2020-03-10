import React from "react";
import "./PromptDisplay.scss";
import { Jumbotron, Button, Spinner } from "reactstrap";

function PromptDisplay(props) {
  return (
    <div className="jumbotron-container">
      <Jumbotron>
        {props.isLoading ? (
          <Spinner style={{ width: "3rem", height: "3rem" }} />
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
    </div>
  );
}

export default PromptDisplay;
