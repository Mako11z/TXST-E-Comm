// import React from 'react'
// import Data from "/products.json"

// const ShopCategory = ({filterItems,setItem,menuItems,setProducts,selectedCategory}) => {
//   return (
//     <div>
//         <div className='widget-header'>
//             <h5 className='ms-2'>
//                 All Categories
//             </h5>
//         </div>
//         <div>
//             <button onClick={() => setProducts(Data)} className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}>All</button>
//             {
//                 menuItems.map((Val, i) => {
//                     return (
//                         <button className={`m-2 ${selectedCategory === Val ? "bg-warning" : ""}`} 
//                         key={i} 
//                         onClick={() => filterItems(Val)}> {Val} </button>
//                     )
//                 })
//             }
//         </div>
//     </div>
//   )
// }

// export default ShopCategory


import React from 'react';

const ShopCategory = ({ filterItems, setItem, menuItems, setProducts, selectedCategory }) => {
  return (
    <div>
      <div className='widget-header'>
        <h5 className='ms-2'>All Categories</h5>
      </div>
      <div>
        <button onClick={() => fetchProducts(setProducts)} className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}>All</button>
        {menuItems.map((val, i) => (
          <button
            className={`m-2 ${selectedCategory === val ? "bg-warning" : ""}`}
            key={i}
            onClick={() => filterItems(val)}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
};

const fetchProducts = (setProducts) => {
  fetch("/products.json")
    .then((response) => response.json())
    .then((data) => setProducts(data))
    .catch((error) => console.error('Error fetching data:', error));
};

export default ShopCategory;
