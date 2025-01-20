import styled from "styled-components";
import transactions from "./data/transactions";

function Transactions() {
  const sortedTransactions = transactions
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map((transaction, index) => ({
      ...transaction,
      id: index + 1,
    }));

    
  return (
    <TransactionContainer>
      <BalanceContainer>
        <Stat>
          <h2>Total Balance</h2>
          <Amount>ф</Amount>
        </Stat>
        <IncomeOutcomeContainer>
          <Stat>
            <h2>Income</h2>
            <Amount>a</Amount>
          </Stat>
          <Stat>
            <h2>Expenses</h2>
            <Amount>a</Amount>
          </Stat>
        </IncomeOutcomeContainer>
      </BalanceContainer>
      <TransactionsHistory>
        <h3>Transaction History</h3>
        <TransactionTable>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.category}</td>
                <td>{transaction.id}</td>
                <td style={{ color: transaction.amount < 0 ? "red" : "green" }}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </TransactionTable>
      </TransactionsHistory>
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

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 30px;
`;

const IncomeOutcomeContainer = styled.div`
  display: flex;
  //flex-direction: row;
  gap: 20px;
  width: 100%;
`;

const Stat = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 16px;
    margin-bottom: 5px;
  }
`;

const Amount = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
`;

const TransactionsHistory = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  h3 {
    margin-bottom: 20px;
  }
`;

const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    font-weight: bold;
    background-color: #f5f5f5;
  }

  td {
    font-size: 14px;
  }
`;
