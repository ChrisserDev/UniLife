import React from 'react';
import { useParams } from 'react-router-dom';
import './CityDetails.css';
import axios from 'axios';
import Slider from '../../Components/Slider/Slider'
import CityCard from '../../Components/CityCard/CityCard'
import students from '../../assets/studentsLaughing.png'

function CityDetails() {
 
  const { cityId } = useParams();
  const [city, setCity] = React.useState([])
  const [singleCity, setSingleCity] = React.useState([]);

  const [filter, setFilter] = React.useState({
    bedroom_count: 'anyBedroom',
    bathroom_count: 'anyBathroom',
    property_type: 'anyType',
    rent: 'anyPrice',
  });

  //state for property types
  const [propertyTypes, setPropertyTypes] = React.useState([]);
  
    const handleChange = (e) =>{
      setFilter({
          ...filter,
          [e.target.name]: e.target.value,
      });
    };
   
  //I want to see city details when the page loads
  React.useEffect(() => {
    axios.get(`https://unilife-server.herokuapp.com/cities/${cityId}`)
    .then((res) => {
      setCity(res.data.data);
      console.log(res.data.data)
    })
    .catch((err) => console.log(err));

      axios.get(`https://unilife-server.herokuapp.com/propertyTypes`)
      .then((res) => {
        setPropertyTypes(res.data.response);
      })
      .catch((err) => console.log(err));

      
    }, []);
    
    React.useEffect(() => {
      axios.post('https://unilife-server.herokuapp.com/properties/filter', {query: {
      city_id:`${cityId}`,
      // bedroom_count: filter.bedroom_count,
      // bathroom_count: filter.bathroom_count,
      // property_type: filter.property_type,
      // rent: filter.rent,
  }  })
  .then((res) => {
         setSingleCity(res.data.response);
         console.log(res.data.response)
      })
    .catch(err => console.log(err))

  }, [cityId, filter]);


  return (
    <div>
      <Slider />
      <div className='banner-container'>
        <h1>Search Accommodation</h1>
        <p>Whatever you’re after, we can help you find the right student accommodation for you.</p>
      </div>
      <div className='search-container'>
        <section>
          <label htmlFor='bedroom'>Min Bedroom</label>
          <select name='bedroom' value={filter.bedroom_count} onChange={handleChange}>
            <option value='anyBedroom'>Any Bedroom</option>
            <option value='one'>1</option>
            <option value='two'>2</option>
            <option value='three'>3</option>
            <option value='four'>4</option>
            <option value='five'>5</option>
          </select>
        </section>
        <section>
          <label htmlFor='bathroom'>Min Bathroom</label>
          <select name='bathroom' value={filter.bathroom_count} onChange={handleChange}>
          <option value='anyBedroom'>Any Bathroom</option>
            <option value='one'>1</option>
            <option value='two'>2</option>
            <option value='three'>3</option>
            <option value='four'>4</option>
          </select>
        </section>
        <section>
          <label htmlFor='price'>Max Price</label>
          <select name='price'>
            <option value='anyPrice'>Any price</option>
            <option value='onethousand'>£1,000</option>
            <option value='twothousand'>£2,000</option>
            <option value='threethousand'>£3,000</option>
            <option value='fourthousand'>£4,000</option>
            <option value='fivethousand'>£5,000</option>
          </select>
        </section>
        <section>
          <label htmlFor='type'>Home Type</label>
          <select name='type'>
            <option value={propertyTypes}>Any type</option>
            <option value={propertyTypes}>{propertyTypes[0]?.name}</option>
            <option value={propertyTypes}>{propertyTypes[1]?.name}</option>
            <option value={propertyTypes}>{propertyTypes[2]?.name}</option>
          </select>
        </section>
      </div>
      <div className='top-details-container'>
      {singleCity.length > 0 ? (
          <h2>{singleCity.length} homes in {city[0]?.name}</h2>
        ) : (
          <h2>Loading homes in {city[0]?.name}</h2>
        )}
      </div>
      <div className='details-container'>
      {city[0]?.property_count > 0 ? (
          singleCity.map((item) => (
            <CityCard key={item._id} property={item} />
          ))
        ) : (
          <p>No homes available based on the selected filters.</p>
        )}
      </div>
      <div className='city-description-container'>
        <section className='left-city-description'>
        <h1>Being a student in {city[0]?.name}</h1>
        <p>{city[0]?.student_life} </p>
        </section>
        <section className='right-city-description'>
          <img src={students} />
        </section>
      </div>
    </div>
  );
}

export default CityDetails;