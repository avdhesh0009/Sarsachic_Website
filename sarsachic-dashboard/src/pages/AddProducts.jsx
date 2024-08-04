
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProducts.css";
import useAxiosPublic from "../hooks/useAxios";

const categoriesData = [
  { id: "men", name: "Men" },
  { id: "women", name: "Women" },
  { id: "kids", name: "Kids" },
];

const attributesData = {
  men: {
    style: ["Crew Neck", "V-Neck", "Polo"],
    fabric: ["Cotton", "Polyester", "Blend"],
    fit: ["Regular fit", "Slim fit"],
    sleeveLength: ["Short sleeve", "Long sleeve"],
  },
  women: {
    style: ["Crew Neck", "V-Neck", "Scoop Neck"],
    fabric: ["Cotton", "Polyester", "Silk"],
    fit: ["Regular fit", "Fitted"],
    sleeveLength: ["Short sleeve", "Sleeveless"],
  },
  kids: {
    ageGroup: ["Toddler", "Child", "Teen"],
    gender: ["Boys", "Girls", "Unisex"],
    fabric: ["Cotton", "Polyester", "Blend"],
    design: ["Cartoon", "Animal", "Sports"],
  },
};

const AddProducts = () => {
  const [categories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [attributes, setAttributes] = useState({});
  const axios = useAxiosPublic()
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    style: "",
    fabric: "",
    fit: "",
    sleeveLength: "",
    ageGroup: "",
    gender: "",
    design: "",
    price: "",
    stockQuantity: "",
    sizes: "",
    colors: "",
    images: [],
    featured: false,
    oversized: false,
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      setAttributes(attributesData[selectedCategory] || {});
    } else {
      setAttributes({});
    }
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setProductData({ ...productData, category: event.target.value });
  };

  const handleAttributeChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setProductData({ ...productData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setProductData({ ...productData, [name]: checked });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()


    try {
      // Uploading images to Cloudinary
      const uploadedImages = [];
      for (const image of productData.images) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset","product_preset"); // Replace with your upload preset

        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/dgdsp2za6/image/upload", // Replace with your Cloudinary URL
          formData
        );

        uploadedImages.push(cloudinaryResponse.data.secure_url);
      }

      // Prepare product data with image URLs
      const productDataWithImages = {
        ...productData,
        images: uploadedImages,
      };
    
  
  console.log("Product data with image URLs:", productDataWithImages);

     // Sending product data to backend
      const response = await axios.post(
        "http://localhost:8000/api/v1/products/add",
        productDataWithImages,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product added:", response.data);

      // Reset form after submitting
      setProductData({
        name: "",
        description: "",
        category: "",
        style: "",
        fabric: "",
        fit: "",
        sleeveLength: "",
        ageGroup: "",
        gender: "",
        design: "",
        price: "",
        stockQuantity: "",
        sizes: "",
        colors: "",
        images: [],
        featured: false,
        oversized: false,
      });
      setSelectedCategory("");
      setImagePreviews([]);
    } catch (error) {
      console.error("Error adding product:", error);
    }

  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="product-name">Product Name:</label>
          <input
            type="text"
            id="product-name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            required
            className="form-control"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            required
            className="form-control"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCategory && (
          <div className="attributes-row">
            {attributes.style && (
              <div className="form-group">
                <label htmlFor="style">Style:</label>
                <select
                  id="style"
                  name="style"
                  value={productData.style}
                  onChange={handleAttributeChange}
                  className="form-control"
                >
                  <option value="">Select Style</option>
                  {attributes.style.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {attributes.fabric && (
              <div className="form-group">
                <label htmlFor="fabric">Fabric:</label>
                <select
                  id="fabric"
                  name="fabric"
                  value={productData.fabric}
                  onChange={handleAttributeChange}
                  className="form-control"
                >
                  <option value="">Select Fabric</option>
                  {attributes.fabric.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {attributes.fit && (
              <div className="form-group">
                <label htmlFor="fit">Fit:</label>
                <select
                  id="fit"
                  name="fit"
                  value={productData.fit}
                  onChange={handleAttributeChange}
                  className="form-control"
                >
                  <option value="">Select Fit</option>
                  {attributes.fit.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {attributes.sleeveLength && (
              <div className="form-group">
                <label htmlFor="sleeveLength">Sleeve Length:</label>
                <select
                  id="sleeveLength"
                  name="sleeveLength"
                  value={productData.sleeveLength}
                  onChange={handleAttributeChange}
                  className="form-control"
                >
                  <option value="">Select Sleeve Length</option>
                  {attributes.sleeveLength.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {selectedCategory === "kids" && (
              <>
                {attributes.ageGroup && (
                  <div className="form-group">
                    <label htmlFor="ageGroup">Age Group:</label>
                    <select
                      id="ageGroup"
                      name="ageGroup"
                      value={productData.ageGroup}
                      onChange={handleAttributeChange}
                      className="form-control"
                    >
                      <option value="">Select Age Group</option>
                      {attributes.ageGroup.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {attributes.gender && (
                  <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      name="gender"
                      value={productData.gender}
                      onChange={handleAttributeChange}
                      className="form-control"
                    >
                      <option value="">Select Gender</option>
                      {attributes.gender.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {attributes.design && (
                  <div className="form-group">
                    <label htmlFor="design">Design:</label>
                    <select
                      id="design"
                      name="design"
                      value={productData.design}
                      onChange={handleAttributeChange}
                      className="form-control"
                    >
                      <option value="">Select Design</option>
                      {attributes.design.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock-quantity">Stock Quantity:</label>
          <input
            type="number"
            id="stock-quantity"
            name="stockQuantity"
            value={productData.stockQuantity}
            onChange={handleInputChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sizes">Sizes Available:</label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            value={productData.sizes}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="colors">Colors Available:</label>
          <input
            type="text"
            id="colors"
            name="colors"
            value={productData.colors}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="form-control"
          />
          <div className="image-previews">
            {imagePreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index + 1}`}
                className="image-preview"
              />
            ))}
          </div>
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="featured">Featured Product:</label>
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={productData.featured}
            onChange={handleCheckboxChange}
            className="form-control-checkbox"
          />
        </div>
        <div className="form-group checkbox-group">
          <label htmlFor="oversized">Oversized T-Shirt:</label>
          <input
            type="checkbox"
            id="oversized"
            name="oversized"
            checked={productData.oversized}
            onChange={handleCheckboxChange}
            className="form-control-checkbox"
          />
        </div>
        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProducts;

// import axios from 'axios';

// import "./AddProducts.css";

// const categoriesData = [
//   { id: "men", name: "Men" },
//   { id: "women", name: "Women" },
//   { id: "kids", name: "Kids" },
// ];

// const attributesData = {
//   men: {
//     style: ["Crew Neck", "V-Neck", "Polo"],
//     fabric: ["Cotton", "Polyester", "Blend"],
//     fit: ["Regular fit", "Slim fit"],
//     sleeveLength: ["Short sleeve", "Long sleeve"],
//   },
//   women: {
//     style: ["Crew Neck", "V-Neck", "Scoop Neck"],
//     fabric: ["Cotton", "Polyester", "Silk"],
//     fit: ["Regular fit", "Fitted"],
//     sleeveLength: ["Short sleeve", "Sleeveless"],
//   },
//   kids: {
//     ageGroup: ["Toddler", "Child", "Teen"],
//     gender: ["Boys", "Girls", "Unisex"],
//     fabric: ["Cotton", "Polyester", "Blend"],
//     design: ["Cartoon", "Animal", "Sports"],
//   },
// };

// const AddProducts = () => {

//   const [categories] = useState(categoriesData);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [attributes, setAttributes] = useState({});
//   const [productData, setProductData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     style: "",
//     fabric: "",
//     fit: "",
//     sleeveLength: "",
//     ageGroup: "",
//     gender: "",
//     design: "",
//     price: "",
//     stockQuantity: "",
//     sizes: "",
//     colors: "",
//     images: [],
//     featured: false, 
//     oversized: false, 
//   });
//   const [imagePreviews, setImagePreviews] = useState([]);


//   useEffect(() => {
//     if (selectedCategory) {
//       setAttributes(attributesData[selectedCategory] || {});
//     } else {
//       setAttributes({});
//     }
//   }, [selectedCategory]);

//   const handleCategoryChange = (event) => {
//     setSelectedCategory(event.target.value);
//     setProductData({ ...productData, category: event.target.value });
//   };

//   const handleAttributeChange = (event) => {
//     const { name, value } = event.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     setProductData({ ...productData, images: files });
  
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setImagePreviews(previews);
//   };
  
//   // const handleFileChange = (event) => {
//   //   const files = Array.from(event.target.files);
//   //   setProductData({ ...productData, images: files });

//   //   const previews = files.map((file) => URL.createObjectURL(file));
//   //   setImagePreviews(previews);
//   // };

//   const handleCheckboxChange = (event) => {
//     const { name, checked } = event.target;
//     setProductData({ ...productData, [name]: checked });
//   };
//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     const formData = new FormData();
//     for (let key in productData) {
//       if (Array.isArray(productData[key])) {
//         productData[key].forEach((file) => formData.append('images', file));
//       } else {
//         formData.append(key, productData[key]);
//       }
//     }
  
//     try {
//       const response = await axios.post('http://localhost:8000/api/v1/products/add', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       console.log("Product added:", response.data);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
  
//     // Reset form
//     setProductData({
//       name: "",
//       description: "",
//       category: "",
//       style: "",
//       fabric: "",
//       fit: "",
//       sleeveLength: "",
//       ageGroup: "",
//       gender: "",
//       design: "",
//       price: "",
//       stockQuantity: "",
//       sizes: "",
//       colors: "",
//       images: [],
//       featured: false,
//       oversized: false,
//     });
//     setSelectedCategory("");
//     setImagePreviews([]);
//   };
  
//   // const handleSubmit = (event) => {
//   //   event.preventDefault();

//   //   console.log("Product data:", productData);
//   //   setProductData({
//   //     name: "",
//   //     description: "",
//   //     category: "",
//   //     style: "",
//   //     fabric: "",
//   //     fit: "",
//   //     sleeveLength: "",
//   //     ageGroup: "",
//   //     gender: "",
//   //     design: "",
//   //     price: "",
//   //     stockQuantity: "",
//   //     sizes: "",
//   //     colors: "",
//   //     images: [],
//   //     featured: false,
//   //     oversized: false,
//   //   });
//   //   setSelectedCategory("");
//   //   setImagePreviews([]);
//   // };

//   return (
//     <>
//       <div className="form-container">
//         <form onSubmit={handleSubmit} className="product-form">
//           <div className="form-group">
//             <label htmlFor="product-name">Product Name:</label>
//             <input
//               type="text"
//               id="product-name"
//               name="name"
//               value={productData.name}
//               onChange={handleInputChange}
//               required
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               name="description"
//               value={productData.description}
//               onChange={handleInputChange}
//               required
//               className="form-control"
//             ></textarea>
//           </div>
//           <div className="form-group">
//             <label htmlFor="category">Category:</label>
//             <select
//               id="category"
//               name="category"
//               value={selectedCategory}
//               onChange={handleCategoryChange}
//               required
//               className="form-control"
//             >
//               <option value="">Select Category</option>
//               {categories.map((cat) => (
//                 <option key={cat.id} value={cat.id}>
//                   {cat.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {selectedCategory && (
//             <div className="attributes-row">
//               {attributes.style && (
//                 <div className="form-group">
//                   <label htmlFor="style">Style:</label>
//                   <select
//                     id="style"
//                     name="style"
//                     value={productData.style}
//                     onChange={handleAttributeChange}
//                     className="form-control"
//                   >
//                     <option value="">Select Style</option>
//                     {attributes.style.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               {attributes.fabric && (
//                 <div className="form-group">
//                   <label htmlFor="fabric">Fabric:</label>
//                   <select
//                     id="fabric"
//                     name="fabric"
//                     value={productData.fabric}
//                     onChange={handleAttributeChange}
//                     className="form-control"
//                   >
//                     <option value="">Select Fabric</option>
//                     {attributes.fabric.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               {attributes.fit && (
//                 <div className="form-group">
//                   <label htmlFor="fit">Fit:</label>
//                   <select
//                     id="fit"
//                     name="fit"
//                     value={productData.fit}
//                     onChange={handleAttributeChange}
//                     className="form-control"
//                   >
//                     <option value="">Select Fit</option>
//                     {attributes.fit.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               {attributes.sleeveLength && (
//                 <div className="form-group">
//                   <label htmlFor="sleeveLength">Sleeve Length:</label>
//                   <select
//                     id="sleeveLength"
//                     name="sleeveLength"
//                     value={productData.sleeveLength}
//                     onChange={handleAttributeChange}
//                     className="form-control"
//                   >
//                     <option value="">Select Sleeve Length</option>
//                     {attributes.sleeveLength.map((option) => (
//                       <option key={option} value={option}>
//                         {option}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}
//               {selectedCategory === "kids" && (
//                 <>
//                   {attributes.ageGroup && (
//                     <div className="form-group">
//                       <label htmlFor="ageGroup">Age Group:</label>
//                       <select
//                         id="ageGroup"
//                         name="ageGroup"
//                         value={productData.ageGroup}
//                         onChange={handleAttributeChange}
//                         className="form-control"
//                       >
//                         <option value="">Select Age Group</option>
//                         {attributes.ageGroup.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                   {attributes.gender && (
//                     <div className="form-group">
//                       <label htmlFor="gender">Gender:</label>
//                       <select
//                         id="gender"
//                         name="gender"
//                         value={productData.gender}
//                         onChange={handleAttributeChange}
//                         className="form-control"
//                       >
//                         <option value="">Select Gender</option>
//                         {attributes.gender.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                   {attributes.design && (
//                     <div className="form-group">
//                       <label htmlFor="design">Design:</label>
//                       <select
//                         id="design"
//                         name="design"
//                         value={productData.design}
//                         onChange={handleAttributeChange}
//                         className="form-control"
//                       >
//                         <option value="">Select Design</option>
//                         {attributes.design.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="price">Price:</label>
//             <input
//               type="number"
//               id="price"
//               name="price"
//               value={productData.price}
//               onChange={handleInputChange}
//               required
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="stock-quantity">Stock Quantity:</label>
//             <input
//               type="number"
//               id="stock-quantity"
//               name="stockQuantity"
//               value={productData.stockQuantity}
//               onChange={handleInputChange}
//               required
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="sizes">Sizes Available:</label>
//             <input
//               type="text"
//               id="sizes"
//               name="sizes"
//               value={productData.sizes}
//               onChange={handleInputChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="colors">Colors Available:</label>
//             <input
//               type="text"
//               id="colors"
//               name="colors"
//               value={productData.colors}
//               onChange={handleInputChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="images">Images:</label>
//             <input
//               type="file"
//               id="images"
//               name="images"
//               multiple
//               onChange={handleFileChange}
//               className="form-control"
//             />
//             <div className="image-previews">
//               {imagePreviews.map((src, index) => (
//                 <img
//                   key={index}
//                   src={src}
//                   alt={`Preview ${index + 1}`}
//                   className="image-preview"
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="form-group checkbox-group">
//             <label htmlFor="featured">Featured Product:</label>
//             <input
//               type="checkbox"
//               id="featured"
//               name="featured"
//               checked={productData.featured}
//               onChange={handleCheckboxChange}
//               className="form-control-checkbox"
//             />
//           </div>
//           <div className="form-group checkbox-group">
//             <label htmlFor="oversized">Oversized T-Shirt:</label>
//             <input
//               type="checkbox"
//               id="oversized"
//               name="oversized"
//               checked={productData.oversized}
//               onChange={handleCheckboxChange}
//               className="form-control-checkbox"
//             />
//           </div>
//           <button type="submit" className="submit-button">
//             Add Product
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddProducts;