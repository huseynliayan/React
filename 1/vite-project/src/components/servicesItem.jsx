function ServicesItem({headerName, text, price, active}) {
  return (
    <li>
      <h3>{headerName}</h3>
      <p>{text} </p>
      <p>{price} </p>
      <p>{active ? "In stock" : "Out of stock"} </p>
    </li>
  );
}

export default ServicesItem;
