import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <span className='nav-span'> <Link to={'/phone'}> Phone</Link></span>
        <span className='nav-span'> <Link to={'/email'}> Email</Link></span>
        <span className='nav-span'> <Link to={'/pincode'}> Pincode</Link></span>
        <span className='nav-span'> <Link to={'/aadhar'}> Aadhar</Link></span>



    </div>
  )
}

export default Navbar
