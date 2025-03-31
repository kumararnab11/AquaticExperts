import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const AddressSelection = () => {
    const location = useLocation();
    const { order } = location.state;
    console.log(order);
    const API_BASE_URL = "http://localhost:4000/api/v1";
    const user = useSelector((state) => state.user);
    console.log("printing user in address: ", user);
    const addresses = user.address;

    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleSelect = (index) => {
        setSelectedAddress(index);
    };

    const handleAddNew = () => {
        alert('Add New Address');
    };

    const handleEdit = (index) => {
        alert(`Edit Address ${index + 1}`);
    };

    const handleDelete = (index) => {
        alert(`Delete Address ${index + 1}`);
    };

    const handleContinue = () => {
        if (selectedAddress !== null) {
            order.address=addresses[selectedAddress];
            console.log(order);
            
        } else {
            alert('Please select an address to continue.');
        }
    };

    return (
        <div className="p-4 space-y-4">
            <h2 className="text-xl font-bold">Select Delivery Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address, index) => (
                    <div
                        key={index}
                        className={`p-4 border rounded-2xl shadow-md transition-all ${selectedAddress === index ? 'border-teal-500 bg-teal-100' : 'border-gray-300'}`}
                        onClick={() => handleSelect(index)}
                    >
                        <p className="text-lg font-semibold">{address.type}</p>
                        <p>{address.address}</p>
                        <p>{address.city} - {address.pin}</p>
                        <p>Landmark: {address.landmark}</p>
                        <p>Phone: {address.phone}</p>
                        <div className="flex gap-2 mt-2">
                            <button className="text-blue-500" onClick={(e) => { e.stopPropagation(); handleEdit(index); }}>Edit</button>
                            <button className="text-red-500" onClick={(e) => { e.stopPropagation(); handleDelete(index); }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-4 mt-4">
                <button className="bg-teal-300 hover:bg-teal-600 text-black font-semibold px-4 py-2 rounded-md" onClick={handleAddNew}>Add New Address</button>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md" onClick={handleContinue}>Continue</button>
            </div>
        </div>
    );
};

export default AddressSelection;
