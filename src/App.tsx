//import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Landing from './Components/Landing'
import Home from './Components/Home'
import Laptops from './Components/Laptops'


import Smartwatches from './Components/Smartwatches'
import Smartphones from './Components/Smartphones'
import Camera from './Components/Camera'
import BuyNow from './Components/BuyNow'


import Search from './Components/Search'
import Phonesearch from './Components/Phonesearch'
import Watchsearch from './Components/Watchsearch'
import Camerasearch from './Components/Camerasearch'
import SignUp from './Components/SignUp'
import Addtocart from './Components/Addtocart'

import { withAuthenticationRequired } from '@auth0/auth0-react';
import LogoutButton from './Components/LogoutButton'
import LoginButton from './Components/LoginButton'
import Profile from './Components/Profile'

const ProtectedRoute = ({ component, ...args } : any) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};




export default function App() {
  return (
    <BrowserRouter>
    <nav className="flex flex-row bg-blue-300 gap-10">
      <ul>
        <Link to="/"></Link>
      </ul>
      <ul>
        <Link to="/home" className="text-white font-bold">Home</Link>
      </ul>
      <ul>
        <Link to="/profile" className="text-white font-bold">Profile</Link>
      </ul>
      <ul>
        <Link to="/login" className="text-white font-bold">Login</Link>
      </ul>
      <ul>
        <Link to="/logout" className="text-white font-bold">Logout</Link>
      </ul>
      <ul>
        <Link to="/signup" className="text-white font-bold">SignUp</Link>
      </ul>
      

      








      <ul>
        <Link to="/laptop"></Link>
      </ul>
      <ul>
        <Link to="/phones"></Link>
      </ul>
      <ul>
        <Link to="/smartwatches"></Link>
      </ul>
      <ul>
        <Link to="/camera"></Link>
      </ul>
      <ul>
        <Link to="/cart/:id"></Link>
      </ul>
      <ul>
        <Link to="/buy/:id"></Link>
      </ul>
      

      
     
      

      
      

      
      
    </nav>
<hr/>


    <Routes>
    <Route path="/" element={<Landing/>} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/profile" element={<ProtectedRoute component={Profile} />} />
        <Route path="/login" element={<LoginButton />} />
        <Route path="/logout" element={<LogoutButton />} />
      
     
      <Route path='/laptop' element={<Laptops/>}/>
      <Route path='/phones' element={<Smartphones/>}/>
      <Route path='/smartwatches' element={<Smartwatches/>}/>
      <Route path='/camera' element={<Camera/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      
      <Route path='/search/:id' element={<Search/>}/>
      <Route path='/phone/search/:id' element={<Phonesearch/>}/>
      <Route path='/watches/search/:id' element={<Watchsearch/>}/>
      <Route path='/camera/search/:id' element={<Camerasearch/>}/>

      <Route path='/cart/:id' element={<Addtocart/>}/>
      <Route path='/buy/:id' element={<BuyNow/>}/>

      


      
      

     



   



    </Routes>
    </BrowserRouter>
  )
}
