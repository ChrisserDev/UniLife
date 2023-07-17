import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Homepage from './Pages/Homepage/Homepage'
import Footer from './Components/Footer/Footer'
import SeeAllCities from './Pages/SeeAllCititesPage/SeeAllCities';
import CityDetails from './Pages/CityDetailsPage/CityDetails';
import HomeDetails from './Pages/HomeDetailsPage/HomeDetails';

function App() {
  
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path='/SeeAllCities' element={<SeeAllCities/>}/>
        <Route path='/details/:cityId' element={<CityDetails/>}/>
        <Route path='/HomeDetails/:propertyId' element={<HomeDetails />}/>      
      </Routes>         
      <Footer/>
    </BrowserRouter>
  )
}

export default App