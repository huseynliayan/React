import { useContext, useState } from "react";
import { goods } from "../data/data";
import Item from "./Item";
import { MyContext } from "../../App";

function ShowData() {
  let { products,searchValue } = useContext(MyContext);

  const productsArray = products.filter((item) => item.product_name.toLowerCase().startsWith(searchValue.toLowerCase()))
  return (
    <>
      <ul>
        {productsArray.map((item) => (
          <Item key={item.id} props={item} />
        ))}
      </ul>
    </>
  );
}

export default ShowData;
