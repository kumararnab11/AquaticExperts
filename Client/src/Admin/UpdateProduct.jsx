import React, { useState, useEffect } from 'react';
import axios from 'axios';
import  {useParams}  from 'react-router-dom';

const categoryData = {
  'Fish Food': ['goldfish', 'betta', 'cichlid', 'guppy', 'tetra', 'arowana', 'koi', 'shrimp', 'bottom-feeder'],
  'Aquarium Filter & Media': ['sponge-filter', 'hang-on-back', 'canister-filter', 'internal-power-filters', 'undergravel-filters', 'bio-media', 'mechanical-media', 'chemical-media'],
  'Aquarium Soil & Substrate': ['planted-tank-soil', 'sand-substrate', 'gravel-substrate', 'coral-aragonite-substrate', 'shrimp-tank-substrate'],
  'Aquarium Lighting': ['led-aq-lights', 'planted-tank-light', 'marine-reef-tank-lights', 'nano-tank-lighting', 'clip-on-adjustable-lights'],
  'Aquarium Tools': ['algae-scrapers', 'aquascaping-tools', 'water-testing-kit', 'fish-nets-catching-tool', 'water-changers-siphons', 'co2-systems']
};

const API_BASE_URL = "http://localhost:4000/api/v1";

function UpdateProduct() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/getproduct/${productId}`)
      .then(response => {
        //console.log(response.data.data)
        setProductData(response.data.data)
      })
      .catch(error => console.error("Error fetching product data:", error));
  }, [productId]);

  const handleChange = (field, value) => {
    setProductData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setProductData(prev => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = value;
      return { ...prev, [field]: updatedArray };
    });
  };

  const addArrayField = (field) => {
    setProductData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayField = (field, index) => {
    setProductData(prev => {
      const updatedArray = [...prev[field]];
      updatedArray.splice(index, 1);
      return { ...prev, [field]: updatedArray };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/updateproduct`, productData);
      alert("Product updated successfully!");
    } catch (error) {
      alert("Update failed. Check console for details.");
      console.error("Error updating product:", error);
    }
  };

  if (!productData) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-teal-600">Update Product</h2>
      <form onSubmit={handleUpdate} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label className="block font-medium mb-1">Product Name:</label>
          <input type="text" value={productData.name || ''} onChange={(e) => handleChange('name', e.target.value)} className="w-full border p-2 rounded-md" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Description:</label>
          <textarea value={productData.desc || ''} onChange={(e) => handleChange('desc', e.target.value)} className="w-full border p-2 rounded-md" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Price (₹):</label>
          <input type="number" value={productData.price || 0} onChange={(e) => handleChange('price', e.target.value)} className="w-full border p-2 rounded-md" required />
        </div>

        <div>
          <label className="block font-medium mb-1">Discount (%):</label>
          <input type="number" value={productData.discount || 0} onChange={(e) => handleChange('discount', e.target.value)} className="w-full border p-2 rounded-md" />
        </div>

        <div>
          <label className="block font-medium mb-1">Quantity:</label>
          <input type="number" value={productData.quantity || 0} onChange={(e) => handleChange('quantity', e.target.value)} className="w-full border p-2 rounded-md" />
        </div>

        <div>
          <label className="block font-medium mb-1">Category:</label>
          <select value={productData.category || ''} onChange={(e) => handleChange('category', e.target.value)} className="w-full border p-2 rounded-md" required>
            <option value="">Select Category</option>
            {Object.keys(categoryData).map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {productData.category && (
          <div>
            <label className="block font-medium mb-1">Subcategory:</label>
            <select value={productData.subcategory || ''} onChange={(e) => handleChange('subcategory', e.target.value)} className="w-full border p-2 rounded-md" required>
              <option value="">Select Subcategory</option>
              {categoryData[productData.category]?.map((subcat, index) => (
                <option key={index} value={subcat}>{subcat}</option>
              ))}
            </select>
          </div>
        )}

        {/* Features */}
        <div>
          <label className="block font-medium mb-1">Key Features:</label>
          {productData.keypoints?.map((feature, index) => (
            <div key={index} className="flex items-center mb-2">
              <input type="text" value={feature} onChange={(e) => handleArrayChange('keypoints', index, e.target.value)} className="w-full border p-2 rounded-md" />
              {productData.keypoints.length > 0 && (
                <button type="button" onClick={() => removeArrayField('keypoints', index)} className="ml-2 text-red-500 hover:text-red-700">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addArrayField('keypoints')} className="mt-2 text-teal-600 hover:text-teal-800 text-sm">+ Add Feature</button>
        </div>

        {/* Benefits */}
        <div>
          <label className="block font-medium mb-1">Benefits:</label>
          {productData.benefits?.map((benefit, index) => (
            <div key={index} className="flex items-center mb-2">
              <input type="text" value={benefit} onChange={(e) => handleArrayChange('benefits', index, e.target.value)} className="w-full border p-2 rounded-md" required />
              {productData.benefits.length > 1 && (
                <button type="button" onClick={() => removeArrayField('benefits', index)} className="ml-2 text-red-500 hover:text-red-700">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addArrayField('benefits')} className="mt-2 text-teal-600 hover:text-teal-800 text-sm">+ Add Benefit</button>
        </div>

        {/* How to use */}
        <div>
          <label className="block font-medium mb-1">How To Use:</label>
          {productData.howToUse?.map((how2use, index) => (
            <div key={index} className="flex items-center mb-2">
              <input type="text" value={how2use} onChange={(e) => handleArrayChange('howToUse', index, e.target.value)} className="w-full border p-2 rounded-md" />
              {productData.howToUse.length > 0 && (
                <button type="button" onClick={() => removeArrayField('howToUse', index)} className="ml-2 text-red-500 hover:text-red-700">Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={() => addArrayField('howToUse')} className="mt-2 text-teal-600 hover:text-teal-800 text-sm">+ Add HowToUse</button>
        </div>

        <button type="submit" className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;