import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductDisplay = ({ item }) => {
    const {name, id, price, seller, ratingsCount, quantity, img} = item;
    const [prequantity, setPreQuantity] = useState(quantity);
    const [size, setSize] = useState("Select Size");
    const [color, setColor] = useState("Select Color");
    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };
    const handleColorChange = (e) => {
        setColor(e.target.value);
    };
    const handleDec = () => {
        if (prequantity > 1) {
            setPreQuantity(prequantity - 1);
        }
    };
    const handleInc = () => {
        setPreQuantity(prequantity + 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const prod = {
            id: id,
            img: img,
            name: name,
            price: price,
            quantity: prequantity,
            size: size,
            color: color
        };
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProdIndex = existingCart.findIndex((item) => item.id === id);
        if (existingProdIndex !== -1) {
            existingCart[existingProdIndex].quantity += prequantity;
        } else {
            existingCart.push(prod);
        }
        // Update local storage
        localStorage.setItem("cart", JSON.stringify(existingCart));
        // Reset form page
        setPreQuantity(1);
        setSize("Select Size");
        setColor("Select Color");

        // Display alert to let user know the item was added
        alert("Added to cart! keep shopping");
        // Redirect to shop page
        window.location.href = "/shop";
    }

  return (
    <div>
        <div>
        <h4>{name}</h4>
        <p className='rating'>
            <i className='icofont-star'></i>
            <i className='icofont-star'></i>
            <i className='icofont-star'></i>
            <i className='icofont-star'></i>
            <i className='icofont-star'></i>
            <span>{ratingsCount}</span>
        </p>
        <h4>${price}</h4>
        <h6>{seller}</h6>
        <p>Description will go here for the products</p>
    </div>
    <div>
        <form onSubmit={handleSubmit}>
            <div className='select-product size'>
                <select value={size} onChange={handleSizeChange}>
                    <option>Select Size</option>
                    <option value="SM">SM</option>
                    <option value="MD">MD</option>
                    <option value="LG">LG</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
                <i className='icofont-rounded-down'></i>
            </div>
            <div className='select-product color'>
                <select value={color} onChange={handleColorChange}>
                    <option>Select Color</option>
                    <option value="SM">Red</option>
                    <option value="MD">Blue</option>
                    <option value="LG">Green</option>
                    <option value="XL">Maroon</option>
                    <option value="XXL">White</option>
                </select>
                <i className='icofont-rounded-down'></i>
            </div>
            <div className='cart-plus-minus'>
                <div className='dec qtybutton' onClick={handleDec}>-</div>
                <input 
                className='cart-plus-minus-box'
                type='text' name='qtybutton' id='qtybutton' value={prequantity} 
                onChange={(e) => setPreQuantity(parseInt(e.target.value, 10))}
                />
                <div className='inc qtybutton' onClick={handleInc}>+</div>
            </div>
            <div className='discount-code mb-2'></div>
            <button type='submit' className='lab-btn' onClick={handleInc}>
                <span>Add to Cart </span>
            </button>
            <Link to="/cart-page" className='lab-btn bg-primary'>
                <span>Check Out</span>
            </Link>
        </form>
    </div>
    </div>
  )
}

export default ProductDisplay