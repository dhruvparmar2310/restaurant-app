/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react'
import Header from '../../shared/components/Header'
import '../MainContent/style.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import MainApi from '../../shared/utils/api'
import LoadingScreen from '../../shared/components/LoadingScreen'

// import action
import { getCategory, getProduct, setCart } from '../../states/Action'

// import i18nProvider
import { I18NProvider, LOCALES } from '../../i18n'
import { FormattedMessage } from 'react-intl'
import translate from '../../i18n/translate'
import { HiDotsHorizontal } from 'react-icons/hi'

export default function MainContent () {
  const [name, setName] = useState([])
  const [id, setID] = useState(null)
  const [catId, setCatId] = useState(1)
  const [categories, setCategories] = useState([])
  const [filterCategory, setFilterCategory] = useState([])

  const [products, setProducts] = useState([])
  const [productId, setProductId] = useState(null)
  const [proId, setProId] = useState(7)
  const [filterProduct, setFilterProduct] = useState([])

  const [toggle, setToggle] = useState(false)
  const [popUpDetails, setPopUpDetails] = useState([])
  const [variants, setVariants] = useState([])
  const [extra, setExtra] = useState([])

  const [sizeData, setSizeData] = useState([])
  const [optionData, setOptionData] = useState([])
  const [optionTotal, setOptionTotal] = useState(0)

  const [quantity, setQuantity] = useState(0)

  const [total, setTotal] = useState(0)
  const [defaultData, setDefaultData] = useState({})

  const [isActive, setIsActive] = useState(id)
  const [isProductActive, setIsProductActive] = useState(productId)
  const [isSizeActive, setIsSizeActive] = useState(sizeData)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // const categoryData = useSelector((state) => state.allCategory.categories)
  // console.log('data :>> ', categoryData)

  // const productData = useSelector((state) => state.allProduct.products)
  // // console.log('data :>> ', productData)

  const cartData = useSelector((state) => state.allCart.cart)

  const getCategories = async () => {
    setIsLoading(true)
    const response = await MainApi.get('/categories')
      .then((res) => {
        setCategories(res.data)
      }).catch((err) => {
        console.log('err :>> ', err)
      }).finally(() => {
        setIsLoading(false)
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
      // console.log('checkbox :>> ', sumCheckbox)

      sum = (sumCheckbox + sizeData.price) * quantity
      // console.log('sum :>> ', sum)
      setTotal([sum])
    } else if ((optionData.length === 0 && sizeData.length === 0) && quantity >= 1) {
      sum = popUpDetails.price * quantity
      setTotal([sum])
    } else if ((optionData.length === 0 && sizeData.length !== 0) && quantity >= 1) {
      sum = sizeData.price * quantity
      setTotal([sum])
    } 
    if ((optionData.length !== 0 && sizeData.length === 0) && quantity >= 1) {
      const checkbox = optionData.map((data) => data.price)
      const sumCheckbox = checkbox.reduce((a, b) => a + b)
      // console.log('checkbox :>> ', sumCheckbox)

      sum = (popUpDetails.price + sumCheckbox) * quantity
      // console.log('sum :>> ', sum)
      setTotal([sum])
    }
    setToggle(false)

    // console.log('total :>> ', total)
    const cart = setCart(sizeData, popUpDetails, optionData, name, filterProduct, sum, id, quantity, quantity, productId)
    if (quantity > 0) {
      dispatch(cart)
    } else {
      alert('Please select atleast one product')
    }
  }
  // console.log('cartData :>> ', cartData)

  // onclick function for main menu who don't have parent
  const handleClick = (data, index) => {
    if (data) {
      const id = data.id
      setID(id)
      setIsActive(id)
      setCatId(id)

      const filter = categories.filter((data) => {
        return id === data.parent
      })
      setFilterCategory(filter)
      setDefaultData(filter[0])
      setName([data.name])
    } else {
      
    }
  }

  // function for the sub menu
  const handleSubCategory = (data) => {
    if (data) {
      const id = data.id
      setProductId(id)
      setIsProductActive(id)
      setProId(id)
      
      const productsItem = products.filter((data) => data ? data.parentId === id : alert('No'))
      setFilterProduct(productsItem)

      setTotal(0)
      setQuantity(0)
    }
  }

  useEffect(() => {
    handleClick({ id: catId, name: 'DRINKS' })
    // handleSubCategory({id: 7, name: 'Beers', parent: 1})
    handleSubCategory({ id: proId })
  }, [categories, products])

  useEffect(() => {
    if (defaultData) {
      const newData = defaultData.id
      handleSubCategory({ id: newData })
    }
  }, [filterCategory])

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

  // function for radio button
  const handleSizeData = (data) => {
    if (data) {
      setSizeData(data)
      setIsSizeActive(data)
    }
  }

  // useEffect(() => {
  //   handleSizeData({name: 'half pint', price: 6.5})
  // }, [])

  // function for checkboxs
  const handleOptionData = (e, data, index) => {
    const { checked } = e.target

    const id = index

    if (checked) {
      setOptionData((a) => [...a, data])
    } else {
      const filter = optionData.filter((e) => e !== data)
      setOptionData(filter)
    }
  }

  // function for Add To Order
  const handleAddToOrder = (e, data) => {
    const prevQty = data
    setToggle(false)
  }
  return (
    
      <div className='main'>
        {isLoading ? <LoadingScreen />  :
        <>
          <div className='main-content' id='main-content'>
              <div className='main-header' onClick={() => setToggle(false)}>
                <Header />
              </div>
              <div className='inner-content'>
                <div className='categories' onClick={() => setToggle(false)}>
                  {categories?.map((data, index) => {
                    return (
                      <React.Fragment key={index}>
                        {data.parent === null ? <button className={isActive === categories[index].id ? 'btn btn-sm active' : 'btn btn-sm'} onClick={(e) => handleClick(data)}>{data.name}</button> : ''}
                      </React.Fragment>
                    )
                  })}
                </div>
                <div className='sub-category' onClick={() => setToggle(false)}>
                  {filterCategory.length !== 0
                    ? filterCategory?.map((data, index) => <React.Fragment key={index}>
                      <button className={isProductActive === filterCategory[index].id ? 'btn btn-sm active' : 'btn btn-sm'} onClick={(e) => handleSubCategory(data)}>{data.name}</button>
                    </React.Fragment>
                    )
                    : <p id='loading'>Loading...</p>}
                </div>
                <div className='menu'>
                  {filterProduct.length !== 0
                    ? filterProduct.map((data, index) => <React.Fragment key={index}>
                      <div className='menu-item' onClick={(e) => handleMenu(data)}>
                        <div className='item-content'>
                          <h1>{data.name}</h1>
                          <p>{data.description}</p>
                        </div>
                        <div className='item-price'>
                          <p>£{data.price}</p>
                        </div>
                      </div>
                    </React.Fragment>
                    )
                    : <p id='NoData'>No Data</p>}
                </div>
              </div>
          </div>
          <div className='footer' onClick={(e) => handleViewOrder(e)}>
            {/* <p>View Basket</p> */}
            {/* <FormattedMessage id='viewBasket' /> */}
            <p>{translate('viewBasket')}</p>
            <p>£ {total}/ {quantity} {translate('items')}</p>
          </div>
        </> }
          {toggle
            ? <>
              <div className='pop-up'>
                <div className='pop-up-header row'>
                  <h1 className='col-lg-9 col-md-9 col-sm-9 col-xs-9'>
                    {popUpDetails.name}
                  </h1>
                  <button onClick={() => setToggle(false)} className='btn close col-lg-3 col-md-3 col-sm-3 col-xs-3'>X</button>
                </div>
                  {/* <Variants variants={variants} setSizeData={setSizeData} /> */}
                  {variants
                    ? <>
                        <h1>{translate('size')}</h1>
                        <div className='variants'>
                        {variants.map((data, index) => {
                        return (
                        <React.Fragment key={index}>
                            <div className={isSizeActive === variants[index] ? 'inner-content row active' : 'inner-content row'} onClick={(e) => handleSizeData(data)}>
                              <span className='col-lg-6 col-md-6 col-sm-6 col-xs-6'>{data.name}</span>
                              <span className='col-lg-6 col-md-6 col-sm-6 col-xs-6 size-price'>£ {data.price}</span>
                            </div>
                        </React.Fragment>
                        )
                        })}
                        </div>
                    </>
                    : <></>}
                  {extra
                    ? <>
                        <h1 className='mt-3'>{translate('selectOptions')}</h1>
                        <div className='extra mt-2'>
                          {extra.map((data, index) => {
                            return (
                              <React.Fragment key={index}>
                                <label className='inner-content row' id={index}>
                                  <span className='col-lg-9 col-md-9 col-sm-9 col-xs-9'>{data.name} (+ £ {data.price})</span>
                                  <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 checkbox-list'>
                                    <input className='form-check-input' value={data} type='checkbox' onClick={(e) => handleOptionData(e, data, index)} />
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
                <button className='addOrder mt-3 btn' onClick={() => handlecart(sizeData, popUpDetails, optionData, name, filterProduct, quantity)}>{translate('addToOrder')}</button>
              </div>
              </>
            : ''}
      </div>
  )
}
