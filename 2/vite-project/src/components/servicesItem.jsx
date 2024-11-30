function ServicesItem({ headerName, text, price, active }) {
  return (
    <li>
      <p>{headerName}</p>
      <p>{price}</p>
      <p>{text}</p>
    </li>
  );
}

export default ServicesItem;
