import React, { useState, useEffect } from "react";
import { Router, Route } from "react-router-dom";
import axios from "axios";
import ReactGA from "react-ga";
import { createBrowserHistory } from "history";

// Bootstrap needs to be loaded before custom CSS
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./App.scss";

import AppNavbar from "./components/AppNavbar";
import PromptDisplay from "./components/PromptDisplay";
import About from "./components/About";
import AddPrompt from "./components/AddPrompt";

const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

function App() {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingPrompt, setIsLoadingPrompt] = useState(true);
  const [categories, setCategories] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [currentPrompt, setCurrentPrompt] = useState(-1);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  // initialize Google Analytics
  useEffect(() => {
    ReactGA.initialize("UA-161823848-1");
    // report initial page view
    ReactGA.pageview(window.location.pathname);
  }, []);

  const nextPrompt = () => {
    setCurrentPrompt((currentPrompt + 1) % prompts.length);
    // report an event to GA
    ReactGA.event({
      category: "Button",
      action: "Click",
      label: "Next"
    });
  };

  // Select a new category to filter prompts
  const updateCategory = categoryId => {
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
        setIsLoadingPrompt(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentCategoryId]);

  // Reset current prompt whenever prompts are updated
  useEffect(() => {
    setCurrentPrompt(0);
  }, [prompts]);

  // Get Categories on load
  useEffect(() => {
    axios
      .get("/api/categories")
      .then(res => {
        setCategories(res.data);
        setIsLoadingCategories(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <Router history={history}>
      <div className="App">
        <AppNavbar
          categories={categories}
          isLoading={isLoadingCategories}
          updateCategory={updateCategory}
          currentCategoryId={currentCategoryId}
        />
        <div className="card-container">

          {/* Home page with PromptDisplay */}
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

          {/* About page */}
          <Route path="/about" component={About} />

          {/* Add prompt form */}
          <Route path="/add" render={props => <AddPrompt {...props} categories={categories} />} />
        </div>
      </div>
    </Router>
  );
}

export default App;
