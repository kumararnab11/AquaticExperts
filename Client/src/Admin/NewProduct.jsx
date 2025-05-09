import React, { useEffect, useState } from 'react';
import axios from 'axios';

const categoryData = {
  'Fish Food': ['goldfish', 'betta', 'cichlid', 'guppy', 'tetra', 'arowana', 'koi', 'shrimp', 'bottom-feeder'],
  'Aquarium Filter & Media': ['sponge-filter', 'hang-on-back', 'canister-filter', 'internal-power-filters', 'undergravel-filters', 'bio-media', 'mechanical-media', 'chemical-media'],
  'Aquarium Soil & Substrate': ['planted-tank-soil', 'sand-substrate', 'gravel-substrate', 'coral-aragonite-substrate', 'shrimp-tank-substrate'],
  'Aquarium Lighting': ['led-aq-lights', 'planted-tank-light', 'marine-reef-tank-lights', 'nano-tank-lighting', 'clip-on-adjustable-lights'],
  'Aquarium Tools': ['algae-scrapers', 'aquascaping-tools', 'water-testing-kit', 'fish-nets-catching-tool', 'water-changers-siphons', 'co2-systems']
};

const API_BASE_URL = "http://localhost:4000/api/v1";

function AddProductForm() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [features, setFeatures] = useState(['']);
  const [benefits, setBenefits] = useState(['']);
  const [howToUse, setHowToUse] = useState(['']);
  const [category, setCategory] = useState('');
  const [discount, setDiscount] = useState(0);
  const [subcategory, setSubcategory] = useState('');
  const [images, setImages] = useState([{ file: null, preview: null }]);


  //upload image to cloudinary

  const ImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "AquaticExpert");
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dqip9xqmj/image/upload",
        formData
      );

      console.log(response);
  
      return response.data.secure_url; // Return uploaded image URL
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    }
  };
  

  // Feature Handlers
  const handleFeatureChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const addFeature = () => setFeatures([...features, '']);

  const removeFeature = (index) => {
    const updated = [...features];
    updated.splice(index, 1);
    setFeatures(updated);
  };

  // Benefit Handlers
  const handleBenefitChange = (index, value) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };

  const addBenefit = () => setBenefits([...benefits, '']);

  const removeBenefit = (index) => {
    const updated = [...benefits];
    updated.splice(index, 1);
    setBenefits(updated);
  };

  // How To Use Handlers
  const handleHowToUseChange = (index, value) => {
    const updated = [...howToUse];
    updated[index] = value;
    setHowToUse(updated);
  };

  const addHowToUse = () => setHowToUse([...howToUse, '']);

  const removeHowToUse = (index) => {
    const updated = [...howToUse];
    updated.splice(index, 1);
    setHowToUse(updated);
  };

  // Image Handlers
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedImages = [...images];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedImages[index] = { file, preview: reader.result };
        setImages(updatedImages);
      };
      reader.readAsDataURL(file);
    } else {
      updatedImages[index] = { file: null, preview: null };
      setImages(updatedImages);
    }
  };

  const addImageField = () => setImages([...images, { file: null, preview: null }]);

  const removeImageField = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSubcategory('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Upload all images and store their URLs in state
    const uploadedImageUrls = await Promise.all(
      images.map(async (img) => {
        if (img.file) {
          const url = await ImageUpload(img.file);
          return { file: img.file, preview: img.preview, url };
        }
        return img;
      })
    );
  
    setImages(uploadedImageUrls); // Update state with uploaded URLs
  
    const formData = {
      name: productName,
      desc: description,
      price: price,
      quantity: quantity,
      discount: discount,
      keypoints: features,
      benefits: benefits,
      howToUse: howToUse,
      category: category,
      subcategory: subcategory,
      images: uploadedImageUrls.map(img => img.url).filter(url => url !== null) // Store only valid image URLs
    };
  
    try {
      console.log("Uploaded Image URLs:", uploadedImageUrls.map(img => img.url));
      const response = await axios.post(`${API_BASE_URL}/addproduct`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Product added successfully!");
      console.log("response", response.data);
    } catch (error) {
      alert("Submission failed. Please check the console for details.");
      console.error("Error submitting product:", error);
    }
  };
  
  

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-teal-600">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">

        {/* Product Name */}
        <div>
          <label className="block font-medium mb-1">Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded-md"
            rows="3"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price (₹):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Discount */}
        <div>
          <label className="block font-medium mb-1">Discount (%):</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block font-medium mb-1">Quantity (₹):</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border p-2 rounded-md"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category:</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-full border p-2 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categoryData).map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        {category && (
          <div>
            <label className="block font-medium mb-1">Subcategory:</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full border p-2 rounded-md"
              required
            >
              <option value="">Select Subcategory</option>
              {categoryData[category].map((subcat, index) => (
                <option key={index} value={subcat}>{subcat}</option>
              ))}
            </select>
          </div>
        )}

        {/* Features */}
        <div>
          <label className="block font-medium mb-1">Key Features:</label>
          {features.map((feature, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full border p-2 rounded-md"
                placeholder={`Feature ${index + 1}`}
                required
              />
              {features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="mt-2 text-teal-600 hover:text-teal-800 text-sm"
          >
            + Add Feature
          </button>
        </div>

        {/* Benefits */}
        <div>
          <label className="block font-medium mb-1">Benefits:</label>
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
                className="w-full border p-2 rounded-md"
                placeholder={`Benefit ${index + 1}`}
                required
              />
              {benefits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addBenefit}
            className="mt-2 text-teal-600 hover:text-teal-800 text-sm"
          >
            + Add Benefit
          </button>
        </div>

        {/* How to Use */}
        <div>
          <label className="block font-medium mb-1">How to Use:</label>
          {howToUse.map((instruction, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={instruction}
                onChange={(e) => handleHowToUseChange(index, e.target.value)}
                className="w-full border p-2 rounded-md"
                placeholder={`Step ${index + 1}`}
                required
              />
              {howToUse.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeHowToUse(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addHowToUse}
            className="mt-2 text-teal-600 hover:text-teal-800 text-sm"
          >
            + Add Instruction
          </button>
        </div>

        {/* Dynamic Image Upload */}
        <div>
          <label className="block font-medium mb-1">Upload Product Images:</label>
          {images.map((img, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="file"
                onChange={(e) => handleImageChange(index, e)}
                accept="image/*"
                className="border p-2 rounded-md"
                // required={!img.preview}
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeImageField(index)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="mt-2 text-teal-600 hover:text-teal-800 text-sm"
          >
            + Add Another Image
          </button>

          {/* Image Previews */}
          {images.some(img => img.preview) && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {images.map((img, idx) => (
                img.preview && (
                  <div key={idx} className="border rounded-md overflow-hidden shadow-md">
                    <img
                      src={img.preview}
                      alt={`Product Preview ${idx + 1}`}
                      className="object-cover w-full h-48"
                    />
                  </div>
                )
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}

export default AddProductForm;