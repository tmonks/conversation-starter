import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import AppNavbar from "./components/AppNavbar";
import PromptDisplay from "./components/PromptDisplay";
import About from "./components/About";
import AddPrompt from "./components/AddPrompt";
import axios from "axios";

function App() {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
  const [categories, setCategories] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState(-1);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const nextPrompt = () => {
    // setCurrentPrompt(Math.floor(Math.random() * prompts.length));
    setCurrentPrompt((currentPrompt + 1) % prompts.length);
  };

  // Select a new category to filter prompts
  const updateCategory = categoryId => {
    console.log("Setting categoryId to " + categoryId);
    setCurrentCategoryId(categoryId);
  };

  // Get Prompts on load or whenever category is changed
  useEffect(() => {
    let route = "/api/prompts" + (currentCategoryId ? "?category_id=" + currentCategoryId : "");
    setIsLoadingPrompt(true);
    axios
      .get(route)
      .then(res => {
        setPrompts(res.data);
        console.log("Retrieved " + res.data.length + " prompts");
        setIsLoadingPrompt(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentCategoryId]);

  // Select next prompt whenever prompts are updated
  useEffect(() => {
    // nextPrompt();
    setCurrentPrompt(0);
  }, [prompts]);

  // Get Categories on load
  useEffect(() => {
    axios
      .get("/api/categories")
      .then(res => {
        console.log("Categories retrieved: ", res.data);
        setCategories(res.data);
        setIsLoadingCategories(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <AppNavbar
          categories={categories}
          isLoading={isLoadingCategories}
          updateCategory={updateCategory}
          currentCategoryId={currentCategoryId}
        />
        <div className="card-container">
          <Route
            exact
            path="/"
            render={props => (
              <PromptDisplay
                {...props}
                prompt={prompts[currentPrompt]}
                isLoading={isLoadingPrompt}
                clickHandler={nextPrompt}
              />
            )}
          />
          <Route path="/about" component={About} />
          <Route path="/add" render={props => <AddPrompt {...props} categories={categories} />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
