import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [editedProductDetails, setEditedProductDetails] = useState({});
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/products'); // Ensure this URL is correct
        
        // Ensure data is an array
        if (Array.isArray(response.data.data)) {
          setProducts(response.data.data);
        } else {
          throw new Error(`Unexpected API response format: ${JSON.stringify(response.data)}`);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError('Error fetching products. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  const offset = currentPage * itemsPerPage;
  // Default to empty array if products is not defined
  let currentItems = (products || []).slice(offset, offset + itemsPerPage);

  if (searchTerm.trim() !== '') {
    currentItems = currentItems.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const pageCount = Math.ceil((products || []).length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  const handleDelete = async productId => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
      setError('Error deleting product. Please try again later.');
    }
  };

  const handleEdit = product => {
    setEditingProduct(product);
    setEditedProductDetails(product);
  };

  const handleUpdate = async event => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/v1/products/${editingProduct._id}`, editedProductDetails);
      setProducts(products.map(product => (product._id === editingProduct._id ? editedProductDetails : product)));
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      setError('Error updating product. Please try again later.');
    }
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedProductDetails({ ...editedProductDetails, [name]: value });
  };

  return (
    <div>
      <div className='text-2xl text-center font-bold mb-2'>
        Manage Products
      </div>
      <div className="text-black p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-800 rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white text-gray-900">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Color</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">In Stock</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(product => (
                <tr key={product._id} className="bg-gray-100 border-b border-gray-200">
                  <td className="px-4 py-2">{product._id}</td>
                  <td className="px-4 py-2">
                    {product.images && product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover" />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.colors}</td>
                  <td className="px-4 py-2">${product.price}</td>
                  <td className="px-4 py-2">{product.stockQuantity > 0 ? '✔️' : '❌'}</td>
                  <td className="px-4 py-2">
                    <button className="text-green-500 px-1 hover:text-green-700" onClick={() => handleEdit(product)}>
                      Edit
                    </button>
                    <button className="text-red-500 px-1 hover:text-red-700" onClick={() => handleDelete(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mt-4"}
          pageClassName={"mx-1"}
          pageLinkClassName={"px-4 py-2 bg-gray-800 text-white rounded"}
          previousLinkClassName={"px-4 py-2 bg-gray-800 text-white rounded mr-2"}
          nextLinkClassName={"px-4 py-2 bg-gray-800 text-white rounded ml-2"}
          activeLinkClassName={"bg-indigo-500 text-white"}
        />
        {editingProduct && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">Edit Product</h2>
            <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedProductDetails.name || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="colors">
                  Colors
                </label>
                <input
                  type="text"
                  name="colors"
                  value={editedProductDetails.colors || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={editedProductDetails.price || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stockQuantity">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stockQuantity"
                  value={editedProductDetails.stockQuantity || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;



// import React, { useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import laptopImage from './../images/laptop-image.jpg';

// const ManageProducts = () => {
//   const initialProducts = [
//     { id: 19015, image: laptopImage, title: 'test', color: 'test', price: '$100', inStock: true },
//     { id: 19271, image: laptopImage, title: 'Playstation 5 Digital Edition', color: 'white', price: '$250.99', inStock: true },
//     { id: 20568, image: laptopImage, title: 'Dell Laptop KR211822', color: 'black', price: '$499.99', inStock: true },
//     { id: 69837, image: laptopImage, title: 'Logitech MX Master 3', color: 'black', price: '$59.49', inStock: true },
//     { id: 77893, image: laptopImage, title: 'Rode Podcast Microphone', color: 'gray', price: '$119.49', inStock: false },
//     { id: 83748, image: laptopImage, title: 'Toshiba Split AC 2', color: 'white', price: '$899.99', inStock: true },
//     { id: 93728, image: laptopImage, title: 'Sony Bravia KDL-47W805A', color: 'black', price: '$970.49', inStock: true },
//     { id: 10783, image: laptopImage, title: 'Acer Laptop 16 KL-4804', color: 'black', price: '$599.99', inStock: true },
//   ];

//   const [products, setProducts] = useState(initialProducts);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');

//   const itemsPerPage = 5;

//   // Calculate the displayed items for the current page and filtered by search term
//   const offset = currentPage * itemsPerPage;
//   let currentItems = products.slice(offset, offset + itemsPerPage);

//   // Apply search filter if searchTerm is not empty
//   if (searchTerm.trim() !== '') {
//     currentItems = currentItems.filter(product =>
//       product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }

//   const pageCount = Math.ceil(products.length / itemsPerPage);

//   // Handle page change
//   const handlePageClick = ({ selected }) => {
//     setCurrentPage(selected);
//   };

//   // Handle search term change
//   const handleSearchChange = event => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(0); // Reset to first page when searching
//   };

//   // Delete a product
//   const handleDelete = productId => {
//     const updatedProducts = products.filter(product => product.id !== productId);
//     setProducts(updatedProducts);
//   };

//   return (
//     <div>
//       <div className='text-2xl text-center font-bold mb-2'>
//         Manage Products
//       </div>
//       <div className="text-black p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h1 className="text-2xl font-bold">Products</h1>
//           {/* Search input */}
//           <input
//             type="text"
//             placeholder="Search by title..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="px-4 py-2 border border-gray-800 rounded"
//           />
//         </div>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white text-gray-900">
//             <thead>
//               <tr className="bg-gray-800 text-white">
//                 <th className="px-4 py-2 text-left">ID</th>
//                 <th className="px-4 py-2 text-left">Image</th>
//                 <th className="px-4 py-2 text-left">Title</th>
//                 <th className="px-4 py-2 text-left">Color</th>
//                 <th className="px-4 py-2 text-left">Price</th>
//                 <th className="px-4 py-2 text-left">In Stock</th>
//                 <th className="px-4 py-2 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.map(product => (
//                 <tr key={product.id} className="bg-gray-100 border-b border-gray-200">
//                   <td className="px-4 py-2">{product.id}</td>
//                   <td className="px-4 py-2"><img src={product.image} alt={product.title} className="w-12 h-12 object-cover" /></td>
//                   <td className="px-4 py-2">{product.title}</td>
//                   <td className="px-4 py-2">{product.color}</td>
//                   <td className="px-4 py-2">{product.price}</td>
//                   <td className="px-4 py-2">{product.inStock ? '✔️' : '❌'}</td>
//                   <td className="px-4 py-2">
//                     <button className="text-green-500 px-1 hover:text-green-700" onClick={() => handleDelete(product.id)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//                       <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
//                     </svg>
//                     </button>
//                     <button className="text-red-500 px-1 hover:text-red-700" onClick={() => handleDelete(product.id)}>
//                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//                       <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
//                     </svg>
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         <ReactPaginate
//           previousLabel={"Previous"}
//           nextLabel={"Next"}
//           pageCount={pageCount}
//           onPageChange={handlePageClick}
//           containerClassName={"flex justify-center mt-4"}
//           pageClassName={"mx-1"}
//           pageLinkClassName={"px-4 py-2 bg-gray-800 text-white rounded"}
//           previousLinkClassName={"px-4 py-2 bg-gray-800 text-white rounded mr-2"}
//           nextLinkClassName={"px-4 py-2 bg-gray-800 text-white rounded ml-2"}
//           activeLinkClassName={"bg-indigo-500 text-white"}
//         />
//       </div>
//     </div>
//   );
// };

// export default ManageProducts;
