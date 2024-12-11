import Nav from './Nav'
import './Forget.css'

function Forget() {

  return (
    <>
    <Nav/>
    <div className='container3'>
      <div className='holder3'>
        Forget Password
      </div>
      <div className='input3'>
        <form action="">
            E-mail: <br /><br />
            <input type="email" placeholder='Put your email'/><br /><br />
          <button type="submit" className='button3'>Send Reset Link</button>
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