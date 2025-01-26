import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import categories from "../../data/categories";
import AddCategoryForm from "./AddCategoryForm";
import { MyContext } from "../../../App";

function Categories() {
  const { transactions } = useContext(MyContext);
  const [categoriesData, setCategories] = useState(categories);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedCustomCategories = localStorage.getItem("customCategories");
    if (savedCustomCategories) {
      const customCategories = JSON.parse(savedCustomCategories);
      setCategories([...categories, ...customCategories]);
    }
  }, []);

  useEffect(() => {
    const customCategories = categoriesData.filter(
      (cat) => !categories.some((predefined) => predefined.name === cat.name)
    );
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
  }, [categoriesData]);

  const getFilteredTransactions = (transactions, category) =>
    category
      ? transactions.filter((transaction) => transaction.category === category)
      : [];

  const filteredTransactions = getFilteredTransactions(transactions,selectedCategory);

  const groupedTransactions = filteredTransactions.reduce(
    (acc, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
      const day = `${date.toLocaleString("default", { day: "numeric" })}`;
      if (!acc[monthYear]) acc[monthYear] = {};
      if (!acc[monthYear][day]) acc[monthYear][day] = [];
      acc[monthYear][day].push(transaction);
      return acc;
    },
    {}
  );

  const handleAddCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  return (
    <>
      <h2 style={{ paddingLeft: "20px" }}>Categories</h2>
      <CategoryContainer>
        <CategoryGrid>
          {categoriesData.map((category) => (
            <CategoryCard
              key={category.name}
              onClick={() => {
                if (category.name === "More") {
                  setIsModalOpen(true);
                } else {
                  setSelectedCategory(category.name);
                }
              }}
              isActive={selectedCategory === category.name}
            >
              <Icon>
                {category.icon ? (
                  typeof category.icon === "string" ? (
                    <img
                      src={category.icon}
                      alt={category.name}
                      style={{ width: "30px", height: "30px" }}
                    />
                  ) : (
                    <category.icon style={{ fontSize: "30px" }} />
                  )
                ) : (
                  "+"
                )}
              </Icon>
              <Name>{category.name}</Name>
            </CategoryCard>
          ))}
        </CategoryGrid>

        {selectedCategory && (
          <CategoriesTransaction>
            <CategoriesTransactionHeader>
              <CategoryTag>{selectedCategory}</CategoryTag>
              <Left>
                <CategoryTotalExpenseTag>
                  Total Expense: $
                  {filteredTransactions
                    .filter((t) => {
                      const transactionYear = new Date(t.date).getFullYear();
                      const currentYear = new Date().getFullYear();
                      return t.amount < 0 && transactionYear === currentYear;
                    })
                    .reduce(
                      (acc, transaction) => acc + Math.abs(transaction.amount),
                      0
                    )
                    .toFixed(2)}
                </CategoryTotalExpenseTag>

                <CategoryTotalIncomeTag>
                  Total Income: $
                  {filteredTransactions
                    .filter((t) => {
                      const transactionYear = new Date(t.date).getFullYear();
                      const currentYear = new Date().getFullYear();
                      return t.amount > 0 && transactionYear === currentYear;
                    })
                    .reduce(
                      (acc, transaction) => acc + Math.abs(transaction.amount),
                      0
                    )
                    .toFixed(2)}
                </CategoryTotalIncomeTag>
              </Left>
            </CategoriesTransactionHeader>
            <TransactionList>
              {Object.entries(groupedTransactions).map(([monthYear, days]) => (
                <MonthSection key={monthYear}>
                  <MonthHeader>{monthYear}</MonthHeader>
                  {Object.entries(days).map(([day, dayTransactions]) => (
                    <DaySection key={day}>
                      <DayHeader>{`${day} ${
                        monthYear.split(" ")[0]
                      }`}</DayHeader>
                      {dayTransactions.map((transaction) => (
                        <TransactionItem key={transaction.id}>
                          <TransactionDetails>
                            <Icon>
                              {categoriesData.find(
                                (cat) => cat.name === transaction.category
                              )?.icon &&
                                (typeof categoriesData.find(
                                  (cat) => cat.name === transaction.category
                                ).icon === "string" ? (
                                  <img
                                    src={
                                      categoriesData.find(
                                        (cat) =>
                                          cat.name === transaction.category
                                      ).icon
                                    }
                                    alt={transaction.category}
                                    style={{ width: "30px", height: "30px" }}
                                  />
                                ) : (
                                  React.createElement(
                                    categoriesData.find(
                                      (cat) => cat.name === transaction.category
                                    ).icon,
                                    { style: { fontSize: "30px" } }
                                  )
                                ))}
                            </Icon>
                            <Left>
                              <Comment>
                                {transaction.comment || "No comment"}
                              </Comment>
                              <DateTime>{transaction.time || "00:00"}</DateTime>
                            </Left>
                          </TransactionDetails>
                          <Amount amount={transaction.amount}>
                            ${Math.abs(transaction.amount).toFixed(2)}
                          </Amount>
                        </TransactionItem>
                      ))}
                    </DaySection>
                  ))}
                </MonthSection>
              ))}
            </TransactionList>
          </CategoriesTransaction>
        )}
      </CategoryContainer>

      {isModalOpen && (
        <AddCategoryForm
          onClose={() => setIsModalOpen(false)}
          onAddCategory={handleAddCategory}
        />
      )}
    </>
  );
}

export default Categories;

const CategoryContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 80px;
`;
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 120px);
  gap: 20px;
  justify-content: left;
  align-items: stretch;
  flex-shrink: 0;
`;
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isActive ? "#f0f0f0" : "white")};
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
  font-size: 30px;
`;
const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;
const CategoriesTransaction = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
`;
const CategoriesTransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;
const CategoryTag = styled.div`
  font-size: 25px;
  font-weight: bold;
`;
const CategoryTotalExpenseTag = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: red;
`;
const CategoryTotalIncomeTag = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: green;
`;
const TransactionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const MonthSection = styled.div`
  margin-bottom: 20px;
`;
const MonthHeader = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #444;
  margin-bottom: 10px;
`;
const DaySection = styled.div`
  margin-bottom: 15px;
`;
const DayHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #555;
  margin-bottom: 10px;
`;
const TransactionItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 10px 20px;
`;
const TransactionDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
`;
const Comment = styled.div`
  font-size: 18px;
  color: #666;
`;
const DateTime = styled.div`
  font-size: 16px;
  color: #888;
`;
const Amount = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.amount < 0 ? "red" : "green")};
`;
