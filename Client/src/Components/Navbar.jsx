import { useState } from "react";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { NavLink, Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change this based on authentication status
  const [cartItemCount, setCartItemCount] = useState(3); // Replace with actual cart count from Redux or Context
  const location = useLocation(); // Get current route

  return (
    <nav className="sticky top-0 w-full bg-black shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-teal-600">
            <Link to="/">Aquatic Experts</Link>
          </div>

          {/* Search Bar - Centered on Desktop */}
          <div className="flex-grow hidden md:flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {["Home", "About", "Services", "Contact"].map((item) => (
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
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  <User size={20} className="mr-2" />
                  Profile
                </Link>
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
              <Link
                to="/login"
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon for Mobile */}
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

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-black text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-700">
          <div className="px-2 py-3 space-y-2">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <NavLink
                key={item}
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className={({ isActive }) =>
                  `block text-white hover:text-teal-600 ${
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

            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                  onClick={() => setIsOpen(false)}
                >
                  <User size={20} className="mr-2" />
                  Profile
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Cart
                  {cartItemCount > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="block px-4 py-2 text-center bg-teal-600 text-white rounded-md hover:bg-teal-700"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
