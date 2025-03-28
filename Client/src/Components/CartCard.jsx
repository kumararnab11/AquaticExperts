import { Trash2 } from "lucide-react";

const CartCard = ({ image, name, price, quantity, onIncrease, onDecrease, onRemove }) => {
  console.log(image);
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200 w-full">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full rounded-lg object-cover" />
      </div>

      {/* Item Details */}
      <div className="flex flex-col sm:flex-row sm:items-center flex-grow px-4 text-center sm:text-left">
        <div className="sm:w-1/2">
          <h3 className="text-lg text-teal-700 font-semibold">{name}</h3>
          {/* <p className="text-teal-500 text-sm">#4576279</p> */}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-center sm:justify-start mt-2 sm:mt-0">
          <button
            onClick={onDecrease}
            className="px-3 py-1 text-lg font-semibold text-teal-700 hover:bg-gray-200 rounded-l-lg border border-gray-300"
          >
            -
          </button>
          <span className="px-4 py-1 text-teal-700 text-lg border-y border-gray-300">{quantity}</span>
          <button
            onClick={onIncrease}
            className="px-3 py-1 text-lg font-semibold text-teal-700 hover:bg-gray-200 rounded-r-lg border border-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Price and Remove Button */}
      <div className="flex flex-row sm:flex-col items-center sm:items-end space-x-4 sm:space-x-0 sm:space-y-2">
        <span className="text-lg font-semibold text-gray-700">${price}</span>

        {/* Remove Button (Trash Icon) */}
        <button onClick={onRemove} className="text-red-500 hover:text-red-700 text-2xl">
          <Trash2 />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
