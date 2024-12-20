import React, { useEffect, useState } from 'react';
import './Edit.css';
import { useNavigate, useLocation } from 'react-router-dom';

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {}; // Correct way to retrieve id from location.state
  const [user, setUser] = useState(null); // To hold the user's data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [departments, setDepartments] = useState([]); // To hold department data
  const [selectedDepartment, setSelectedDepartment] = useState(''); // To store selected department

  // Fetch user data by ID
  useEffect(() => {
    if (!id) {
      console.error('User ID is missing');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setName(data.name + ' ' + data.lastname);
          setEmail(data.email);
          setSelectedDepartment(data.departement);
        } else {
          console.error('Failed to fetch user');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]); // Dependency array, re-run when id changes

  // Fetch departments from the database
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3000/deps');
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        } else {
          console.error('Failed to fetch departments');
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []); // Empty dependency array, only runs once when the component mounts

  // Handle department change
  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleSave = async () => {
    const department = selectedDepartment;
  
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT', // Use PUT instead of POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ department: selectedDepartment }),
      });
  
      if (response.ok) {
        alert('User updated successfully!');
        navigate('/Admin');
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user');
    }
  };
  

  return (
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
        <p id="namaiwa">{name}</p>
        <p id="emailz">{email}</p>
        <p id="label1">Tag name</p>
        <input
          type="text"
          name=""
          id="input"
          value={name}
          onChange={(e) => setName(e.target.value)} // Handle input change
          placeholder="Your Name"
        />
        <p id="label2">Department</p>
        <select
          name=""
          id="select"
          value={selectedDepartment}
          onChange={handleDepartmentChange} // Handle department change
        >
          <option value="">Select a Department</option>
          {departments.map((department) => (
            <option key={department.id} value={department.named}>
              {department.named}
            </option>
          ))}
        </select>
        <br />
        <button id="save" onClick={handleSave}>Save</button>
        <button id="cnc" onClick={() => navigate('/admin')}>Cancel</button> {/* Navigate back to admin */}
      </div>
    </div>
  );
}

export default EditUser;