import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Header from './Components/Header/Header'
import Homepage from './Pages/Homepage/Homepage'
import Footer from './Components/Footer/Footer'
import SeeAllCities from './Pages/SeeAllCititesPage/SeeAllCities';
import CityDetails from './Pages/CityDetailsPage/CityDetails';
import HomeDetails from './Pages/HomeDetailsPage/HomeDetails';
import FavouritesContextProvider from './Contexts/FavouritesContext'
import './App.css'

export default function App() {
  
return (
  <BrowserRouter>
  <FavouritesContextProvider>
    <Header/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path='/SeeAllCities' element={<SeeAllCities/>}/>
      <Route path='/details/:cityId' element={<CityDetails/>}/>
      <Route path='/HomeDetails/:propertyId' element={<HomeDetails />}/>      
    </Routes>         
    <Footer/>
    </FavouritesContextProvider>
  </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>
)
