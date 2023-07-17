import React from 'react'
import './HomeDetails.css'
import BlueFooterComponent from '../../Components/BlueFooter/BlueFooter'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import beds from '../../assets/beds2.png'
import baths from '../../assets/baths2.png'


function HomeDetails() {

  const {propertyId} = useParams();

  const [property, setProperty] = React.useState([]);

  React.useEffect(() => {
    //Call the API to get the cities data
    axios.get(`https://unilife-server.herokuapp.com/properties/${propertyId}`)
    .then(res => {
      console.log(res.data)
      //Storing the data in state
      setProperty(res.data)
    })
    .catch(err => console.log(err))

  }, [])


  return (
    <>
    <section className='previous-page-btn'>
      <i><AiOutlineArrowLeft/></i>
      <h4>Back to Search</h4>
      </section>
      <div className='home-details-container'>
        <div className='property-images'>
          
        </div>
        <div className='property-description'>
          <h1>{property?.address?.city} {property?.address?.street} {property?.address?.postcode}</h1>
          <div className='additional-details'>
            <section className='beds-and-baths-count'>
            <h4>Bedrooms</h4>
            <section className='beds-count'>
            <img src={beds}></img>
            <h3>{property?.bedroom_count}</h3>
            </section>
            </section>
            <section className='beds-and-baths-count'>
            <h4>Bathrooms</h4>
            <section className='baths-count'>
            <img src={baths}></img>
            <h3>{property?.bathroom_count}</h3>
            </section>
            </section>
            <section>
              <h4>Property Type</h4>
              <h3>{property?.property_type}</h3>
            </section>
            <section>
              <h4>Price</h4>
              <h3>£{property?.rent}</h3>
            </section>
            <section>
              <h4>Furnished type</h4>
              <h3>{property?.furnished}</h3>
            </section>
            <section>
              <h4>Available from</h4>
              <h3>{property?.availability}</h3>
            </section>
          </div>
        </div>
      </div>
        <BlueFooterComponent /> 
    </>
  )
}

export default HomeDetails