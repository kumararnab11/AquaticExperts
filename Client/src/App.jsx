import './App.css'
import {createBrowserRouter,RouterProvider } from "react-router-dom"
import { useSelector } from 'react-redux'
import Login from '../src/Components/Login'
import Register from '../src/Components/Register'
import Navbar from '../src/Components/Navbar'
import ContactUs from './Components/ContactUs'
import Filter from './Components/Filter/Filter'
import FishFood from './Components/FishFood/FishFood'
import ProductCardExtended from './Components/ProductCardExtended'
import Soil from './Components/Soil/Soil'
import Light from './Components/Lights/Light'
import Orders from './Orders'
import Addresses from './Components/Addresses'
import SearchedItems from './Components/SearchedItems'
import AboutUs from './Components/About'
import Blogs from './Components/Blogs'
import Accessories from './Components/Accessories/Accessories'
import SubCategory from './Components/SubCategory'
import NotFound from './Components/NotFound'
import Home from './Components/Home'
import CartCapsule from './Components/CartCapsule'
import NewProduct from './Admin/NewProduct'
import UpdateProduct from './Admin/UpdateProduct'
import AddressSelection from './Components/AddressSelection'
import Payment from '../src/Components/Payment'
import ForgotPassword from './ForgotPasword'
import AdminNav from './Admin/AdminNav'
import AllProducts from './Admin/AllProducts'

function App() {
  const user = useSelector((state)=>state.user);

  const router=createBrowserRouter(
    [ 
      {
        path:'/qtteuuiwoeyguq3y784wjhfsl9-jhkh/admin',
        element:<div className='bg-gray-200'>
          <AdminNav/>
          <NewProduct/>
        </div>
      },
      {
        path:'/qtteuuiwoeyguq3y784wjhfsl9-jhkh/admin/updateproduct',
        element:<div className='bg-gray-200'>
          <AdminNav/>
          <AllProducts/>
        </div>
      },
      {
        path:'/qtteuuiwoeyguq3y784wjhfsl9-jhkh/admin/updateproduct/:productId',
        element:<div className='bg-gray-200'>
          <UpdateProduct/>
        </div>
      },
      {
        path:'/',
        element:<div className='bg-[#c9c5c3]'>
        <Home/>
        </div>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/forgotpassword',
        element:<ForgotPassword/>
      },
      {
        path:'/:pid',
        element:<div>
          <Navbar/>
          <SearchedItems/>
        </div>
      },
      {
        path:'/fishfoods/:subcat',
        element:<div>
          <Navbar user={user}/>
          <SubCategory cat="fishfoods" />
        </div>
      },
      {
        path:'/filter/:subcat',
        element:<div>
          <Navbar/>
          <SubCategory cat="filter" />
        </div>
      },
      {
        path:'/soil/:subcat',
        element:<div>
          <Navbar/>
          <SubCategory cat="soil" />
        </div>
      },
      {
        path:'/light/:subcat',
        element:<div>
          <Navbar/>
          <SubCategory cat="lights" />
        </div>
      },
      {
        path:'/tools/:subcat',
        element:<div>
          <Navbar/>
          <SubCategory cat="tools" />
        </div>
      },
      {
        path:'/contact',
        element:<div>
          <Navbar user={user} />
          <ContactUs/>
        </div>
      },
      {
        path:'/about',
        element:<div>
          <Navbar user={user}/>
          <AboutUs/>
        </div>
      },
      {
        path:'/blogs',
        element:<div>
          <Navbar user={user}/>
          <Blogs/>
        </div>
      },
      {
        path:'/cart',
        element:<div className='bg-gray-200 min-h-screen'>
          <CartCapsule/>
        </div>
      },
      {
        path:'/tools',
        element:<div className='bg-gray-200 min-h-screen'>
          <Accessories/>
        </div>
      },
      {
        path:'/filter',
        element:<div className='bg-gray-200 min-h-screen'>
          <Filter/>
        </div>
      },
      {
        path:'/light',
        element:<div className='bg-gray-200 min-h-screen'>
          <Light/>
        </div>
      },
      {
        path:'/fishfoods',
        element:<div className='bg-gray-200 min-h-screen'>
          <FishFood/>
        </div>
      },
      {
        path:'/soil',
        element:<div className='bg-gray-200 min-h-screen'>
          <Soil/>
        </div>
      },
      {
        path:'/profile/orders',
        element:<Orders/>
      },
      {
        path:'/profile/addresses',
        element:<Addresses/>
      },
      {
        path:'/product/:pid',
        element:<ProductCardExtended/>
      },
      {
        path:'*',
        element: <NotFound/>
      },
      {
        path:'checkout/address',
        element:<AddressSelection/>
      },
      {
        path:"payment",
        element:<Payment/>
      }
    ]
  )

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App