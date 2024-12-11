import React, { useEffect, useState } from 'react';
import './Edit.css';

function EditUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users'); 
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="all">
        <h1 id="h1">Admin</h1>
        <div className="navigation">
          <a href="">Users requests</a>
          <a href="/admin">Users List</a>
          <a href="">Department management</a>
        </div>
        <div className="logout">
          <a href="/">Logout</a>
        </div>
        <div className="div"></div>
        <div className="sticker">Edit</div>
        <div className="holderedit">
            <p id='namaiwa'>Anas Ben esghiaer</p>
            <p id='emailz'>anas.sgh222@gmail.com</p>
            <p id='label1'>Tag name</p>
            <input type="text" name="" id="input" placeholder='Your Name'/>
            <p id='label2'>
                Departement
            </p>
            <select name="" id="select">
                <option value="">Marketing</option>
                <option value="">IT</option>
                <option value="">Security</option>
            </select>
            <br />
            <button id='save'>Save</button>
            <button id='cnc'>Cancel</button>
        </div>
      </div>
    </>
  );
}

export default EditUser;
