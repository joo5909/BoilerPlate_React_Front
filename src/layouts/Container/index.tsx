import React from 'react'
import './style.css'
import Header from 'layouts/Header'
import Footer from 'layouts/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { AUTH_PATH } from 'constant'

function Container() {

  const {pathname} = useLocation();
  console.log(pathname);
  console.log(AUTH_PATH());
  return (
    <div>
        <Header/>
        <Outlet/>
        {!pathname.startsWith(AUTH_PATH()) && <Footer/>}       
    </div>
  )
}

export default Container