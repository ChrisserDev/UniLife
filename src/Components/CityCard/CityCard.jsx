import React from 'react'
import './CityCard.css'
import { Link } from 'react-router-dom'
import beds from '../../assets/beds.png'
import baths from '../../assets/baths.png'
import homepin from '../../assets/homepin.png'
import home from '../../assets/home.png'


function CityCard({property}) {

  return (
      <div className='cards-container'>
        <img src={property?.images[0]}/>
        <div className='cards-info'>
            <div className='price-and-capacity'>
            <section>
            <h3>£{property?.rent}</h3>
            <p>pppm including bills</p>
            </section>
            <section className='beds-and-baths-count'>
            <img src={beds} />
            <p>{property?.bedroom_count}</p>
            </section>
            <section className='beds-and-baths-count'>
            <img src={baths} />
            <p>{property?.bathroom_count}</p>
            </section>
            </div>
            <div className='additional-info'>
            <section className='property-type-and-state'>
                <h3>{property?.property_type}</h3>
                <h3>{property?.furnished}</h3>
            </section>
            <section className='property-adress'>
                <img src={homepin} />
                <p>{property?.address?.city}, {property?.address?.street}, {property?.address?.postcode}</p>
            </section>
            <section className='view-home'>
              <img src={home}/>
              <Link to={`/HomeDetails/${property?._id}`} id='view-home-btn'>View Home</Link>
            </section>
            </div>
            </div>
          </div>
  )
}

export default CityCard