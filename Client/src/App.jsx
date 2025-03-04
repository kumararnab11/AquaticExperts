import './App.css'
import {createBrowserRouter,RouterProvider } from "react-router-dom"
import Login from '../src/Components/Login'
import Register from '../src/Components/Register'
import Navbar from '../src/Components/Navbar'
import SliderCard from '../src/Components/SliderCard'
import CategorySection from '../src/Components/CategorySection'
import BestSellersSlider from './Components/BestSeller'
import Products from './Components/Products'
import ContactUs from './Components/ContactUs'
import LifeAyuSlider from './Components/LifeAyuSlider'
import Cart from './Components/Cart'
import Filter from './Components/Filter/Filter'
import FishFood from './Components/FishFood/FishFood'
import ProductCardExtended from './Components/ProductCardExtended'
import Soil from './Components/Soil/Soil'
import Light from './Components/Lights/Light'
import WaterTypeButtons from './Components/WaterTypeButtons'
import Orders from './Orders'
import Addresses from './Components/Addresses'
import SearchedItems from './Components/SearchedItems'
import AboutUs from './Components/about'
import Blogs from './Components/Blogs'
import Accessories from './Components/Accessories/Accessories'
import SubCategory from './Components/SubCategory'
import NotFound from './Components/NotFound'

function App() {

  const router=createBrowserRouter(
    [
      {
        path:'/',
        element:<div className='bg-[#dbcfc9]'>
        <Navbar/>
        <SliderCard/>
        <WaterTypeButtons/>
        <CategorySection/>
        <BestSellersSlider/>
        <LifeAyuSlider/>
        <Products/>
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
        path:'/:pid',
        element:<div>
          <Navbar/>
          <SearchedItems/>
        </div>
      },
      {
        path:'/fishfoods/:subcat',
        element:<div>
          <Navbar/>
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
          <Navbar/>
          <ContactUs/>
        </div>
      },
      {
        path:'/about',
        element:<div>
          <Navbar/>
          <AboutUs/>
        </div>
      },
      {
        path:'/blogs',
        element:<div>
          <Navbar/>
          <Blogs/>
        </div>
      },
      {
        path:'/cart',
        element:<div className='bg-[#dbcfc9] min-h-screen'>
          <Navbar/>
          <Cart/>
        </div>
      },
      {
        path:'/tools',
        element:<div className='bg-[#dbcfc9] min-h-screen'>
          <Accessories/>
        </div>
      },
      {
        path:'/filter',
        element:<div className='bg-[#dbcfc9] min-h-screen'>
          <Filter/>
        </div>
      },
      {
        path:'/light',
        element:<div className='bg-[#dbcfc9] min-h-screen'>
          <Light/>
        </div>
      },
      {
        path:'/fishfoods',
        element:<div className='bg-[#dbcfc9] min-h-screen'>
          <FishFood/>
        </div>
      },
      {
        path:'/soil',
        element:<div className='bg-[#dbcfc9] min-h-screen'>
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
        path:'/p',
        element:<ProductCardExtended
        id="123"
        images={[
          "https://via.placeholder.com/150",
          "https://via.placeholder.com/150/0000FF",
          "https://via.placeholder.com/150/FF0000"
        ]}
        name="Premium Fish Food"
        price="499"
        description="High-quality fish food for better growth and color enhancement."
      />
      },
      {
        path:'*',
        element: <NotFound/>
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
