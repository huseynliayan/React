import styled from "styled-components";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { useContext } from "react";
import { MyContext } from "../../App";

function Header() {
  const {toggleSidebar} = useContext(MyContext)
  return (
    <HeaderTag>
      <LeftSection>
        <MenuIcon onClick={toggleSidebar}>
          <FaBars />
        </MenuIcon>
        <Logo>
          <img src="/photos/logo.png" alt="Logo" />
        </Logo>
      </LeftSection>
      <RightSection>
        <LanguageSelector>
          <select>
            <option value="en">EN</option>
            <option value="ru">RU</option>
            <option value="az">AZ</option>
          </select>
        </LanguageSelector>
        <NotificationIcon>
          <IoNotifications />
        </NotificationIcon>
        <LogoutIcon>
          <FaSignOutAlt />
        </LogoutIcon>
      </RightSection>
    </HeaderTag>
  );
}

export default Header;

const HeaderTag = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  width: 100%;
  background-color: f6f6f6;
  color: #7a7f9a;
  padding: 0 20px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const MenuIcon = styled.div`
  font-size: 30px;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: #679bff;
  }
`;

const Logo = styled.div`
  img {
    height: 60px;
    width: auto;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const LanguageSelector = styled.div`
  select {
    padding: 5px;
    border: none;
    border-radius: 4px;
    background: white;
    color: #7a7f9a;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background: #f0f0f0;
    }
  }
`;

const LogoutIcon = styled.div`
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #679bff;
  }
`;
const NotificationIcon = styled.div`
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: #679bff;
  }
`;
