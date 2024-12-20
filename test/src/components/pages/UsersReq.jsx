import React, { useState } from "react";
import "./Usersreq.css";

function Usersreq() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <>
    <div className="everything">
      <div className="all1">
        <div className="lbarani">

          <div className="header-container">
            <h1 className="title">Admin</h1>
            <div className="floaty">
              <a href="#">Users requests</a>
              <a href="admin">Users List</a>
              <a href="departemnet">Department management</a>
            </div>
            <div className="floatyOkhra">
              <a href="#">Log Out</a>
            </div>
          </div>

          <div className="divider"></div>

          <div className="onwen">
            <h2>Users Requests</h2>
          </div>

          <div className="lak7el">
            <input className="search-bar" type="text" placeholder="Search"/>
            <div className="member">
              <span>Member 1</span>
              <div>
                <button className="button111" style={{ backgroundColor: "green" }}>✔</button>
                <button className="button2" style={{ backgroundColor: "red" }} onClick={showPopup}>✘</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>Delete request?</h2>
            <button className="yes" onClick={hidePopup}>
              Yes
            </button>
            <button className="cancel" onClick={hidePopup}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Usersreq;
