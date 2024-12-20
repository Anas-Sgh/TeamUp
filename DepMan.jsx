import React, { useState, useEffect } from "react";
import "./DepMan.css";
import { Navigate } from "react-router-dom";

function DepMan() {
  const [departments, setDepartments] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedDepId, setSelectedDepId] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:3000/deps");
        if (response.ok) {
          const data = await response.json();
          setDepartments(data);
        } else {
          console.error("Failed to fetch departments");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:3000/depsdelete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
      });
  
      if (response.ok) {
        location.reload();

      } else {
        console.error("Failed to delete department");
      }
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };




  const handleAdd = async () => {
    const input = document.querySelector(".depname");
    const nameDepartment = input.value.trim();
  
    if (!nameDepartment) {
      alert("Department name is required!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/depsadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nameDepartment }),
      });
  
      if (response.ok) {
        const newDepartment = await response.json();
        setDepartments((prev) => [...prev, { id: newDepartment.id, named: nameDepartment }]);
        setShowAddPopup(false);
        input.value = ""; 
      } else {
        console.error("Failed to add department");
      }
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };





  return (
    <div className="everything2">
      <div className="all2">
        <div className="lbarani1">
          <div className="header-container1">
            <h1 className="title1">Admin</h1>
            <div className="floaty1">
              <a href="usersrequest">Users requests</a>
              <a href="admin">Users List</a>
              <a href="#">Department management</a>
            </div>
            <div className="floatyOkhra1">
              <a href="#">Log Out</a>
            </div>
          </div>
          <div className="divider1"></div>

          <div className="onwen1">
            <h2>Department Management</h2>
          </div>

          <div className="lak7el1">
            <div className="lfoug1">
              <input className="search-bar1" type="text" placeholder="Search" />
              <button className="add1" onClick={() => setShowAddPopup(true)}>
                Add
              </button>
            </div>
            {departments.map((department) => (
              <div className="member1" key={department.id}>
                <span>{department.named}</span>
                <div>
                  <button
                    className="button21"
                    style={{ backgroundColor: "red" }}
                    onClick={() => {setSelectedDepId(department.id); setShowDeletePopup(true);}}>✘</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showDeletePopup && (
          <div className="popup1">
            <div className="popup1-content">
              <h2>Delete department?</h2>
              <button className="yes" onClick={() => handleDelete(selectedDepId)}>Yes</button>
              <button className="cancel" onClick={() => setShowDeletePopup(false)}>Cancel</button>
            </div>
          </div>
        )}

        {showAddPopup && (
          <div className="popup21">
            <div className="popup1-content2">
              <h2>Department Name</h2>
              <input className="depname" type="text" placeholder="Enter department name"/>
              <button className="add" onClick={handleAdd}>Add</button>
              <button className="cancel2" onClick={() => setShowAddPopup(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DepMan;
