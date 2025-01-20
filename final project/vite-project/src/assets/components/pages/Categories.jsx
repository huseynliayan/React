import styled from "styled-components";
import { IoFastFoodOutline, IoTicketOutline } from "react-icons/io5";
import {
  MdEmojiTransportation,
  MdOutlineLocalGroceryStore,
} from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { FaHome, FaCoins } from "react-icons/fa";
import { AiOutlineGift } from "react-icons/ai";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiPlus } from "react-icons/fi";

const categories = [
  {
    name: "Food",
    icon: IoFastFoodOutline,
  },
  {
    name: "Transport",
    icon: MdEmojiTransportation,
  },
  {
    name: "Medicine",
    icon: GiMedicines,
  },
  {
    name: "Groceries",
    icon: MdOutlineLocalGroceryStore,
  },
  {
    name: "Rent",
    icon: FaHome,
  },
  {
    name: "Gift",
    icon: AiOutlineGift,
  },
  {
    name: "Savings",
    icon: FaCoins,
  },
  {
    name: "Entertainment",
    icon: IoTicketOutline,
  },
  {
    name: "Other",
    icon: HiDotsHorizontal,
  },
  {
    name: "More",
    icon: FiPlus,
  },
];

function Categories() {
  return (
    <CategoryContainer>
        <h2>Categories</h2>
      <CategoryGrid>
        {categories.map((category) => (
          <CategoryCard key={category.name} >
            <Icon>
              <category.icon />
            </Icon>
            <Name>{category.name}</Name>
          </CategoryCard>
        ))}
      </CategoryGrid>
    </CategoryContainer>
  );
}

export default Categories;

const CategoryContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 20px;
  width: 100%;
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const Icon = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
