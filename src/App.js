import React from 'react'
import '../src/assets/css/main.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainContent from './pages/MainContent'
import Checkout from './pages/Checkout'

function App () {
  return (
    <div className="App shadow">
      <Router>
        <Routes>
          <Route path='/' element={<MainContent />}/>
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
