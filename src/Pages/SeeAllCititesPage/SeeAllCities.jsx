import React, {useState, useEffect} from 'react'
import './SeeAllCities.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Slider from '../../Components/Slider/Slider'
import BlueFooterComponent from '../../Components/BlueFooter/BlueFooter'

export default function SeeAllCities() {

  //This state holds data about all the cities available from the API.
  const [allcities, setAllCities] = useState([]);


  //Used 'limit=20' to get all 20 cities available from the API.
  useEffect(() => {
    //Call the API to get the cities data
    axios.get(`https://unilife-server.herokuapp.com/cities?limit=20`)
    .then(res => {
      setAllCities(res.data.response)
    })
    .catch(err => console.log(err))

  }, [])

  return (
    <div className='see-all-cities-container'>
      <Slider />
      <div className='banner-container2'>
        <h1>Student Accomodation</h1>
        <p>UniLife have student accommodation available across the UK.
        Whatever you’re after, we can help you find the right student accommodation for you. </p>
      </div>
        <h1>Search by City</h1>
        <div className='all-cities-container'>
            {
              allcities.map(item => 
              <Link to={`/details/${item?._id}`} 
              className='list-of-cities' 
              key={item._id}
              > {item?.name}</Link>)
            }
        </div>
      <BlueFooterComponent />
    </div>
  )
}