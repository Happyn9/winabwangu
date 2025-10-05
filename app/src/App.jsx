import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import Transactions from './Pages/Transactions';
import Login from './Pages/Login';
import History from './Pages/History';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/' element ={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/History' element={<History />}></Route>
        <Route path='/transactions' element={<Transactions />}></Route>
      </Routes>
    </div>
  )
}

export default App