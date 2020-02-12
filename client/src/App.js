import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import uuid from "uuid";

function App() {
  const [categories, setCategories] = useState([
    { id: uuid(), title: "Entertainment" },
    { id: uuid(), title: "Favorites" },
    { id: uuid(), title: "Goals" },
    { id: uuid(), title: "Gratitude" },
    { id: uuid(), title: "Opinions" },
    { id: uuid(), title: "Would You Rather" }
  ]);

  return (
    <div className="App">
      <AppNavbar categories={categories} />
    </div>
  );
}

export default App;
