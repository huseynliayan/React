import styled from "styled-components";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Categories from "./pages/Categories";
import Budget from "./pages/Budget";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import { useContext } from "react";
import { MyContext } from "../../App";



function MainComponent() {
 const {isSidebarOpen} = useContext(MyContext)
  return (
    <MainComponentTag>
      {isSidebarOpen && <Sidebar />}
      <PageContainer isSidebarOpen={isSidebarOpen}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </PageContainer>
    </MainComponentTag>
  );
}

export default MainComponent;

const MainComponentTag = styled.main`
  background-color: #eaeaea;
  display: flex;
  height: 100%;
`;
const PageContainer = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #eaeaea;
  transition: margin-left 0.3s ease;
  //margin-left: ${(props) => (props.isSidebarOpen ? "15vw" : "0")};
  overflow-y: auto;
`;