import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import AddCategory from "./components/AddCategory";
import AddBill from "./components/AddBill";
import NavBar from "./components/NavBar";
import Chart from "./components/Chart";
import BillsTable from "./components/BillsTable";

function App() {
  const [shouldShowAddCategory, setShouldShowAddCategory] = useState(false);

  const [categories, setCategories] = useState([]);

  const addCategory = category => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCategory(false);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  useEffect(() => {
    const categoriesInLocalStorage = JSON.parse(
      localStorage.getItem("categories")
    );

    setCategories(categoriesInLocalStorage);

    if (!categoriesInLocalStorage) {
      setShouldShowAddCategory(true);
    }
  }, []);

  const showAddCategory = () => {
    setShouldShowAddCategory(true);
  };

  return (
    <div className="App">
      {shouldShowAddCategory ? (
        <AddCategory onSubmit={addCategory} />
      ) : (
        <div>
          <NavBar categories={categories} showAddCategory={showAddCategory} />

          <div className="container flex">
            <div className="w-1/2">
              <BillsTable />
            </div>
            <div className="w-1/2">
              <Chart />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
