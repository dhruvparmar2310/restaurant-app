import React from 'react'
import glass from '../../../assets/images/glass.png'
import '../LoadingScreen/style.css'

function LoadingScreen () {
  return (
    <>
        <div className='loading-screen container'>
            <img src={glass} alt='Loading Screen' className='img-fluid' />
        </div>
    </>
  )
}

export default LoadingScreen

