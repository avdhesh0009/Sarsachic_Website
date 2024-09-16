import { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import './App.css'

function App() {

  return (
   <>

    <Link to='/dashboard'>    <div className="button-container">
    <button className="center-button">Go to DashBoard</button>  
    </div>
    </Link>
    <Toaster/>
    </>
  )
}

export default App
