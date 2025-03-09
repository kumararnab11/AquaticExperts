import { useState } from "react";
import { MapPin, Trash2, Plus, Phone, Landmark } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { update } from "../redux/UserSlice";

const AddressComponent = () => {
  const API_BASE_URL = "http://localhost:4000/api/v1";
  const dispatch = useDispatch(); // ✅ Added dispatch hook

  const user = useSelector((state) => state.user);
  console.log("printing user in address: ",user);
  const addresses = user.address;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    id: "",
    type: "",
    address: "",
    city: "",
    pin: "",
    phone: "",
    landmark: "",
  });

  // ✅ Handle Delete Address (Backend + Redux)
  const handleDelete = async (addressId) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/deleteaddress`,
        {
          id: user._id,
          addressId: addressId,
        },
        { withCredentials: true }
      );

      console.log("Address deleted:", response.data.updatedUser);

      dispatch(update(response.data.updatedUser)); // ✅ Update Redux with latest user data
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // ✅ Handle Add Address Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const addressToAdd = { ...newAddress, id: Date.now() };

    try {
      const updatedUser = await updateDb(addressToAdd);

      if (updatedUser) {
        dispatch(update(updatedUser)); // ✅ Update Redux with latest user data

        setIsFormOpen(false); // Close form
        // Reset form fields
        setNewAddress({
          id: "",
          type: "",
          address: "",
          city: "",
          pin: "",
          phone: "",
          landmark: "",
        });
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  // ✅ Call backend API to update address
  const updateDb = async (addressToAdd) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updateaddress`,
        {
          id: user._id,
          address: addressToAdd,
        },
        { withCredentials: true }
      );

      console.log("Updated user from DB:", response.data.updatedUser);

      return response.data.updatedUser;
    } catch (error) {
      console.error("Error updating address in DB:", error);
      return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <MapPin className="text-teal-600" /> Addresses
      </h2>

      <div className="mt-4 space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="border p-4 rounded-lg shadow-sm bg-gray-50 relative"
          >
            <div
              className="absolute top-4 right-4 text-red-600 hover:text-red-800 cursor-pointer"
              onClick={() => handleDelete(address.id)} // ✅ Now calls delete API
            >
              <Trash2 size={20} />
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {address.type}
            </h3>
            <p className="text-gray-700">{address.address}</p>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin size={16} className="text-teal-600" /> {address.city}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              📌 Pin: {address.pin}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <Phone size={16} className="text-teal-600" /> {address.phone}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <Landmark size={16} className="text-yellow-600" /> Landmark:{" "}
              {address.landmark}
            </p>
          </div>
        ))}
      </div>

      <button
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        onClick={() => setIsFormOpen(!isFormOpen)}
      >
        <Plus size={18} /> Add New Address
      </button>

      {isFormOpen && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-4 border rounded-lg shadow-sm bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="type"
              placeholder="Address Type (Home, Work, etc.)"
              value={newAddress.type}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Full Address"
              value={newAddress.address}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City & District"
              value={newAddress.city}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              name="pin"
              placeholder="Pincode"
              value={newAddress.pin}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={newAddress.phone}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="text"
              name="landmark"
              placeholder="Landmark"
              value={newAddress.landmark}
              onChange={handleChange}
              className="p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              onClick={() => setIsFormOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Save Address
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddressComponent;
