import Nav from './Nav'
import './Reset.css'

function Reset() {

  return (
    <>
    <Nav />
    <div className='container4'>
      <div className='holder4'>
        Reset Password
      </div>
      <div className='input4'>
        <form action="">
            New Password: <br />
            <input type="password" placeholder='Put your new password'/><br /><br />
            Confirm Password: <br />
            <input type="password" placeholder='confirm your new password'/><br /><br />
          <button type="submit" className='button4'>Reset Password</button>
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

export default Reset