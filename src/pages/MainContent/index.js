/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../shared/components/Header'
import '../MainContent/style.css'
import { TbCurrencyPound } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MainApi from '../../shared/utils/api'

// import action
import { getCategory, getProduct, setCart } from '../../states/Action'
import Variants from '../../shared/components/Variants'

export default function MainContent () {
  const [name, setName] = useState([])
  const [id, setID] = useState(null)
  const [categories, setCategories] = useState([])
  const [filterCategory, setFilterCategory] = useState([])

  const [products, setProducts] = useState([])
  const [filterProduct, setFilterProduct] = useState([])

  const [toggle, setToggle] = useState(false)
  const [popUpDetails, setPopUpDetails] = useState([])
  const [variants, setVariants] = useState([])
  const [extra, setExtra] = useState([])

  const [sizeData, setSizeData] = useState([])
  const [optionData, setOptionData] = useState([])
  const [optionTotal, setOptionTotal] = useState(0)

  const [quantity, setQuantity] = useState(0)
  const [sumQuantity, setSumQuantity] = useState(0)

  const [total, setTotal] = useState(0)
  const [defaultData, setDefaultData] = useState()

  const [isActive, setIsActive] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const categoryData = useSelector((state) => state.allCategory.categories)
  // console.log('data :>> ', categoryData)

  // const productData = useSelector((state) => state.allProduct.products)
  // // console.log('data :>> ', productData)

  const cartData = useSelector((state) => state.allCart.cart)

  const getCategories = async () => {
    const response = await MainApi.get('/categories')
      .then((res) => {
        setCategories(res.data)
      }).catch((err) => {
        console.log('err :>> ', err)
      })
  }

  const getProducts = async () => {
    const response = await MainApi.get('/products')
      .then((res) => {
        setProducts(res.data)
      }).catch((err) => {
        console.log('err :>> ', err)
      })
  }

  useEffect(() => {
    getCategories()
    getProducts()
  }, [])

  let sum = 0
  const handlecart = (sizeData, popUpDetails, optionData, name, filterProduct, quantity) => {
    if ((optionData.length !== 0 && sizeData !== []) && quantity >= 1) {
      const checkbox = optionData.map((data) => data.price)
      const sumCheckbox = checkbox.reduce((a, b) => a + b)
      console.log('checkbox :>> ', sumCheckbox)

      sum = (sumCheckbox + sizeData.price) * quantity
      console.log('sum :>> ', sum)
      setTotal([sum])
    } else if ((optionData.length === 0 && sizeData.length === 0) && quantity >= 1) {
      sum = popUpDetails.price * quantity
      setTotal([sum])
    } else if ((optionData.length === 0 && sizeData.length !== 0) && quantity >= 1) {
      sum = sizeData.price * quantity
      setTotal([sum])
    }
    setToggle(false)

    console.log('total :>> ', total)
    const cart = setCart(sizeData, popUpDetails, optionData, name, filterProduct, sum, id, quantity, quantity)
    // if (cart.payload) {
    //   // if (cart.payload.popUpDetails.id === popUpDetails.id && cart.payload.filterProduct[0].name === popUpDetails.name && cart.payload.sizeData.name === sizeData.name) {
    //   //   setCart(sizeData, popUpDetails, optionData, name, filterProduct, setQuantity(quantity += 1), sum += sum)
    //   //   // console.log(cart)
    //   //   dispatch(cart)
    //   // } else {
    //   //   setCart(sizeData, popUpDetails, optionData, name, filterProduct, quantity, sum += sum)
    //   //   dispatch(cart)
    //   // }
    //   setCart(sizeData, popUpDetails, optionData, name, filterProduct, setQuantity(quantity += 1), sum += sum)
    //   dispatch(cart)
    // } else {
    //   dispatch(cart)
    // }
    dispatch(cart)
  }
  console.log('cartData :>> ', cartData)

  // onclick function for main menu who don't have parent
  const handleClick = (data, index) => {
    if (data) {
      const id = data.id
      setID(id)

      const filter = categories.filter((data) => {
        return id === data.parent
      })
      setFilterCategory(filter)
      setName([data.name])
    } else {
      
    }
  }
  console.log('default >> ', defaultData)

  // function for the sub menu
  const handleSubCategory = (data) => {
    console.log('data >> ', data)
    const id = data.id

    const productsItem = products.filter((data) => data ? data.parentId === id : alert('No'))
    setFilterProduct(productsItem)
  }

  useEffect(() => {
    handleClick({id: 1, name: 'DRINKS', parent: null})
    handleSubCategory({id: 7, name: 'Beers', parent: 1})
  }, [categories, products])


  // function for pop-up screen
  const handleMenu = (data) => {
    setToggle(true)
    setPopUpDetails(data)

    const variants = data.variants

    const extra = data.extras
    setExtra(extra)
    setVariants(variants)
  }

  const handleViewOrder = () => {
    navigate('/checkout')
  }

  // Decrement function
  const handleDecrement = (e) => {
    if (quantity <= 1) {
      alert('Sorry! You cannot buy zero Quanty. if you not want to buy than close the toggle.')
    } else {
      setQuantity(quantity - 1)
    }
  }

  // function for checkboxs
  const handleChange = (e, data, index) => {
    const { value, checked } = e.target

    const id = index

    if (checked) {
      setOptionData((prevState) => [...prevState, data])

      // const sum = optionData.reduce((a, b) => a + b, 0.75)
      // console.log('sum :>> ', sum)
      // setOptionTotal(sum)
    } else {
      const filter = optionData.filter((e) => e !== data)
      setOptionData(filter)
    }
  }

  // function for Add To Order
  const handleAddToOrder = (e, data) => {
    const prevQty = data
    setSumQuantity(prevQty)
    setToggle(false)
  }

  return (
    <div className='main'>
      <div className='main-content' id='main-content'>
        <div onClick={() => setToggle(false)}>
          <Header />
        </div>
          <div className='inner-content'>
              <div className='categories' onClick={() => setToggle(false)}>
                  {categories?.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                          {data.parent === null ? <button className={isActive === 1 ? 'btn btn-sm active' : 'btn btn-sm'} onClick={(e) => handleClick(data)}>{data.name}</button> : ''}
                      </React.Fragment>
                    )
                  })}
              </div>
              <div className='sub-category' onClick={() => setToggle(false)}>
              {filterCategory.length !== 0
                ? filterCategory?.map((data, index) =>
                  <React.Fragment key={index}>
                      <button className='btn btn-sm' onClick={(e) => handleSubCategory(data)}>{data.name}</button>
                  </React.Fragment>
                )
              : 'No Category Data'}
              </div>
              <div className='menu'>
                {filterProduct.length !== 0
                  ? filterProduct.map((data, index) =>
                  <React.Fragment key={index}>
                    <div className='menu-item' onClick={(e) => handleMenu(data)}>
                      <div className='item-content'>
                        <h1>{data.name}</h1>
                        <p>{data.description}</p>
                      </div>
                      <div className='item-price'>
                        <p><TbCurrencyPound />{data.price}</p>
                      </div>
                    </div>
                  </React.Fragment>
                  )
                : 'No Data'}
              </div>
          </div>
      </div>
      <div className='footer' onClick={(e) => handleViewOrder(e)}>
        <p>View Basket</p>
        <p><TbCurrencyPound /> {total}/ {quantity} Items</p>
      </div>
        {toggle
          ? <>
            <div className='pop-up'>
              <div className='pop-up-header row'>
                <h1 className='col-lg-9'>
                  {popUpDetails.name}
                </h1>
                <button onClick={() => setToggle(false)} className='btn close col-lg-3'>X</button>
              </div>
                <Variants variants={variants} setSizeData={setSizeData} />
                {extra
                  ? <>
                      <h1 className='mt-3'>Select Options</h1>
                      <div className='extra mt-2'>
                        {extra.map((data, index) => {
                          return (
                            <React.Fragment key={index}>
                              <label className='inner-content row' id={index}>
                                <span className='col-lg-9'>{data.name} (+ <TbCurrencyPound />{data.price})</span>
                                <div className='col-lg-3 checkbox-list'>
                                  <input className='form-check-input' value={data} type='checkbox' onChange={(e) => handleChange(e, data, index)} />
                                </div>
                              </label>
                            </React.Fragment>
                          )
                        })}
                      </div>
                    </>
                  : <></>}
              <div className='button-controls mt-4'>
                <button className='btn' onClick={(e) => handleDecrement(e)}>-</button>
                <span className='form-control'>{quantity}</span>
                <button className='btn' onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className='addOrder mt-3 btn' onClick={() => handlecart(sizeData, popUpDetails, optionData, name, filterProduct, quantity)}>Add to Order</button>
            </div>
            </>
          : ''}
    </div>
  )
}
