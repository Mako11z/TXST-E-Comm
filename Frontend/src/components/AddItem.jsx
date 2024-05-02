import React, { useState } from 'react';
import axios from 'axios';

const AddItem = () => {
    const [formData, setFormData] = useState({
        category: "",
        categoryType: "",
        name: "",
        seller: "",
        price: 0,
        stock: 0,
        ratings: 0,
        ratingsCount: 0,
        img: "",
        shipping: 0,
        quantity: 0
    });

    const addItem = async () => {
        try {
            // Fetch existing data from the server
            const response = await axios.get('https://commerce-app-stripeserver.onrender.com/products');
            const existingData = response.data;
    
            // Append the new item to the existing data
            const newData = [...existingData, formData];
    
            // Update the data on the server
            await axios.post('https://commerce-app-stripeserver.onrender.com/updateData', newData);
    
            console.log('Item added successfully.');
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Add Item</h2>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="text" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Category Type:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="text" name="categoryType" value={formData.categoryType} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="text" name="name" value={formData.name} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Seller:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="text" name="seller" value={formData.seller} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Price:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="number" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Stock:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="number" name="stock" value={formData.stock} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Ratings:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="number" name="ratings" value={formData.ratings} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Ratings Count:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="number" name="ratingsCount" value={formData.ratingsCount} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Image:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="text" name="img" value={formData.img} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Shipping:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="number" name="shipping" value={formData.shipping} onChange={handleChange} />
                </div>
                <div style={{ marginBottom: '10px', width: '48%' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Quantity:</label>
                    <input style={{ width: '100%', padding: '5px' }} type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                </div>
            </div>
            <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }} onClick={addItem}>Add Item</button>
        </div>
    );
};

export default AddItem;
