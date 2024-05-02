import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OrdersContainer = styled.div`
  background-color: white;
  padding: 20px;
  margin: 10px auto;
  width: 150%;
  max-width: 1200px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
`;

const OrderItem = styled.li`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 10px;
  list-style: none;
`;

const ItemDetail = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
  
  margin-left: 60%;
`;

const Checkbox = styled.input`
  margin-left:80%;
  align-items: right;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-right: 0%
`;

const Orders = () => {
  // State to store the orders
  const [orders, setOrders] = useState([]);

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://commerce-app-adminserver.onrender.com/api/transactions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('There was a problem with fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Function to calculate the total for each order
  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  }

  const handleDelete = async (orderId) => {
    // Delete order from the database
    try {
      const response = await fetch(`https://commerce-app-adminserver.onrender.com/api/transactions/${orderId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Deletion failed');
      setOrders(orders.filter(order => order._id !== orderId));  // Remove order from state
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleCompletion = (orderId) => {
    setOrders(orders.map(order => {
      if (order._id === orderId) {
        order.isCompleted = !order.isCompleted;  // Toggle completion status
      }
      return order;
    }));
  };

  // Render the orders
  return (
    <OrdersContainer>
      <h1>Orders</h1>
      {orders.length > 0 ? (
        <ul>
          {orders.map(order => (
            <OrderItem key={order._id} style={{ backgroundColor: order.isCompleted ? '#d4edda' : '' }}>
               <CheckboxLabel>
                <Checkbox type="checkbox" checked={order.isCompleted || false} onChange={() => handleCompletion(order._id)} />
                Completed
              </CheckboxLabel>
              <strong>Order ID:</strong> {order._id} <br/>
              <strong>User:</strong> {order.userName} <br/> {/* Display the user name with each order */}
              {/* <strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()} <br/> */}
              <strong>Items:</strong>
              <ItemDetail>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} - Quantity: {item.quantity} at ${item.price} each.
                    <br/> Total for item: ${item.quantity * item.price}
                  </li>
                ))}
              </ItemDetail>
              <strong>Total for Order:</strong> ${calculateOrderTotal(order.items)}
              <Button onClick={() => handleDelete(order._id)}>Delete Order</Button>
            </OrderItem>
          ))}
        </ul>
      ) : (
        <p>No orders to display.</p>
      )}
    </OrdersContainer>
  );
};

export default Orders;