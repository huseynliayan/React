import ServicesItem from "./servicesItem";

function Services() {
  let service1 = {
    name: "Item1",
    description: "Decription of Item1",
    price: 10,
    status: true,
  };
  let service2 = {
    name: "Item2",
    description: "Description of Item2",
    price: 20,
    status: true,
  };

  let service3 = {
    name: "Item3",
    description: "Description of Item3",
    price: 30,
    status: false,
  };
  let service4 = {
    name: "Item4",
    description: "Description of Item4",
    price: 40,
    status: true,
  };
  let service5 = {
    name: "Item5",
    description: "Description of Item5",
    price: 50,
    status: true,
  };
  let service6 = {
    name: "Item6",
    description: "Description of Item6",
    price: 60,
    status: false,
  };

  return (
    <>
      <h3>Services</h3>
      <ul>
        <ServicesItem
          headerName={service1.name}
          text={service1.description}
          price={service1.price}
          active={service1.status}
        />
        <ServicesItem
          headerName={service2.name}
          text={service2.description}
          price={service2.price}
          active={service2.status}
        />
        <ServicesItem
          headerName={service3.name}
          text={service3.description}
          price={service3.price}
          active={service3.status}
        />
        <ServicesItem
          headerName={service4.name}
          text={service4.description}
          price={service4.price}
          active={service4.status}
        />
        <ServicesItem
          headerName={service5.name}
          text={service5.description}
          price={service5.price}
          active={service5.status}
        />
        <ServicesItem
          headerName={service6.name}
          text={service6.description}
          price={service6.price}
          active={service6.status}
        />
      </ul>
    </>
  );
}
export default Services;
