import { useState } from "react";
import styled from "styled-components";

function AddCategoryForm({ onClose, onAddCategory }) {
  const [categoryName, setCategoryName] = useState("");
  const [iconFile, setIconFile] = useState(null);

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setIconFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    if (categoryName.trim()) {
      onAddCategory({
        name: categoryName,
        icon: iconFile,
      });
      onClose();
    }
  };

  return (
    <Modal>
      <ModalContent>
        <h2>Add New Category</h2>
        <Input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <FileInput>
          <label htmlFor="icon-upload">Upload Icon</label>
          <input id="icon-upload" type="file" onChange={handleIconUpload} />
        </FileInput>
        {iconFile && <Preview src={iconFile} alt="Icon Preview" />}
        <Buttons>
          <Button onClick={handleAddCategory}>Add Category</Button>
          <Button onClick={onClose} cancel>
            Cancel
          </Button>
        </Buttons>
      </ModalContent>
    </Modal>
  );
}

export default AddCategoryForm;

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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FileInput = styled.div`
  margin-bottom: 20px;

  input {
    display: none;
  }

  label {
    cursor: pointer;
    padding: 10px 20px;
    background-color: #679bff;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #4a7ccf;
    }
  }
`;

const Preview = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 5px;
  object-fit: cover;
`;

const Buttons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.cancel ? "#ccc" : "#679bff")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.cancel ? "#aaa" : "#4a7ccf")};
  }
`;
