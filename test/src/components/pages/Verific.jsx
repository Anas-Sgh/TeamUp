import Nav from './Nav'
import './Verific.css'

function Verific() {

  return (
    <>
    <Nav />
    <div className='container5'>
      <div className='holder5'>
        Verification
      </div>
      <div className='input5'>
        <form action="">
            Put the Verification code: <br /><br />
            <input type="text" placeholder='Put the code here !'/><br /><br />
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