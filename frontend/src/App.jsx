import { useState } from 'react';
import { Route,Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Verify from '../src/pages/Verify'
import Home from './pages/Home';
import Pincode from './pages/Pincode';
import Phone from './pages/Phone';
import VerifyPhone from './pages/VerifyPhone';
import Aadhar from './pages/Aadhar';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/phone' element={<Phone />} />
        <Route exact path='/aadhar' element={<Aadhar />} />
        <Route exact path='/verify-phone' element={<VerifyPhone />} />
        <Route exact path='/pincode' element={<Pincode />} />
        <Route exact path='/getotp' element={<Verify />} />
        <Route exact path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App
