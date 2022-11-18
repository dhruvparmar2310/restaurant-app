import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../shared/components/Header'
import '../MainContent/style.css'

export default function MainContent () {
  const [categories, setCategories] = useState([])
  const [filterCategory, setFilterCategory] = useState([])
  const [products, setProducts] = useState([])
  //   const [filterProduct, setFilterProduct] = useState([])

  const getCategories = () => {
    axios.get('https://6364ac837b209ece0f4b06db.mockapi.io/categories')
      .then((res) => {
        // console.log('Categories :>> ', res.data)
        setCategories(res.data)
      }).catch((err) => {
        console.log('err :>> ', err)
      })
  }

  const getProducts = () => {
    axios.get('https://6364ac837b209ece0f4b06db.mockapi.io/products')
      .then((res) => {
        // console.log('Products :>> ', res.data)
        setProducts(res.data)
      }).catch((err) => {
        console.log('err :>> ', err)
      })
  }

  useEffect(() => {
    getCategories()
    getProducts()
  }, [])

  const handleClick = (data) => {
    const id = data.id
    const parent = data.parent

    const categoryFilter = categories.filter((data) => {
      if (data.parent !== null) {
        const name = data.name
      }
      return true
    })
    setFilterCategory(categoryFilter)
    console.log('filterCategory :>> ', filterCategory)

    console.log('id >> ', id, parent)

    // const productsItem = products.filter((data) => data.parentId === id)
    // console.log('productsItem :>> ', productsItem)
    // setFilterProduct(productsItem)
    console.log('products >> ', products)
  }
  return (
    <div className='main-content'>
        <Header />
        <div className='inner-content'>
            <div className='categories'>
                {categories.map((data, index) => {
                  return (
                    <React.Fragment key={index}>
                        {data.parent === null ? <button className='btn btn-sm' onClick={(e) => handleClick(data)}>{data.name}</button> : ''}
                    </React.Fragment>
                  )
                })}
                {/* {
                    filterProduct.map((data, index) =>
                     <React.Fragment key={index}>
                        <div>
                            <h1>{data.name}</h1>
                        </div>
                     </React.Fragment>
                    )
                } */}
            </div>
            <div className='sub-category'>
            {filterCategory.map((data, index) =>
                <React.Fragment key={index}>
                    <button className='btn btn-sm'>{data.name}</button>
                </React.Fragment>
            )}
            </div>
        </div>
    </div>
  )
}
