import { useState } from 'react';
import { Route,Routes} from 'react-router-dom';
import Signup from './pages/Signup';
import Verify from '../src/pages/Verify'
import Home from './pages/Home';

function App() {
  

  return (
    <>
      <Routes>
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/getotp' element={<Verify />} />
        <Route exact path='/home' element={<Home />} />
      </Routes>
    </>
  )
}

export default App