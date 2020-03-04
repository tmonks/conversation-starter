import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import "./ContentContainer.scss";

const AddPrompt = props => {
  const [category, setCategory] = useState(null);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChangeCategory = event => {
    setCategory(event.target.value);
  };

  const handleChangeText = event => {
    setText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/prompts", { category_id: category || props.categories[0]._id, text })
      .then(res => {
        console.log(res.data);
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setErrorMessage("");
        setText("");
        setSuccessMessage("Thank you, your conversation prompt has been added successfully.");
      })
      .catch(err => {
        console.log(err);
        setSuccessMessage("");
        setErrorMessage("Sorry, we were unable to save your conversation prompt. " + err.message);
      });
  };

  const handleClickAnother = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="content-container">
      <h4>Add a Prompt</h4>
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
      {successMessage && <Alert color="success">{successMessage}</Alert>}
      {errorMessage || successMessage ? (
        <Button onClick={handleClickAnother}>Add Another</Button>
      ) : (
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
            <Input
              type="textarea"
              maxLength="300"
              name="text"
              id="promptText"
              onChange={handleChangeText}
              value={text}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      )}
    </div>
  );
};

export default AddPrompt;
