import { useContext } from "react";
import { MyContext } from "../../App";
import styled from "styled-components";

function Search() {
    let {setSearchValue} = useContext(MyContext)
    
  return (
    <SearchSection>
      <SearchHeader>Search</SearchHeader>
      <SearchInput type="text" onInput={(ev) => {setSearchValue(ev.target.value)} } placeholder="Search by name" />
    </SearchSection>
  );
}

export default Search;

const SearchSection = styled.section`
  color: black;
  margin-top: 40px;
`;

const SearchHeader = styled.h2`
  font-size: 30px;
  font-weight: 900;
  text-align: center;
`;

const SearchInput = styled.input`
  font-size: 30px;
  font-weight: 900;
  text-align: center;
  margin: auto;
  display: block;
  margin-top: 20px;
`;
