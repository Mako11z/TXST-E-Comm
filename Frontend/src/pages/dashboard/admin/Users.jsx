import React, { useState, useEffect } from 'react';
import { FaTrashAlt, FaUser, FaUsers } from "react-icons/fa";

const Users = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://commerce-app-adminserver.onrender.com/users');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users:', res.status);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    console.log(userId);
    try {
      const res = await fetch(`https://commerce-app-adminserver.onrender.com/users/${userId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setUsers(users.filter(user => user._id !== userId));
      } else {
        console.log('Failed to delete user:', res.status);
      }
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '1rem' }}>
        <h5>All Users</h5>
        <h5>Total Users: {users.length}</h5>
      </div>
      {/* table */}
      <div style={{ overflowX: 'auto', margin: '0 1rem' }}>
      <table style={{ width: '100%', minWidth: '800px' }}>
          <thead style={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px' }}>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{
                      user.role === 'admin' ? "Admin" : (
                        <button style={{ border: 'none', borderRadius: '4px', cursor: 'pointer' }}><FaUsers /></button>
                      )
                    }
                </td>
                <td><button style={{  border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleDelete(user._id)}><FaTrashAlt /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
