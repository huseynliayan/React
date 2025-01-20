import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdOutlineAccountCircle,
  MdOutlinePlaylistAddCheckCircle,
} from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoWalletOutline, IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
function Sidebar() {
  return (
    <SidebarContainer>
      <hr />
      <Info>
        <MdOutlineAccountCircle />
        <span>Ayan Huseynli</span>
      </Info>
      <hr />
      <Nav>
        <ul>
          <MenuItem>
            <NavLink to="/" activeClassName="active">
              <MdDashboard />
              <span>Dashboard</span>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/transactions" activeClassName="active">
              <GrTransaction />
              <span>Transactions</span>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/categories" activeClassName="active">
              <MdOutlinePlaylistAddCheckCircle />
              <span>Categories</span>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/budget" activeClassName="active">
              <IoWalletOutline />
              <span>Budget</span>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/settings" activeClassName="active">
              <IoSettingsOutline />
              <span>Settings</span>
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink to="/help" activeClassName="active">
              <IoMdHelpCircleOutline />
              <span>Help</span>
            </NavLink>
          </MenuItem>
        </ul>
      </Nav>
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.aside`
  position: relative;
  top: 0;
  left: 0;
  width: 15vw;
 // height: 80vh;
  background: #f6f6f6;
  color: white;
  display: flex;
  flex-direction: column;
  //padding: 20px;
  box-sizing: border-box;
  hr {
    height: 2px;
    border: none;
    background-color: #e3e3e3;
    // margin-bottom: 20px;
  }
`;
const Info = styled.div`
  padding: 10px 20px;
  margin: 20px 0;
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    color: rgba(29, 24, 24, 0.698);
    font-size: 20px;
    font-weight: 800;
  }
  svg {
    font-size: 30px;
    color: #7a7f9a;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
  }
`;

const MenuItem = styled.li`
  padding: 5px;
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    font-size: 20px;
    font-weight: 500;
    color: #7a7f9a;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease;

    &.active {
      background-color: #e7f1ff;
      color: #679bff;
    }

    &:hover {
      background-color: #e7f1ff;
      color: #679bff;
    }

    span {
      flex: 1;
    }

    svg {
      font-size: 30px;
    }
  }
`;
