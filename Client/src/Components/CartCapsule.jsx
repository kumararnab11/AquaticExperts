import React from 'react'
import Navbar from './Navbar'
import Cart from './Cart'
import { useSelector ,useDispatch} from 'react-redux'

function CartCapsule() {
    const user = useSelector((state)=>state.user)
    const cart = user?user.cart:[];
  return (
    <div>
        <Navbar user={user}/>
        <Cart cartItems={cart}/>
    </div>
  )
}

export default CartCapsule