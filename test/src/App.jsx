import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Forget from './components/pages/Forget';
import Reset from './components/pages/Reset';
import Verific from './components/pages/Verific';
import Home from './components/pages/Home';
import Signin from './components/pages/Signin';
import Signup from './components/pages/Signup';
import Admin from './components/pages/Admin';
import EditUser from './components/pages/EditUser';


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/verifi" element={<Verific />} />
          <Route path="/admin" element={<Admin />}/>
          <Route path="/editUser" element={<EditUser/>}/>
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
