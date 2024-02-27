import React, {useEffect, useState} from 'react'
import './Homepage.css'
import axios from 'axios'
import {AiOutlineHeart} from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import Slider from '../../Components/Slider/Slider'
import BlueFooterComponent from '../../Components/BlueFooter/BlueFooter'
import CitiesCard from '../../Components/AllCitiesCard/AllCitiesCard'
import compare from '../../assets/compare.png'
import searchImg from '../../assets/searchImg.png'
import bills from '../../assets/bills.png'
import bestselection from '../../assets/bestselection.png'
import students from '../../assets/students.jpg'


//The Homepage component has a search by city functionality, where users can select a city from the search dropdown, view accommodations in top cities, and compare different student homes. 
//The website also provides features to shortlist favorite properties and navigate to the details page of a selected city.

export default function Homepage() {

  //Initiated state to store the data from the API
  const [cities, setCities] = useState([]); //This state holds data about student accommodations in top cities.
  const [searchCity, setSearchCity] = useState([]); //This state holds data about cities that can be searched.
  const [search, setSearch] = useState(''); //This state holds the currently selected city in the search dropdown.

  //This useEffect fetches data about cities that can be searched (limit=20) and stores it in the searchCity state.
  useEffect(() => {
    //Call the API to get the cities data
    axios.get(`https://unilife-server.herokuapp.com/cities?limit=20`)
    .then(res => {
      setSearchCity(res.data.response)
    })
    .catch(err => console.log(err))

    //This useEffect fetches data about the top cities (limit=9) and stores it in the cities state.
    axios.get(`https://unilife-server.herokuapp.com/cities?limit=9`)
    .then(res => {
      setCities(res.data.response)
    })
    .catch(err => console.log(err))

  }, [])

  const handleChange = (e) =>{
    setSearch(e.target.value)
  }

  const nav = useNavigate();

  //This function finds the selected city's _id and constructs the URL for navigation.
  const navigateToCity = city => {
    const seletedCityId = searchCity.find(item => item.name.toLowerCase() === city)._id
    nav(`/details/${seletedCityId}`)
  }

  return (
    <div className='homepage-container'>
      <Slider />
      <div className='banner-container'>
        <h1>Find student homes with bills included</h1>
        <p>A simple and faster way to search for student accommodation</p>
      </div>
      <div className='search-city-container'>
        <select id='search-city' value={search} onChange={handleChange}>
          <option value='searchbycity'>Search by city</option>
          {searchCity.map(item => 
            <option value={item?.name} key={item._id}>{item?.name}</option>                
          )
          }
        </select>
        <button onClick={() => navigateToCity(search.toLowerCase())} type='button' id='find-homes-btn'>Find Homes</button>
      </div>
      <div className='student-accomodations-container'> 
        <h1>Student accommodations in our top cities</h1>
        <div className='city-cards-container'>
            {
              cities.map(item => <CitiesCard key={item._id} city={item}/>)
            }
        </div>
      </div>
      <Link to='/SeeAllCities' type='button' id='see-all-cities'>See All Cities</Link>
      <div className='features-container'>
          <h1>Compare all inclusive student homes.</h1>
          <div className='features-listed'>
          <section>
            <img src={searchImg}></img>
            <h3>Search</h3>
            <p>Find your dream home in the perfect <br/> area near your university.</p>
          </section>
          <section>
            <img src={compare}></img>
            <h3>Compare</h3>
            <p>Compare student accommodation <br/> to find the right home for you.</p>
          </section>
          <section>
            <img src={bills}></img>
            <h3>Bills Included</h3>
            <p>Bills are included in all rent prices. <br/> No hidden fees.</p>
          </section>
          </div>
      </div>
      <div className='marketing-container'>
        <div className='left-side-marketing-container'>
            <img src={bestselection} id='best-selection-img'></img>
            <section className='best-selection'>
              <h3>Best selection</h3>
              <p>Best selection of student accommodations. Never been easier to find a home that’s right for you.</p>
            </section>
            <i><AiOutlineHeart /></i>
            <section className='favourite-selection'>
              <h3>Your favorite</h3>
              <p>Shortlist your favourite properties and send enquiries in one click.</p>
            </section>
            <Link to='/SeeAllCities' type='button' id='search-compare-btn'>Search & Compare</Link>
        </div>
        <div>
          <img src={students} id='students-image'></img>
        </div>
      </div>
      <BlueFooterComponent />
    </div>
  )
}