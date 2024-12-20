import Nav from './Nav'
import './Signup.css'
import { useState } from 'react'

function Sign() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setFname] = useState(null);
  const [lastName, setLname] = useState(null);
  const [number, setTel] = useState(null);
  const [Cpass, setCpass] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {

      if(password != Cpass){
        console.log('Password is Wrong');
        alert("Password is wrong !")
        console.error('Password is wrong !');
        return
      }

      const response = await fetch('http://localhost:3000/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, lastName, email, number, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('SignUp successful:', data);
        window.location.href = '/Signin';
      } else {
        const errorData = await response.json();
        console.error('SignUp:', errorData.error);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }

  };

  return (
    <>
    <Nav />
    <div className='container2'>
      <div className='holder2'>
        Create Account
      </div>
      <div className='input2'>
        <form onSubmit={handleSubmit}>
          <table>
            <tr>
                <td><input required onChange={(e)=>{setFname(e.target.value)}} type="text" placeholder='First Name'/></td>
                <td><input required onChange={(e)=>{setLname(e.target.value)}} type="text" placeholder='Last Name'/></td>
            </tr>
            <tr>
                <td><input required onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder='E-mail'/></td>
                <td><input required onChange={(e)=>{setTel(e.target.value)}} type="text" placeholder='tel'/></td>
            </tr>
            <tr>
                <td><input required onChange={(e)=>{setPassword(e.target.value)}} type="Password" placeholder='Password'/></td>
                <td><input required onChange={(e)=>{setCpass(e.target.value)}} type="Password" placeholder='Confirm Password'/></td>
            </tr>
          </table><br />
          <button type="submit" className='button2'>Submit</button>
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

export default Sign