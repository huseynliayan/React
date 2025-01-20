import { createContext, useState } from "react";
import "./App.css";
import Footer from "./assets/components/Footer";
import Header from "./assets/components/Header";
import MainComponent from "./assets/components/MainComponent";
import { Route, Routes } from "react-router-dom";

export const MyContext = createContext()

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  return (
    <MyContext.Provider value={{isSidebarOpen, toggleSidebar}}>
      <Header />
      <MainComponent />
      <Footer />
    </MyContext.Provider>
  );
}

export default App;
