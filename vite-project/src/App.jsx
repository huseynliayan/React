import { createContext, useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import MainComponent from "./components/MainComponent";
import Footer from "./components/Footer";
import categories from "./components/data/categories";

export const MyContext = createContext();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false);
  
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : []
  });

  useEffect(() =>{
    localStorage.setItem("transactions", JSON.stringify(transactions));
  },[transactions]);

  const toggleTransactionAddForm = () => {
    setFormVisible((prev) => !prev);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [...prev, newTransaction]);
  };

  
  return (
    <MyContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isFormVisible,
        toggleTransactionAddForm,
        transactions,
        addTransaction,
        categories
      }}
    >
      <Header />
      <MainComponent />
      <Footer />
    </MyContext.Provider>
  );
}

export default App;
