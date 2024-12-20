import { useState } from 'react'
import Nav from './Nav'
import { useNavigate } from 'react-router-dom';
import './Signin.css'

function Signin() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        if (email === 'admin@example.com') { 
          navigate('/Admin'); 
        };
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.error);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <>
    <Nav />
    <div className='container'>
      <div className='holder'>
        Log In
      </div>
      <div className='input'>
        <form onSubmit={handleSubmit}>
          Email: <br />
          <input required onChange={(e)=>{setEmail(e.target.value)}} type="email"  placeholder='Put your email'/><br /><br />
          Password : <br />
          <input required onChange={(e)=>{setPassword(e.target.value)}} type="password"  placeholder='Put your password'/><br />
          <a href="forget">Forget Password ?</a><br /><br />
          <button type="submit" className='button'>Submit</button>
          <p className='small'>You don`t have an account ? <a href="Signup">Create One</a></p> 
        </form>
      </div>
    </div>
    <br />
    <div className="footer">
        <div className='line'>
        </div>
        <div>
          <p>Our E-mail: DevOur.TeamUp@Gmail.com</p>
          <p id='right'>Powered By Devour</p>
          <p>Phone Number: +216 565695233</p>
        </div>
    </div>
    </> 
  )
}

export default Signin