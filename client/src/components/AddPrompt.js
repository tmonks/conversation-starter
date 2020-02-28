import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./ContentContainer.scss";

const AddPrompt = props => {
  return (
    <div className="content-container">
      <h4>Add a Prompt</h4>
      <Form method="post" action="/api/prompts">
        <FormGroup>
          <Label for="category">Category</Label>
          <Input type="select" name="category" id="category">
            {props.categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="promptText">Prompt Text</Label>
          <Input type="textarea" name="text" id="promptText" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default AddPrompt;
