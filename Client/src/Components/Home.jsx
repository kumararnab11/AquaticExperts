import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SliderCard from './SliderCard';
import WaterTypeButtons from './WaterTypeButtons';
import CategorySection from './CategorySection';
import BestSellersSlider from './BestSeller';
import LifeAyuSlider from './LifeAyuSlider';
import Products from './Products';
import axios from 'axios';

function Home() {
    const [user, setUser] = useState(null);
    const API_BASE_URL = "http://localhost:4500/api/v1";

    useEffect(() => {
        const fetchUser = async () => {
            console.log("Fetching user...");  // ✅ Check if this logs
            try {
                const response = await axios.get(`${API_BASE_URL}/dashboard`, { withCredentials: true });
                console.log("API Response:", response.data);  // ✅ Check API response
                setUser(response.data.fetchedUser);  
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };
        fetchUser();
    }, []);
    

    useEffect(() => {
        console.log("Updated user:", user);
    }, [user]); // ✅ Logs when user state updates

    return (
        <div>
            <Navbar user={user} />
            <SliderCard />
            <WaterTypeButtons />
            <CategorySection />
            <BestSellersSlider />
            <LifeAyuSlider />
            <Products />
        </div>
    );
}

export default Home;
