//this page is no longer needed!!!!
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductData from "../products.json";

const SelectedCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);
  
  // Filtering based on category.
  const filterItem = (categItem) => {
    setSelectedCategory(categItem);
    if (categItem === "All") {
      setItems(ProductData); // Reset to display all items
    } else {
      const updatedItems = ProductData.filter((curElem) => {
        return curElem.categoryType === categItem;
      });
      setItems(updatedItems);
    }
  };
  
  return (
    <div className='banner-content'>
      <select onChange={(e) => filterItem(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Casual">Casual</option>
        <option value="Gym">Gym</option>
        <option value="Gifts">Gifts</option>
      </select>
      {selectedCategory !== "All" && (
        <ul className='lab-ul'>
          {items.map((product) => (
            <li key={product.id}>
              <Link to={`/shop/${product.id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedCategory;


