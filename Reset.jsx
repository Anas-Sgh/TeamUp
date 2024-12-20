import Nav from './Nav';
import './Reset.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Reset() {
  const navigate = useNavigate();
  const location = useLocation();
  const uid = location.state?.uid;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: uid, password: newPassword }),
      });

      if (response.ok) {
        alert("Password reset successfully!");
        navigate("/Signin");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Nav />
      <div className='container4'>
        <div className='holder4'>Reset Password</div>
        <div className='input4'>
          <form onSubmit={handleSubmit}>
            New Password: <br />
            <input 
              type="password" 
              placeholder='Put your new password' 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
            /><br /><br />
            
            Confirm Password: <br />
            <input 
              type="password" 
              placeholder='Confirm your new password' 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            /><br />
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" className='button4'>Reset Password</button>
          </form>
        </div>
      </div>
      <br />
      <div className="footer">
        <div className='line'></div>
        <div>
          <p>Our E-mail: DevOur.TeamUp@Gmail.com</p>
          <p id='right'>Powered By Devour</p>
          <p>Phone Number: +216 565695233</p>
        </div>
      </div>
    </>
  );
}

export default Reset;
