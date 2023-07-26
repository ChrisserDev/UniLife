import React from 'react';
import { useParams } from 'react-router-dom';
import './CityDetails.css';
import axios from 'axios';
import Slider from '../../Components/Slider/Slider';
import CityCard from '../../Components/CityCard/CityCard';

function CityDetails() {
  //This page shows the details of a specific city.
  //What character?
  //the name is in the url

  const { cityId } = useParams();

  //Initiate state to save the data
  const [singleCity, setSingleCity] = React.useState([]);

  //I want to see city details when the page loads
  React.useEffect(() => {
    //make api call to get data
    axios
      .get(`https://unilife-server.herokuapp.com/properties/city/${cityId}`)
      .then((res) => {
        setSingleCity(res.data.response);
        console.log(res.data.response);
      })
      .catch((err) => console.log(err));
  }, [cityId]);


  // axios.post('https://unilife-server.herokuapp.com/properties/filter', { query : {  //put query key:value pairs here//  }})
  // .then(res => console.log(res.data))
  // .catch(err => console.log(err))

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
          <select name='bedroom'>
            <option value='anyBedroom'>Any Bedroom</option>
          </select>
        </section>
        <section>
          <label htmlFor='bathroom'>Min Bathroom</label>
          <select name='bathroom'>
            <option value='anyBathroom'>Any bathroom</option>
          </select>
        </section>
        <section>
          <label htmlFor='price'>Max Price</label>
          <select name='price'>
            <option value='anyPrice'>Any price</option>
          </select>
        </section>
        <section>
          <label htmlFor='type'>Home Type</label>
          <select name='type'>
            <option value='anyType'>Any type</option>
          </select>
        </section>
      </div>
      <div className='details-container'>
        {singleCity.map((item) => (
          <CityCard key={item._id} property={item} />
        ))}
      </div>
      <div className='city-description'>
        {/* <h1>Being a student in {singleCity?.length > 0 && singleCity[0]?.name}</h1> */}
      </div>
    </div>
  );
}

export default CityDetails;