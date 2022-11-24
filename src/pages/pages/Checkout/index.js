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
          <Header />
          {toggle
            ? <>
            <div className='pop-left'>
              <div className='pop-left-header'>
                <h1>Confirm Order</h1>
                <img src={thumb} className='img-fluid' />
              </div>
              <div className='content'>
                <p>By placing this order you<br/>agree that you are present in<br/>Kings Arms and over 18 years<br/>old.</p>
                <div className='button-controls'>
                  <button className='btn btnCancel' onClick={() => setToggle(false)}>Cancel</button>
                  <button className='btn btnPlaceOrder'>Place Order</button>
                </div>
              </div>
            </div>
          </>
            : ''}
          <div className='row product-details'>
              {checkoutData.map((value, index) => {
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
                    {value.name}
                    </h5>
                    <div className='col-lg-6 details'>
                      <h6>{value.qnty} x {value.pop.name}</h6>
                      <p>{value.sizeData.name} {value.checkbox.name}</p>
                    </div>
                    <div className='col-lg-6 price'>
                      <p>{value.sizeData.price}</p>
                    </div>
                  </React.Fragment>
                )
              })}
              {/* <div className='col-lg-6'>
              {sizeData.state.cart.data.map((data, index) => {
                return (
                  <>
                    <p>{data.name}</p>
                    <p>{data.price}</p>
                  </>
                )
              })}
            </div>
            {/* <div className='col-lg-6 price'>
              <p><TbCurrencyPound /> 8.40</p>
            </div> */}
          </div>
          {/* <div className='row product-details mt-2'>
            <div className='col-lg-6 details'>
              <h6>1 x Carlsberg</h6>
              <p>{sizeData.state.cart.pop.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    {data.name}
                  </React.Fragment>
                )
              })}</p>
            </div>
            <div className='col-lg-6 price'>
              <p><TbCurrencyPound /> {sizeData.state.sizeData.price}</p>
            </div>
          </div> */}
          <span className='underline'></span>
          <div className='addNotes'>
            <h5>Add notes:</h5>
            <textarea className='form-control' rows={5}></textarea>
          </div>
      </div>
      <div className='footer' onClick={(e) => ConfirmOrder(e)}>
        <p>Confirm Order</p>
        <p><TbCurrencyPound />/ Items</p>
      </div>
    </div>
  )
}
