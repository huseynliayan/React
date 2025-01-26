import styled from "styled-components";
import { useContext, useState } from "react";
import { MyContext } from "../../../App";
import TransactionAddForm from "./TransactionAddFrom";
import ExpensePieChart from "./ExpensePieChart";

function Transactions() {
  const { toggleTransactionAddForm, isFormVisible, transactions, categories } =
    useContext(MyContext);
  const [sortType, setSortType] = useState(null);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const currentMonthTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === currentMonth &&
      transactionDate.getFullYear() === currentYear
    );
  });

  const currentMonthIncome = currentMonthTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const currentMonthExpense = currentMonthTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const sortTransactions = (type) => {
    if (sortType === type) {
      setSortType(null);
    } else {
      setSortType(type);
    }
  };

  const filteredTransactions =
    sortType === "Income"
      ? transactions.filter((t) => t.amount > 0)
      : sortType === "Expense"
      ? transactions.filter((t) => t.amount < 0)
      : transactions;

  const groupedTransactions = filteredTransactions.reduce(
    (groups, transaction) => {
      const date = new Date(transaction.date);
      const monthYear = `${date.toLocaleString("default", {
        month: "long",
      })} ${date.getFullYear()}`;
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(transaction);
      return groups;
    },
    {}
  );
  const otherCategory = categories.find((cat) => cat.name === "Other");
  const IconRenderer = ({ category, otherCategory }) => {
    if (category?.icon) {
      return <category.icon />;
    }

    if (otherCategory?.icon) {
      return <otherCategory.icon />;
    }

    return <span>—</span>;
  };

  return (
    <TransactionContainer>
      <TopContainer>
        <BalanceContainer>
          <TotalBalanceContainer>
            <Stat>
              <h2>Total Balance</h2>
              <Amount>
                $
                {transactions
                  .reduce((acc, transaction) => acc + transaction.amount, 0)
                  .toFixed(2)}
              </Amount>
            </Stat>
          </TotalBalanceContainer>
          <IncomeOutcomeContainer>
            <Stat
              isActive={sortType === "Income"}
              onClick={() => sortTransactions("Income")}
            >
              <h2>Income</h2>
              <Amount>${currentMonthIncome.toFixed(2)}</Amount>
            </Stat>
            <Stat
              isActive={sortType === "Expense"}
              onClick={() => sortTransactions("Expense")}
            >
              <h2>Expenses</h2>
              <Amount>${Math.abs(currentMonthExpense).toFixed(2)}</Amount>
            </Stat>
          </IncomeOutcomeContainer>
        </BalanceContainer>
        <IncomeOutcomeContainer>
          <ExpensePieChart
            title="Income Breakdown"
            expenses={currentMonthTransactions.filter((t) => t.amount > 0)}
          />

          <ExpensePieChart
            title="Expense Breakdown"
            expenses={currentMonthTransactions.filter((t) => t.amount < 0)}
          />
        </IncomeOutcomeContainer>
      </TopContainer>
      <TransactionsHistory>
        <TransactionHistoryHeader>
          <h2>Transaction History</h2>
          <TransactionAddButton onClick={toggleTransactionAddForm}>
            Add Transaction
          </TransactionAddButton>
        </TransactionHistoryHeader>
        {Object.entries(groupedTransactions).map(
          ([monthYear, groupTransactions]) => {
            const sortedTransactions = groupTransactions.sort((a, b) => {
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateB - dateA;
            });

            const groupedByDay = sortedTransactions.reduce(
              (acc, transaction) => {
                const day = new Date(transaction.date).toLocaleDateString(
                  "default",
                  {
                    day: "numeric",
                    month: "long",
                  }
                );

                if (!acc[day]) {
                  acc[day] = [];
                }
                acc[day].push(transaction);
                return acc;
              },
              {}
            );

            return (
              <MonthSection key={monthYear}>
                <MonthHeader>{monthYear}</MonthHeader>
                {Object.entries(groupedByDay).map(
                  ([day, transactionsByDay]) => (
                    <DaySection key={day}>
                      <DayHeader>{day}</DayHeader>
                      <TransactionTable>
                        <tbody>
                          {transactionsByDay.map((transaction) => {
                            const category = categories.find(
                              (cat) => cat.name === transaction.category
                            );

                            return (
                              <tr key={transaction.id}>
                                <td
                                  style={{
                                    fontSize: "24px",
                                    textAlign: "center",
                                  }}
                                >
                                  <IconRenderer
                                    category={category}
                                    otherCategory={otherCategory}
                                  />
                                </td>

                                <td>{transaction.category}</td>
                                <td
                                  style={{
                                    color:
                                      transaction.amount < 0 ? "red" : "green",
                                  }}
                                >
                                  ${Math.abs(transaction.amount).toFixed(2)}
                                </td>
                                <td>{transaction.time || "00:00"}</td>
                                <td>{transaction.comment || "No comment"}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </TransactionTable>
                    </DaySection>
                  )
                )}
              </MonthSection>
            );
          }
        )}
      </TransactionsHistory>

      {isFormVisible && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={toggleTransactionAddForm}>×</CloseButton>
            <TransactionAddForm />
          </ModalContent>
        </Modal>
      )}
    </TransactionContainer>
  );
}

export default Transactions;

const TransactionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
`;

const TotalBalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 30px;
`;

const IncomeOutcomeContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
`;

const Stat = styled.div`
  flex: 1;
  background-color: ${(props) => (props.isActive ? "#679bff" : "white")};
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
`;

const Amount = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const TransactionsHistory = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 30px 80px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
`;

const TransactionHistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TransactionAddButton = styled.button`
  background-color: #679bff;
  color: white;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4a7ccf;
  }
`;

const MonthSection = styled.div`
  margin-bottom: 20px;
`;

const MonthHeader = styled.h4`
  font-size: 20px;
  margin-bottom: 10px;
  color: #679bff;
`;

const DaySection = styled.div`
  margin-bottom: 15px;
`;

const DayHeader = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #444;
  margin-bottom: 10px;
`;

const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 5px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    vertical-align: middle;
  }

  th {
    font-weight: bold;
    background-color: #f5f5f5;
    text-align: center;
  }

  td:nth-child(1) {
    width: 5%;
    text-align: center;
  }

  td:nth-child(2) {
    width: 15%;
    text-align: left;
  }

  td:nth-child(3) {
    width: 10%;
    text-align: left;
  }

  td:nth-child(4) {
    width: 10%;
    text-align: left;
  }

  td:nth-child(5) {
    width: 60%;
    text-align: left;
  }
  td {
    font-size: 16px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
