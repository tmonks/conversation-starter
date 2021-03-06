import React, { useState } from "react";
import axios from "axios";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import ReactGA from "react-ga";
import "./ContentContainer.scss";

const AddPrompt = props => {
  const [category, setCategory] = useState(null);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [clientErrorMessage, setClientErrorMessage] = useState("");

  const handleChangeCategory = event => {
    setCategory(event.target.value);
  };

  const handleChangeText = event => {
    setText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (text.length < 25) {
      setClientErrorMessage("Prompt text should be at least 25 characters");
    } else {
      setClientErrorMessage("");
      axios
        .post("/api/prompts", { category_id: category || props.categories[0]._id, text })
        .then(res => {
          setErrorMessage("");
          setText("");
          setSuccessMessage("Thank you, your conversation prompt has been added successfully.");
          ReactGA.event({
            category: "Form",
            action: "Successful Submit"
          });
        })
        .catch(err => {
          console.log(err.response);
          setSuccessMessage("");
          setErrorMessage(
            "Sorry, we were unable to save your conversation prompt. " + err.response.data.error ||
              "Unknown error"
          );
          ReactGA.event({
            category: "Form",
            action: "Unsuccessful Submit",
            label: err.response.data.error
          });
        });
    }
  };

  const handleClickAnother = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="content-container">
      <h4>Add a Prompt</h4>
      {clientErrorMessage && <Alert color="danger">{clientErrorMessage}</Alert>}
      {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
      {successMessage && <Alert color="success">{successMessage}</Alert>}
      {errorMessage || successMessage ? (
        <Button onClick={handleClickAnother}>Add Another</Button>
      ) : (
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="category">Category</Label>
            <Input
              type="select"
              name="category"
              id="category"
              value={category || undefined}
              onChange={handleChangeCategory}
            >
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
