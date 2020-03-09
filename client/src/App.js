import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import AppNavbar from "./components/AppNavbar";
import PromptDisplay from "./components/PromptDisplay";
import Home from "./components/Home";
import About from "./components/About";
import AddPrompt from "./components/AddPrompt";
import axios from "axios";

function App() {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
  const [categories, setCategories] = useState([]);
  const [prompt, setPrompt] = useState({});
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const getPrompt = () => {
    const params = {};
    if (currentCategoryId) {
      params.category_id = currentCategoryId;
    }
    if (prompt._id) {
      // send current prompt ID to avoid repeats
      params.not_prompt_id = prompt._id;
    }
    console.log("Getting prompt with parameters: ");
    console.log(params);
    axios
      .get("/api/prompts/random", { params })
      // .get(currentCategoryId ? route + "category_id=" + currentCategoryId : route)
      .then(res => {
        setPrompt(res.data);
        setIsLoadingPrompt(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateCategory = categoryId => {
    console.log("Setting categoryId to " + categoryId);
    setCurrentCategoryId(categoryId);
  };

  // Get Prompt on load
  useEffect(() => {
    getPrompt();
  }, []);

  // Get Categories on load
  useEffect(() => {
    axios
      .get("/api/categories")
      .then(res => {
        console.log(res.data);
        setCategories(res.data);
        setIsLoadingCategories(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // get a new prompt when a new category is selected
  useEffect(() => {
    getPrompt();
  }, [currentCategoryId]);

  return (
    <BrowserRouter>
      <div className="App">
        <AppNavbar
          categories={categories}
          isLoading={isLoadingCategories}
          // clickHandler={categoryId => setCurrentCategory(categoryId)}
          updateCategory={updateCategory}
          currentCategoryId={currentCategoryId}
        />
        <Route
          exact
          path="/"
          render={props => (
            <PromptDisplay
              {...props}
              prompt={prompt}
              isLoading={isLoadingPrompt}
              clickHandler={getPrompt}
            />
          )}
        />
        {/* <PromptDisplay prompt={prompt} isLoading={isLoadingPrompt} clickHandler={getPrompt} /> */}
        <Route path="/about" component={About} />
        <Route path="/add" render={props => <AddPrompt {...props} categories={categories} />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
