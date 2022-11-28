import React from 'react'
import '../Variants/style.css'
import { TbCurrencyPound } from 'react-icons/tb'

export default function Variants({variants, setSizeData}) {
  return (
    <>
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
    </>
  )
}
