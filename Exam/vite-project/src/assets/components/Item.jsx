import { useContext } from "react"
import { MyContext } from "../../App"

function Item({props}){

    return (
        <li>
         <p>{props.product_name}</p>
         <p>{props.product_description}</p>
         <p>{props.product_price}</p>
        <img src={props.url} alt={props.product_name} />
        </li>
    )
}

export default Item