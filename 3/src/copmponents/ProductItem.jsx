import { useState } from "react";
import styled from "styled-components";

function ProductItem({product, setProducts, products }) {
  
  let [productName, setProductName] = useState('')
  let [productDescription, setProductDescription] = useState('')
  let [productPrice, setProductPrice] = useState('')

  const showForm = () => {
    let newArr = products.map((item) => {
      if (item.id === product.id) {
        return ({...product, open: !product.open})
      } else {
        return ({...item, open: false})
      }
    });

    setProducts(newArr)

    setProductName(product.product_name)
    setProductDescription(product.product_description)
    setProductPrice(product.product_price)
  };

  const changeData = (ev) => {
    ev.preventDefault()

    let formData = Object.fromEntries([...new FormData(ev.target)])

    let newArr = [...products]
    let elementIndex = newArr.findIndex((item) => item.id === product.id)
    newArr[elementIndex].product_name = formData.product_name
    newArr[elementIndex].product_description = formData.product_description
    newArr[elementIndex].product_price = formData.product_price

    setProducts(newArr)
  };

  const deleteData = () =>{
    let newArr = products.filter((item) => item.id !== product.id)
    setProducts(newArr);
  }
  
  return (
    <ProductItemTag>
      <Name>{product.product_name}</Name>
      <Description>{product.product_description}</Description>
      <Price>{product.product_price}</Price>
      <Image src={product.url} alt={product.product_name} />
      <RedactButton onClick={showForm}>REDACT</RedactButton>
      {product.open && (
        <RedactForm onSubmit={changeData}>
          <InputName type="text" placeholder="InputName" name="product_name" defaultValue={productName}/>
          <InputDescription type="text" placeholder="InputDescription"name="product_description" defaultValue={productDescription}/>
          <InputPrice type="number" placeholder="InputPrice" name="product_price" defaultValue={productPrice} />
          <FormButton>CHANGE</FormButton>
        </RedactForm>
      )}
      <DeleteButton onClick={deleteData}>Delete</DeleteButton>
    </ProductItemTag>
  );
}

export default ProductItem;

const ProductItemTag = styled.li`
  border-radius: 10px;
  padding: 5px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Name = styled.p``;

const Description = styled.p``;

const Price = styled.p``;

const Image = styled.img``;

const RedactButton = styled.button``;

const RedactForm = styled.form``;

const InputName = styled.input``;

const InputDescription = styled.input``;

const InputPrice = styled.input``;

const FormButton = styled.button``;

const DeleteButton = styled.button``;
