import React from 'react'
import './CitiesCard.css'

function CitiesCard({city}) {
  return (
    <div className='city-card'>
        <img src={city?.image_url}/>
        <section className='city-details'>
            <h1>{city?.name}</h1>
            <p>{`${city?.property_count} properties available`}</p>
        </section>
    </div>
  )
}

export default CitiesCard