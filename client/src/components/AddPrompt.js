import React, { useState } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./ContentContainer.scss";

const AddPrompt = props => {
  const [category, setCategory] = useState(null);
  const [text, setText] = useState("");

  const handleChangeCategory = event => {
    setCategory(event.target.value);
  };

  const handleChangeText = event => {
    setText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log({ category_id: category, text });
    axios
      .post("/api/prompts", { category_id: category, text })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="content-container">
      <h4>Add a Prompt</h4>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input type="select" name="category" id="category" onChange={handleChangeCategory}>
            {props.categories.map(cat => (
              <option key={cat._id} value={cat._id}>
                {cat.title}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="promptText">Prompt Text</Label>
          <Input type="textarea" name="text" id="promptText" onChange={handleChangeText} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default AddPrompt;
