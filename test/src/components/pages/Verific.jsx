import Nav from './Nav'
import './Verific.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Verific() {

  const [code, setCode] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const uid = location.state?.uid;
  
  

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://localhost:3000/codeverfifer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id: uid, code}),
        
      });
      
      if (response.ok) {
         navigate('/Reset',{ state : {uid} }); 
      } else {
        alert("Wrong Code !")
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  return (
    <>
    <Nav />
    <div className='container5'>
      <div className='holder5'>
        Verification
      </div>
      <div className='input5'>
        <form onSubmit={handleSubmit}>
            Put the Verification code: <br /><br />
            <input  onChange={(e)=>{setCode(e.target.value)}} type="text" placeholder='Put the code here !'/><br /><br />
          <button type="submit" className='button5'>Submit</button>
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

export default Verific