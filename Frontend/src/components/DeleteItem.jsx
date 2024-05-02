import React, { useState } from 'react';
import axios from 'axios';

const DeleteItem = () => {
  const [itemId, setItemId] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setItemId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a DELETE request to the server to delete the item with the specified ID
    axios.delete(`https://commerce-app-stripeserver.onrender.com/deleteItem/${itemId}`)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage('Error deleting item');
        console.error('Error deleting item:', error);
      });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2 style={{ marginBottom: '20px' }}>Delete Item</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <label htmlFor="itemId" style={{ display: 'block', marginBottom: '5px' }}>Item ID:</label>
        <input 
          type="text" 
          id="itemId" 
          name="itemId" 
          value={itemId} 
          onChange={handleInputChange} 
          required 
          style={{ marginBottom: '10px', width: '100%', padding: '5px' }} 
        />
        <button 
          type="submit" 
          style={{ backgroundColor: '#f44336', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' }}
        >
          Delete Item
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteItem;
