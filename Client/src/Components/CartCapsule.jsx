import React from 'react'
import Navbar from './Navbar'
import Cart from './Cart'
import { useSelector} from 'react-redux'

function CartCapsule() {
    const user = useSelector((state)=>state.user)
    console.log(user);
    const cart = user?user.cart:[];
    console.log("I am refreshed");
  return (
    <div>
        <Navbar user={user}/>
        <Cart cartItems={cart}/>
    </div>
  )
}

export default CartCapsule