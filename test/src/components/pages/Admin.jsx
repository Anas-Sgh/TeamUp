import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import './Admin.css';

function Admin() {
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
          <a href="" id="active">Users List</a>
          <a href="">Department management</a>
        </div>
        <div className="logout">
          <a href="/">Logout</a>
        </div>
        <div className="div"></div>
        <div className="list">
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-mail</th>
                <th>Department</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.department}</td>
                  <td>
                    <button id="edit">Edit</button>
                    <button id="del">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Admin;
