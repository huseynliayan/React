import styled from "styled-components";
import Search from "./Search";
import ProductList from "./ProductList";
import { useState } from "react";

function Main() {
  let [searchValue, setSearchValue] = useState('')

  return (
    <MainTag>
      <Search setSearchValue={setSearchValue} />
      здесь будет форма добавления нового товара в массив в компоненте
      <ProductList searchValue={searchValue}/>
    </MainTag>
  );
}

export default Main;

const MainTag = styled.main`
  margin-bottom: auto;
`;
