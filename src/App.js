import React, { createContext, useContext, useState } from 'react'
import '../src/assets/css/main.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainContent from './pages/MainContent'
import Checkout from './pages/Checkout'
import LoadingScreen from './shared/components/LoadingScreen'
import DropDown from './shared/components/DropDown'
import { I18NProvider, LOCALES } from './i18n'

export const LangContext = createContext()
function App () {
    // state for internationalization
    const [locale, setLocale] = useState(LOCALES.ENGLISH)


  return (
    <I18NProvider locale={locale}>
      <LangContext.Provider value={{ lang: setLocale}}>
      <div className="App shadow">  
        <DropDown />
        <Router>
          <Routes>
            <Route path='/' element={<MainContent />}/>
            <Route path='/loading' element={<LoadingScreen />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/checkout/option' element={<DropDown />} />
          </Routes>
        </Router>
      </div>
      </LangContext.Provider>
    </I18NProvider>
  )
}

export default App
