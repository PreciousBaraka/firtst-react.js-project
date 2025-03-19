import React from 'react'
import './index.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element= {<Login/>} />
        <Route path='/' element= {<Home/>} />
        <Route path='/register' element= {<Register/>} />
      </Routes>
    </Router>
  )
}

export default App
