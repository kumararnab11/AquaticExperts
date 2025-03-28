import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SliderCard from './SliderCard';
import WaterTypeButtons from './WaterTypeButtons';
import CategorySection from './CategorySection';
import BestSellersSlider from './BestSeller';
import LifeAyuSlider from './LifeAyuSlider';
import Products from './Products';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { update } from '../redux/UserSlice';

function Home() {
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.user);
    const API_BASE_URL = "http://localhost:4000/api/v1";

    useEffect(() => {
        const fetchUser = async () => {
            //console.log("Fetching user...");  // ✅ Check if this logs
            try {
                const response = await axios.get(`${API_BASE_URL}/dashboard`, { withCredentials: true });
                //console.log("API Response:", response.data);  // ✅ Check API response
                dispatch(update(response.data.fetchedUser));  
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    

    // useEffect(() => {
    //     console.log("Updated user:", user);
    // }, [user]); 

    return (
        <div className='max-w-screen'>
            <Navbar user={user} />
            <SliderCard />
            {/* <WaterTypeButtons /> */}
            <CategorySection />
            <BestSellersSlider />
            <LifeAyuSlider />
            <Products user={user}/>
        </div>
    );
}

export default Home;
