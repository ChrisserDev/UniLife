import React from 'react'
import './AllCitiesCard.css'
import { Link } from 'react-router-dom'
import nottingham from '../../assets/nottingham.jpg'

// The All Cities Card component generates a link to the details page of a specific city. 
// It displays the city's image, name, and the count of available properties. 
// The data for the city is passed to the component through the city prop.

export default function CitiesCard({city}) {

  console.log(city.image_url)
  return (
    <Link to={`/details/${city?._id}`} className='city-card'>
      <img src={city?.name === 'Nottingham' ? nottingham : city?.image_url} alt={city?.name || 'City Image'}/>
      <section className='city-details'>
        <h1>{city?.name}</h1>
        <p>{`${city?.property_count} properties available`}</p>
      </section>
    </Link>
  );
}