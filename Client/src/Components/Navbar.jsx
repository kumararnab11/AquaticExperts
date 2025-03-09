import { useState, useRef, useEffect } from "react";
import { Menu, X, User, ShoppingCart, Package, MapPin, Settings, LogOut } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";

const Navbar = ({user}) => {
  console.log("user is:",user);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(user?true:false);
  const [cartItemCount, setCartItemCount] = useState(user?user.cart.length:'0');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const profileRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(!!user); // Sets true if user exists, otherwise false
  
    if (user && user.cart) {
      setCartItemCount(user.cart.length);
    } else {
      setCartItemCount(0);
    }
  }, [user]);
  

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  return (
    <nav className="sticky top-0 w-full bg-black shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold text-teal-600">
            <Link to="/">Aquatic Experts</Link>
          </div>

          <div className="flex-grow hidden md:flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {["Home", "About", "Contact", "Blogs"].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-white hover:text-teal-600 ${
                    (item === "Home" && location.pathname === "/") || isActive
                      ? "border-b-2 border-teal-600"
                      : ""
                  }`
                }
              >
                {item}
              </NavLink>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center space-x-4 relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  <User size={20} className="mr-2" />
                  Profile
                </button>
                <Link
                  to="/cart"
                  className="relative flex items-center p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  <ShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="text-white focus:outline-none">
              <User size={24} />
            </button>
            <Link to="/cart" className="relative text-white">
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black text-white p-4 space-y-2 z-50 relative">
        {["Home", "About", "Services", "Contact"].map((item) => (
          <NavLink
            key={item}
            to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
            className={({ isActive }) =>
              `block py-2 px-4 rounded ${
                (item === "Home" && location.pathname === "/") || isActive
                ? "border-b-2 border-teal-600"
                : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            {item}
          </NavLink>
        ))}

        </div>
      )}

      {isProfileOpen && (
        <>
          {/* Overlay with blur effect */}
          <div
            className="fixed inset-0 bg-opacity-30 backdrop-blur-sm z-40"
            onClick={() => setIsProfileOpen(false)}
          ></div>

          {/* Profile Dropdown Card */}
          <div className="absolute right-5 top-16 w-64 bg-white shadow-lg rounded-lg p-4 z-50">
            <div className="flex items-center gap-3 border-b pb-3">
              <User size={30} className="text-teal-600" />
              <div>
                <p className="font-bold text-gray-900">{user.name}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
              </div>
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/profile/orders" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                  <Package size={18} className="text-teal-600" />
                  My Orders
                </Link>
              </li>
              <li>
                <Link to="/profile/addresses" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                  <MapPin size={18} className="text-teal-600" />
                  Addresses
                </Link>
              </li>
              <li>
                <Link to="/profile/settings" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100">
                  <Settings size={18} className="text-teal-600" />
                  Settings
                </Link>
              </li>
              <li>
                <button
                  className="w-full flex items-center gap-2 p-2 rounded-md text-red-600 hover:bg-gray-100"
                  onClick={() => alert("Logout functionality here")}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </>
      )}

    </nav>
  );
};

export default Navbar;
