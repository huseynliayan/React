import { createContext, useReducer, useState } from 'react'
import { goods } from './assets/data/data'
import './App.css'
import Header from './assets/components/Header'
import MainComponent from './assets/components/MainComponent'
import Footer from './assets/components/Footer'

export const MyContext = createContext()
function App() {
 let [products, dispatchProducts] = useReducer(productsReducer, initialObjectProducts)
 let [searchValue,dispatchSearchValue] = useReducer(productsReducer, initialObjectProducts)
  return (
    <MyContext.Provider value={{products, setProducts, goods, searchValue,setSearchValue}}>
      <Header/>
      <MainComponent/>
      <Footer/>
    </MyContext.Provider>
  )
}

export default App
