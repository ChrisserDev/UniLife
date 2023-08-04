import React from 'react';
import { useParams } from 'react-router-dom';
import './CityDetails.css';
import axios from 'axios';
import Slider from '../../Components/Slider/Slider'
import CityCard from '../../Components/CityCard/CityCard'
import students from '../../assets/studentsLaughing.png'
import BlueFooterComponent from '../../Components/BlueFooter/BlueFooter';

//This component serves as a page to display details about a specific city and allows users to filter and search for student accommodations within that city based on various criteria.

function CityDetails() {
 
  //The useParams allows the component to access the parameters passed in the URL, in this case, the cityId.
  const {cityId} = useParams();

  const [city, setCity] = React.useState([])
  const [singleCity, setSingleCity] = React.useState([]);

  //These variables hold the filtering options data used in the component.
  const [propertyTypes, setPropertyTypes] = React.useState([]);
  const [type, setType] = React.useState('Any Type')
  const [price, setPrice] = React.useState('Any Price')
  const [bedroom, setBedroom] = React.useState('Any Bedroom')
  const [bathroom, setBathroom] = React.useState('Any Bathroom')
  const [query, setQuery] = React.useState({city_id: cityId})

  //These arrays are used to populate the options in the corresponding dropdowns for filtering properties.
  const bedroomCount = [1, 2, 3, 4, 5, 6];
  const bathroomCount = [1, 2, 3, 4];
  const priceAmount = [1000, 1500, 2000, 2500, 3000];
  

  //This useEffect hook is used to fetch data about the city and available property types when the component mounts. 
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


  //This function takes the selected values for bedroom, bathroom, type, price, and the cityId as input, and constructs an object called queryObject with these values.
  //It then sets the query state variable to this queryObject.
  const filteredProperties=(bedroom, bathroom, type, price, id) =>{

    const queryObject = {
      city_id: id,
    }

    if (bedroom !== 'Any Bedroom'){
      queryObject.bedroom_count = bedroom;
    }

    if (bathroom !== 'Any Bathroom'){
      queryObject.bathroom_count = bathroom;
    }
    if (type !== 'Any Type'){
      queryObject.property_type = type;
    }
    if (price !== 'Any Price'){
      queryObject.rent = price;
    }
  
    setQuery(queryObject)
    console.log('Object', queryObject)
  }

  //This useEffect hook is used to fetch filtered property data whenever there is a change in the query state variable.
  React.useEffect(() =>{
    console.log('Object', query)
    axios.post('https://unilife-server.herokuapp.com/properties/filter', {query: query})
    .then(res => {
      console.log(res.data.response)
      setSingleCity(res.data.response)
    })
    .catch(err => console.log(err))
  }, [query])
    
  React.useEffect(() => {filteredProperties(bedroom, bathroom, type, price, cityId)}, [bedroom, bathroom, type, price, cityId]);


  //The event handler functions below are used to update the corresponding state variables whenever the user selects a different option in the dropdowns.
  const handleBedroom = (e) => {
    setBedroom(e.target.value)
  }

  const handleBathroom = (e) => {
    setBathroom(e.target.value)
  }

  const handlePrice = (e) => {
    setPrice(e.target.value)
  }

  const handleType = (e) => {
    setType(e.target.value)
  }


  //The component displays a slider, search options (dropdowns for filtering), the number of available homes in the city, a list of properties in the city that match the selected filters, and some additional information.
  //The data from the state variables (city, singleCity) is used to populate the content dynamically.

  return (
    <div className='city-details-container'>
      <Slider />
      <div className='banner-container2'>
        <h1>Search Accommodation</h1>
        <p>Whatever you’re after, we can help you find the right student accommodation for you.</p>
      </div>
      <div className='search-options-container'>
        <section className='search-option'>
          <label htmlFor='bedroom'>Min Bedroom</label>
          <select value={bedroom} onChange={handleBedroom}>
            <option value='Any Bedroom'>Any Bedroom</option>
            {
              bedroomCount?.map((count) => (
              <option key={count} value={count}>{count}</option>
              ))
            }
          </select>
        </section>
        <section className='search-option'>
          <label htmlFor='bathroom'>Min Bathroom</label>
          <select name='bathroom' value={bathroom} onChange={handleBathroom}>
            <option value='Any Bathroom'>Any Bathroom</option>
            {
              bathroomCount?.map((count) => (
              <option key={count} value={count}>{count}</option>
              ))
            }
          </select>
        </section>
        <section className='search-option'>
          <label htmlFor='price'>Max Price</label>
          <select name='price' value={price} onChange={handlePrice}>
            <option value='Any Price'>Any Price</option>
            {
              priceAmount?.map((count) => (
              <option key={count} value={count}>{`£${count}`}</option>
              ))
            }
          </select>
        </section>
        <section className='search-option'>
          <label htmlFor='type'>Home Type</label>
          <select name='property_type' value={type} onChange={handleType}>
            <option value='anyType'>Any type</option>
              {
                propertyTypes.map((type) => (
                <option key={type._id} value={type._id}>{type.name}</option>
              ))
              }
          </select>
        </section>
      </div>
      <div className='top-details-container'>
      {singleCity.length > 0 ? (
          <h2>{singleCity?.length} homes in {city[0]?.name}</h2>
        ) : (
          <h3>Sorry, there are no homes that match your criteria in {city[0]?.name}!</h3>
        )}
      </div>
      <div className='details-container'>
      {
        city[0]?.property_count > 0 ? (
            singleCity.map((item) => (
            <CityCard key={item._id} property={item} />
          ))
        ) : (
          <p>No homes available based on the selected filters.</p>
        )
      }
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
      <BlueFooterComponent />
    </div>
  )
}

export default CityDetails;