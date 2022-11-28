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

export default function Checkout () {
  const [toggle, setToggle] = useState(false)
  // const [tempArray, setTempArray] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalItem, setTotalItem] = useState(0)

  const checkoutData = useSelector((state) => state.allCart.cart)
  console.log('checkoutData :>> ', checkoutData)
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
  }, [totalPrice, totalItem, checkoutData])

  const handlePlaceOrder = (e) => {
    if (checkoutData.length !== 0) {
      alert('Order added Successfully')
    } else {
      alert('You have not selected any item.')
    }
  }

  return (
    <div className='checkout-main'>
      <div className='main-content'>
        <div className='row mt-2'>
          <div className='col-lg-3 goBack' onClick={(e) => handleGoBack(e)}><MdArrowBackIosNew /></div>
          <div className='col-lg-6'>
            <h1>Checkout</h1>
          </div>
          <div className='col-lg-3'><HiDotsHorizontal /></div>
        </div>
        <div className='hotel row'>
          <div className='col-lg-12 hotel-name'>
            <h5>Kempston Hammers Sports & Social Club</h5>
          </div>
          <div className='col-lg-12 hotel-address'>
          <p>134 High Street, Kempston, Bedford, <br/>Bedfordshine, MK42 7BN</p>
          </div>
        </div>
        <div className='row product-details'>
            {checkoutData.length !== 0 ? checkoutData?.map((value, index) => {
              console.log('value >> ', value)
              return (
                <React.Fragment key={index}>
                  <h5 className='mt-2'>
                  {/* {value.name.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        {data.name} ({data.id})
                      </React.Fragment>
                    )
                  })} */}
                  {value.name} ({value.itemCount})
                  </h5>
                  <div className='col-lg-6 details'>
                    <h6>{value.qnty} x {value.popUpDetails.name}</h6>
                    <p>{value.sizeData.name}, {value.optionData.map((data, index) => <span key={index}>{data.name.concat(' ')}</span>)}</p>
                  </div>
                  <div className='col-lg-6 price'>
                    <p><TbCurrencyPound /> {value.sum}</p>
                  </div>
                </React.Fragment>
              )
            }) : <h5 className='text-center'>Your cart is empty</h5>}
        </div>
        <span className='underline'></span>
        <div className='addNotes'>
          <h5>Add notes:</h5>
          <textarea className='form-control' rows={5}></textarea>
        </div>
        <span className='underline'></span>
        <div className='table row'>
          <div className='col-lg-9 table-name'>
            <h5>Table Number</h5>
          </div>
          <div className='col-lg-3'>
            <button className='btn'>32</button>
          </div>
        </div>
      </div>
      {toggle
            ? <>
                <div className='pop-left'>
                  <div className='pop-left-header'>
                    <h1>Confirm Order</h1>
                    <img src={thumb} className='img-fluid' alt='' />
                  </div>
                  <div className='content'>
                    <p>By placing this order you<br/>agree that you are present in<br/>Kings Arms and over 18 years<br/>old.</p>
                    <div className='button-controls'>
                      <button className='btn btnCancel' onClick={() => setToggle(false)}>Cancel</button>
                      <button className='btn btnPlaceOrder' onClick={(e) => handlePlaceOrder(e)}>Place Order</button>
                    </div>
                  </div>
                </div>
              </>
            : ''}
      <div className='footer' onClick={(e) => ConfirmOrder(e)}>
        <p>Confirm Order</p>
        <p><TbCurrencyPound /> {totalPrice}/ {totalItem} Items</p>
      </div>
    </div>
  )
}
