import React from 'react'
import translate from '../../../i18n/translate'
import { HiDotsHorizontal } from 'react-icons/hi'
import './style.css'

export default function Header () {
  return (
    <>
      <div className='header'>
        {/* <h4>Kings Arms Cardington</h4> */}
        <h4>{translate('restaurantName')}</h4>
        <p>{translate('restaurantAddress', {break: <br />})}</p>
      </div>
    </>
  )
}
