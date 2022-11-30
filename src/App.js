import React from 'react'
import '../src/assets/css/main.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainContent from './pages/MainContent'
import Checkout from './pages/Checkout'
import LoadingScreen from './shared/components/LoadingScreen'
import DropDown from './shared/components/DropDown'

function App () {
  return (
    <div className="App shadow">
      <Router>
        <Routes>
          <Route path='/' element={<MainContent />}/>
          <Route path='/loading' element={<LoadingScreen />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/option' element={<DropDown />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
