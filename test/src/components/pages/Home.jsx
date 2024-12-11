import './Home.css'
import { Link } from 'react-router-dom';

function Home() {
 return (
    <>
    <body1>
    <Link to="/signin">
      <button className='topb'>Login</button>
    </Link>
      <h1 id='Bigl'>
        TeamUp
      </h1>
      <h1 id='sig'>
        Plan, Work, Collaborate
      </h1>
      <img src="/src/assets/Notes.png" alt="Notes photo" /><br />
      <div className='lorem'>
        <p>TeamUp is your ultimate collaboration and planning platform, designed to bring teams together and boost productivity. Whether you're organizing tasks, tracking progress, or managing projects, TeamUp empowers you to stay on top of your goals.<br/>
          <br/>  With intuitive tools for task management, team collaboration, and streamlined workflows, TeamUp ensures your team can focus on what matters most achieving success, together.
          <br/><br/> Let’s TeamUp and make work simpler, smarter, and more connected!</p>
      </div>
      <a href="/Signin"><button className='botb'>> Get Started</button></a>
      <div className="footer1">
        <div className='line'>
        </div>
        <div>
          <p>Our E-mail: DevOur.TeamUp@Gmail.com</p>
          <p id='right'>Powered By Devour</p>
          <p>Phone Number: +216 565695233</p>
        </div>
    </div>
    </body1>
    </> 
  )
}

export default Home