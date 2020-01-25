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
  const [shouldShowAddBill, setShouldShowAddBill] = useState(false);
  const [categories, setCategories] = useState([]);
  const [bills, setBills] = useState([]);
  const [activeCategory, setActiveCategory] = useState();

  const addCategory = category => {
    const updatedCategories = [...(categories || []), category];
    setCategories(updatedCategories);
    setShouldShowAddCategory(false);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  const addBill = (amount, category, date) => {
    const bill = { amount, category, date };
    const updatedBills = [...(bills || []), bill];
    setBills(updatedBills);
    setShouldShowAddBill(false);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  const showAddCategory = () => {
    setShouldShowAddCategory(true);
  };

  const showAddBill = () => {
    setShouldShowAddBill(true);
  };

  const removeBill = index => {
    let updatedBills = [...bills];
    updatedBills = updatedBills
      .slice(0, index)
      .concat(updatedBills.slice(index + 1, updatedBills.length));
    setBills(updatedBills);
    localStorage.setItem("bills", JSON.stringify(updatedBills));
  };

  const activeBills = () => {
    return bills
      .filter(bill =>
        activeCategory ? bill.category === activeCategory : true
      )
      .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
  };

  const setNewActiveCategory = index => {
    setActiveCategory(index);
  };

  useEffect(() => {
    const categoriesInLocalStorage = JSON.parse(
      localStorage.getItem("categories")
    );

    const billsInLocalStorage = JSON.parse(localStorage.getItem("bills"));

    setCategories(categoriesInLocalStorage);
    setBills(billsInLocalStorage);

    if (!categoriesInLocalStorage) {
      setShouldShowAddCategory(true);
    }
  }, []);

  return (
    <div className="App">
      {shouldShowAddCategory ? (
        <AddCategory onSubmit={addCategory} />
      ) : shouldShowAddBill ? (
        <AddBill onSubmit={addBill} categories={categories} />
      ) : (
        <div>
          <NavBar
            categories={categories}
            showAddCategory={showAddCategory}
            activeCategory={activeCategory}
            setNewActiveCategory={setNewActiveCategory}
          />

          <div className="container flex">
            <div className="w-1/2">
              <BillsTable
                bills={bills}
                showAddBill={showAddBill}
                removeBill={removeBill}
              />
            </div>
            <div className="w-1/2">
              <Chart bills={activeBills} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
