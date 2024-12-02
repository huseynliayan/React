import { useState } from "react"
import styled from "styled-components"
import { goods } from "../assets/data/data"
import ProductItem from "./ProductItem"

function ProductList({searchValue}) {
    let [products, setProducts] =  useState(goods.map((item) => ({...item, open: false})))

    const productsArray = products.filter((item) => item.product_name.startsWith(searchValue))

    return (
      <PrudctSection>
        <ProductListUl>
            {productsArray.map((item) => <ProductItem key={item.id} products={products} setProducts={setProducts} product={item}/>)}
        </ProductListUl>
      </PrudctSection>
    )
  }
  
  export default ProductList

  const PrudctSection = styled.section`
  color:black;
  margin-top:40px;
  `

  const ProductListUl = styled.ul`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 20px 20px;
  padding: 30px;
  `
