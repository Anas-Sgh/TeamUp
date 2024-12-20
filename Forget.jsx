import Nav from './Nav'
import { useState } from 'react'
import './Forget.css'
import { useNavigate } from 'react-router-dom';

function Forget() {

  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost:3000/forget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email})
      });
      
      if (response.ok) {
        const data = await response.json();
        const uid = data.user.id;
        
        navigate('/verifi',{ state: { uid } });
        
      } else {
        alert("email Not Found !")
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };


  return (
    <>
    <Nav/>
    <div className='container3'>
      <div className='holder3'>
        Forget Password
      </div>
      <div className='input3'>
        <form onSubmit={handleSubmit}>
            E-mail: <br /><br />
            <input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder='Put your email'/><br /><br />
          <button type="submit" className='button3'>Send Reset Code</button>
          <p id="left">You dont have an account <a href="/signup">Create one</a></p>
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

export default Forget