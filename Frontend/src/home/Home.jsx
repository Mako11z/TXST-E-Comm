import React from 'react'
import Banner from './Banner'
import HomeCategory from './HomeCategory'
import ShowByCategory from './ShowByCategory'
import Register from "./Register"
import Location from './Location'
import AdimPage from './AdimPage'
import AppSection from './AppSection'

//This is our home page

const Home = () => {
  return (
    <div>
        <Banner/>
        <HomeCategory/>
        <ShowByCategory/>
        <Register/>
        <Location/>
        {/* <AdimPage/> Not needed!*/}
        <AppSection/>
    </div>
  )
}

export default Home
