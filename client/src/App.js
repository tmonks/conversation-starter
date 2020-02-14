import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import AppNavbar from "./components/AppNavbar";
import PromptDisplay from "./components/PromptDisplay";
import axios from "axios";

function App() {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
  const [categories, setCategories] = useState([]);
  const [prompt, setPrompt] = useState({});

  const getPrompt = () => {
    axios
      .get("/api/prompts/random")
      .then(res => {
        setPrompt(res.data);
        setIsLoadingPrompt(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // Get Categories
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

  // Get Prompt
  useEffect(() => {
    getPrompt();
  }, []);

  return (
    <div className="App">
      <AppNavbar categories={categories} isLoading={isLoadingCategories} />
      <PromptDisplay prompt={prompt} isLoading={isLoadingPrompt} clickHandler={getPrompt} />
    </div>
  );
}

export default App;
