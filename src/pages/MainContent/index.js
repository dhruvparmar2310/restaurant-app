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
import { Checkbox } from 'semantic-ui-react'

export default function MainContent () {
  const [name, setName] = useState([])
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
  const [updateSum, setUpdatetSum] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const categoryData = useSelector((state) => state.allCategory.categories)
  // console.log('data :>> ', categoryData)

  const productData = useSelector((state) => state.allProduct.products)
  // console.log('data :>> ', productData)

  const cartData = useSelector((state) => state.allCart.cart)

  const getCategories = async () => {
    const response = await MainApi.get('/categories')
      .then((res) => {
        setCategories(res.data)
      }).catch((err) => {
        console.log('err :>> ', err)
      })
    dispatch(getCategory(response.data))
  }

  const getProducts = async () => {
    const response = await MainApi.get('/products')
      .then((res) => {
        setProducts(res.data)
      }).catch((err) => {
        console.log('err :>> ', err)
      })
    dispatch(getProduct(response.data))
  }

  useEffect(() => {
    getCategories()
    getProducts()
  }, [total])
  let sum = 0
  const handlecart = (sizeData, popUpDetails, optionData, name, filterProduct, quantity) => {
    if ((optionData.length !== 0 && sizeData !== []) && quantity >= 1) {
      const checkbox = optionData.map((data) => data.price)
      const sumCheckbox = checkbox.reduce((a, b) => a + b)
      console.log('checkbox :>> ', sumCheckbox)

      sum = (sumCheckbox + sizeData.price) * quantity
      console.log('sum :>> ', sum)
      setTotal([sum])
    }
    setToggle(false)

    console.log('total :>> ', total)
    const cart = setCart(sizeData, popUpDetails, optionData, name, filterProduct, quantity, sum)
    if (cart.payload) {
      // if (cart.payload.id === popUpDetails.id && cart.payload.filterProduct[0].name === popUpDetails.name) {
      //   setQuantity(quantity += quantity)
      //   setCart(sizeData, popUpDetails, optionData, name, popUpDetails.id, filterProduct, quantity, total += total)
      //   // console.log(cart)
      //   dispatch(cart)
      // }
      dispatch(cart)
    } else {
      dispatch(cart)
    }
  }
  console.log('cartData :>> ', cartData)

  // onclick function for main menu who don't have parent
  const handleClick = (data, index) => {
    const id = data.id

    const filter = categories.filter((data) => {
      return id === data.parent
    })
    setFilterCategory(filter)
    setName([data.name])
    setQuantity(0)
  }

  // function for the sub menu
  const handleSubCategory = (data) => {
    const id = data.id

    const productsItem = products.filter((data) => data ? data.parentId === id : alert('No'))
    setFilterProduct(productsItem)
    setQuantity(0)
  }

  // function for pop-up screen
  const handleMenu = (data) => {
    setQuantity(0)
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
    console.log('id >> ', id)

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
          <Header />
          <div className='inner-content'>
              <div className='categories' onClick={() => setToggle(false)}>
                  {categories?.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                          {data.parent === null ? <button className='btn btn-sm' onClick={(e) => handleClick(data)}>{data.name}</button> : ''}
                      </React.Fragment>
                    )
                  })}
              </div>
              <div className='sub-category'>
              {filterCategory.length !== 0
                ? filterCategory?.map((data, index) =>
                  <React.Fragment key={index}>
                      <button className='btn btn-sm' onClick={(e) => handleSubCategory(data)}>{data.name}</button>
                  </React.Fragment>
                )
                : categories?.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                        {data.parent === 1 ? <button className='btn btn-sm' onClick={(e) => handleSubCategory(data)}>{data.name}</button> : ''}
                    </React.Fragment>
                  )
                })}
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
                  : products?.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        {data.parentId === 7
                          ? <div className='menu-item' onClick={(e) => handleMenu(data)}>
                              <div className='item-content'>
                                <h1>{data.name}</h1>
                                <p>{data.description}</p>
                              </div>
                              <div className='item-price'>
                                <p><TbCurrencyPound />{data.price}</p>
                              </div>
                            </div>
                          : ''}
                      </React.Fragment>
                    )
                  })}
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
                {variants
                  ? <>
                      <h1>Size</h1>
                      <div className='variants'>
                      {variants.map((data, index) => {
                        return (
                        <React.Fragment key={index}>
                          <label className='inner-content row'>
                            <input type='radio' name='size' value={data} onChange={(e) => setSizeData(data)} />
                            <span className='col-lg-6'>{data.name}</span>
                            <span className='col-lg-6 size-price'><TbCurrencyPound />{data.price}</span>
                          </label>
                        </React.Fragment>
                        )
                      })}
                      </div>
                    </>
                  : <></>}
                {extra
                  ? <>
                      <h1>Select Options</h1>
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
                <input type='text' className='form-control' value={quantity} />
                <button className='btn' onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className='addOrder mt-3 btn' onClick={() => handlecart(sizeData, popUpDetails, optionData, name, filterProduct, quantity)}>Add to Order</button>
            </div>
            </>
          : ''}
    </div>
  )
}
