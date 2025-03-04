import { useState } from "react";
import { MapPin, Trash2, Plus, Phone, Landmark } from "lucide-react";

const AddressComponent = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "123 Street, City, Country",
      city: "Example City, Example District",
      pin: "123456",
      phone: "9876543210",
      landmark: "Near XYZ Park",
    },
    {
      id: 2,
      type: "Work",
      address: "456 Office Rd, City, Country",
      city: "Work City, Work District",
      pin: "654321",
      phone: "9876501234",
      landmark: "Opposite ABC Mall",
    },
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    type: "",
    address: "",
    city: "",
    pin: "",
    phone: "",
    landmark: "",
  });

  const handleDelete = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newAddress.type &&
      newAddress.address &&
      newAddress.city &&
      newAddress.pin &&
      newAddress.phone &&
      newAddress.landmark
    ) {
      setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
      setNewAddress({
        type: "",
        address: "",
        city: "",
        pin: "",
        phone: "",
        landmark: "",
      });
      setIsFormOpen(false);
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
              onClick={() => handleDelete(address.id)}
            >
              <Trash2 size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{address.type}</h3>
            <p className="text-gray-700">{address.address}</p>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin size={16} className="text-teal-600" /> {address.city}
            </p>
            <p className="text-gray-600 flex items-center gap-2">📌 Pin: {address.pin}</p>
            <p className="text-gray-600 flex items-center gap-2">
              <Phone size={16} className="text-teal-600" /> {address.phone}
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              <Landmark size={16} className="text-yellow-600" /> Landmark: {address.landmark}
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
