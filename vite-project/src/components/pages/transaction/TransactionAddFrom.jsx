import { useContext, useState } from "react";
import styled from "styled-components";
import { MyContext } from "../../../App";

function TransactionAddFrom() {
  const { addTransaction, categories, toggleTransactionAddForm } = useContext(MyContext);

  const [formData, setFormdata] = useState({
    date: "",
    category: categories.length > 0 ? categories[0].name : "", 
    amount: "",
    comment: "",
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const newTransaction = {
      id: Date.now(),
      date: formData.date,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }),
      category: formData.category,
      type: formData.amount > 0 ? "Income" : "Expense",
      amount: parseFloat(formData.amount),
      comment: formData.comment,
    };

    addTransaction(newTransaction);
    toggleTransactionAddForm(); 
  };

  return (
    <FormContainer>
      <CloseButton onClick={toggleTransactionAddForm}>×</CloseButton>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </FormGroup>
        <FormGroup>
          <label>Amount</label>
          <input
            type="number"
            placeholder="$0.00"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <label>Enter Comment</label>
          <textarea
            name="comment"
            placeholder="Enter Comment"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </FormGroup>
        <Buttons>
          <SaveButton type="submit">Save</SaveButton>
          <CancelButton type="button" onClick={toggleTransactionAddForm}>
            Cancel
          </CancelButton>
        </Buttons>
      </form>
    </FormContainer>
  );
}

export default TransactionAddFrom;


const FormContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  input,
  select,
  textarea {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  textarea {
    resize: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const SaveButton = styled.button`
  background-color: #679bff;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4a7ccf;
  }
`;

const CancelButton = styled.button`
  background-color: #ccc;
  color: black;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #aaa;
  }
`;
