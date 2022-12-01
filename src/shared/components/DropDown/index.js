import React, { useContext, useEffect, useState } from 'react'
import { LOCALES } from '../../../i18n'
import { LangContext } from '../../../App'
import './style.css'

export default function DropDown() {
   const [selected, setSelected] = useState(LOCALES.ENGLISH)
   const useLang = useContext(LangContext)
   
   const handleLanguage = (e) => {
    setSelected(e.target.value)
  }
  localStorage.setItem('language', selected)
  useLang.lang(selected)

  return (
    <div className="dropdown">
      <button className="btn btn-sm dropbtn">...</button>
      <select className="dropdown-content" value={selected} onChange={(e)=> handleLanguage(e)}>
        <option value={LOCALES.ENGLISH}>English</option>
        <option value={LOCALES.GUJARATI}>Gujarati</option>
        <option value={LOCALES.HINDI}>Hindi</option>
      </select>
    </div>
  )
}
