/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import '../Checkout/style.css'
import Header from '../../shared/components/Header'
import { MdArrowBackIosNew } from 'react-icons/md'
import { HiDotsHorizontal } from 'react-icons/hi'
import { TbCurrencyPound } from 'react-icons/tb'
import thumb from '../../assets/images/thumb.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DropDown from '../../shared/components/DropDown'
import translate from '../../i18n/translate'

export default function Checkout () {
  const [toggle, setToggle] = useState(false)
  // const [tempArray, setTempArray] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItem, setTotalItem] = useState(0)
  const [tableNumber, setTableNumber] = useState(null)

  const checkoutData = useSelector((state) => state.allCart.cart)
  // console.log('checkoutData :>> ', checkoutData)
  const navigate = useNavigate()

  const ConfirmOrder = (e) => {
    setToggle(true)
  }

  const handleGoBack = (e) => {
    e.preventDefault()
    navigate('/')
  }

  useEffect(() => {
    // total price
    const totalSum = checkoutData.length !== 0 ? checkoutData.map((data) => data.sum) : ''
    const totalPrice = totalSum.length !== 0 ? totalSum.reduce((a, b) => a + b) : ''
    setTotalPrice(totalPrice)

    // total items
    const countItem = checkoutData.length !== 0 ? checkoutData.map((data) => data.itemCount) : ''
    const totalItem = countItem.length !== 0 ? countItem.reduce((a, b) => a + b) : ''
    setTotalItem(totalItem)

    // random number
    if (checkoutData.length !== 0) {
      const tableNumber = Math.floor(Math.random() * 50) + 10
      setTableNumber(tableNumber)
    } else {
      setTableNumber('!')
    }
  }, [totalPrice, totalItem, checkoutData])

  const handlePlaceOrder = (e) => {
    if (checkoutData.length !== 0) {
      alert('Bill\n------------------------------------\n\nQuatity : ' +totalItem+'\nGrand Total : ' + totalPrice)
    } else {
      alert('You have not selected any item.')
    }
  }

  return (
    <div className='checkout-main'>
      <div className='main-content'>
        <div className='row mt-2'>
          <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 goBack' onClick={(e) => handleGoBack(e)}><MdArrowBackIosNew /></div>
          <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 header'>
            <h1>{translate('checkout')}</h1>
          </div>
          <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 option'><button className='btn btn-sm'><HiDotsHorizontal /></button></div>
        </div>
        <div className='hotel row'>
          <div className='col-lg-12 hotel-name'>
            <h5>{translate('checkoutAddress')}</h5>
          </div>
          <div className='col-lg-12 hotel-address'>
          <p>{translate('restaurantAddress', {break: <br />})}</p>
          </div>
        </div>
        <div className='row product-details'>
            {checkoutData.length !== 0 ? checkoutData?.map((value, index) => {
              // console.log('value >> ', value)
              return (
                <React.Fragment key={index}>
                  <h5 className='mt-2'>
                    {value.name} ({value.itemCount})
                  </h5>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 details'>
                    <h6>{value.qnty} x {value.popUpDetails.name}</h6>
                    <p>{value.sizeData.name}, {value.optionData.map((data, index) => <span key={index}>{data.name.concat(' ')}</span>)}</p>
                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 price'>
                    <p><TbCurrencyPound /> {value.sum}</p>
                  </div>
                </React.Fragment>
              )
            }) : <h5 className='text-center empty'>Your cart is empty</h5>}
        </div>
        {toggle
          ? <>
              <div className='pop-left'>
                <div className='pop-left-header'>
                  <h1>{translate('confirmOrder')}</h1>
                  <img src={thumb} className='img-fluid' alt='' />
                </div>
                <div className='content'>
                  <p>{translate('confirmMessage', {break: <br />})}</p>
                  <div className='button-controls'>
                    <button className='btn btnCancel' onClick={() => setToggle(false)}>{translate('cancel')}</button>
                    <button className='btn btnPlaceOrder' onClick={(e) => handlePlaceOrder(e)}>{translate('placeOrder')}</button>
                  </div>
                </div>
              </div>
            </>
          : ''}
        <span className='underline'></span>
        <div className='addNotes'>
          <h5>{translate('addNotes')}:</h5>
          <textarea className='form-control' rows={5}></textarea>
        </div>
        <span className='underline'></span>
        <div className='table row'>
          <div className='col-lg-9 table-name'>
            <h5>{translate('tableNumber')}</h5>
          </div>
          <div className='col-lg-3 table-number'>
            <button className='btn'>{tableNumber}</button>
          </div>
        </div>
      </div>
      <div className='footer' onClick={(e) => ConfirmOrder(e)}>
        <p>{translate('confirmOrder')}</p>
        <p><TbCurrencyPound /> {totalPrice}/ {totalItem} {translate('items')}</p>
      </div>
    </div>
  )
}
