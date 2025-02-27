import React from 'react'
import Navbar from '../Navbar'
import FilterProducts from './FilterProducts'
import FilterSlider from './FilterSlider'

function Filter() {
  return (
    <div>
        <Navbar/>
        <FilterSlider/>
        <FilterProducts/>
    </div>
  )
}

export default Filter