import React from 'react'
import './AllCitiesCard.css'
import { Link } from 'react-router-dom'

function CitiesCard({city}) {
  return (
    <Link to={`/details/${city?._id}`} className='city-card'>
        <img src={city?.image_url}/>
        <section className='city-details'>
            <h1>{city?.name}</h1>
            <p>{`${city?.property_count} properties available`}</p>
        </section>
    </Link>
  )
}

export default CitiesCard