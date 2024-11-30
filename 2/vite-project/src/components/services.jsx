import { useState } from "react";
import ServicesItem from "./servicesItem";

function Services() {
  let [myArray, setMyArray] = useState([
    ["Смартфон", 24999, "Электроника"],
    ["Ноутбук", 79999, "Электроника"],
    ["Наушники", 2999, "Аудиотехника"],
    ["Кофемашина", 15999, "Бытовая техника"],
    ["Телевизор", 44999, "Электроника"],
    ["Микроволновка", 7999, "Бытовая техника"],
    ["Холодильник", 32999, "Бытовая техника"],
    ["Чайник", 1999, "Бытовая техника"],
    ["Игровая консоль", 35999, "Электроника"],
    ["Смарт-часы", 12999, "Электроника"],
  ]);

  const addItem = () => {
    let promptItemName = prompt("Add item name");
    let promptItemPrice = prompt("Add item price");
    let promptItemSort = prompt("Add item sort");
    setMyArray([...myArray, [promptItemName, promptItemPrice, promptItemSort]]);
  };

  const deleteItem = () => {
    let promptName = prompt("Add something");
    let newArr = [...myArray];
    let findedInfo = newArr.findIndex((item) => item[0] == promptName);
    if (findedInfo !== -1) {
      newArr.splice(findedInfo, 1);
      setMyArray(newArr);
      alert(`${promptName} has been deleted.`);
    } else {
      alert("Item not found.");
    }
  };

  const sortByPriceAsc = () => {
    setMyArray([...myArray].sort((a, b) => a[1] - b[1]));
  };

  const sortByPriceDesc = () => {
    setMyArray([...myArray].sort((a, b) => b[1] - a[1]));
  };

  const filterByPriceRange = () => {
    let minPrice = parseInt(prompt("Enter minimum price"), 10);
    let maxPrice = parseInt(prompt("Enter maximum price"), 10);
    setMyArray(
      myArray.filter((item) => item[1] >= minPrice && item[1] <= maxPrice)
    );
  };

  const filterByCategory = () => {
    let category = prompt("Enter category to filter by");
    setMyArray(myArray.filter((item) => item[2] === category));
  };

  return (
    <>
      <h3>Services</h3>
      <button onClick={addItem}>Add</button>
      <button onClick={deleteItem}>Delete</button>
      <button onClick={sortByPriceAsc}> Sort by price (ascending) </button>
      <button onClick={sortByPriceDesc}> Sort by price (descending) </button>
      <button onClick={filterByPriceRange}>Filter by price range</button>
      <button onClick={filterByCategory}>Filter by category</button>
      <ul>
        {myArray.map((item, index) => (
          <ServicesItem
            key={index}
            headerName={item[0]}
            text={`Category: ${item[2]}`}
            price={`Price: ${item[1]} ₽`}
          />
        ))}
      </ul>
    </>
  );
}
export default Services;
