import React, {useContext} from 'react'
import './HomeDetails.css'
import BlueFooterComponent from '../../Components/BlueFooter/BlueFooter'
import {AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose} from 'react-icons/ai'
import { FavouritesContext } from '../../Contexts/FavouritesContext'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal';
import beds from '../../assets/beds2.png'
import baths from '../../assets/baths2.png'
import tick from '../../assets/tick.png'

//The Home Details component displays the property details, allowing users to add properties to the shortlist component and book viewing appointments through a form modal.

function HomeDetails() {

  const { propertyId } = useParams();

  //Using the FavouritesContext to add or remove a property from the shortlist component.
  const { favourites, addProperty, removeProperty } = useContext(FavouritesContext)

  //These state variables hold data used in the component, like property details, images, shortlist status etc.
  const [property, setProperty] = React.useState([]);
  const [propertyPrice, setPropertyPrice] = React.useState([])
  const [images, setImages] = React.useState([]);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isFavourite, setIsFavourite] = React.useState(false);


  //This useEffect hook is used to check whether the current property is present in the user's favourites array (favourites). 
  //It then updates the isFavourite state variable accordingly, which is later used to determine whether to show the "Shortlist" or "Remove from Shortlist" button when displaying property details on the page.
  React.useEffect(() => {
    //is this property in favourites?
    setIsFavourite(favourites.find(item => item._id == propertyId))
      
  }, [favourites])

  //This useEffect hook fetches data about a specific property when the component mounts (property details, images, and bedroom prices).
  //It is then stored in corresponding state variables (property, images, and propertyPrice).
  React.useEffect(() => {
    //Call the API to get the cities data
    axios.get(`https://unilife-server.herokuapp.com/properties/${propertyId}`)
    .then(res => {
      console.log(res.data)
      //Storing the data in state
      setProperty(res.data)
      setImages(res.data.images)
      setPropertyPrice(Object.values(res.data.bedroom_prices)) //using Object.values to convert the values from an object to an array.
      console.log(res.data.bedroom_prices)

    })
    .catch(err => console.log(err))

  }, [])


  //Activate useNavigate
  const navigate = useNavigate();

  //The useNavigate hook allows the user to go back to the search page when clicking the "Back to Search" button.
  const handleBackToSearch = () => {
    navigate(`/details/${property?.city_id?._id}`)
  }

  //The two functions below are used to go through the images of a specific property. 
  const goToPreviousImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1);
  };


  //Initiating the modal
  Modal.setAppElement(document.getElementById('root'));

  //State variable for the modal
  const [isOpen, setIsOpen] = React.useState(false);

  //Modal styling
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)"
      }
  };


  return (
    <>
      <div className='previous-page-btn'>
        <i onClick={handleBackToSearch}><AiOutlineArrowLeft/></i>
        <button type='button' id='back-to-search-btn' onClick={handleBackToSearch}>Back to Search</button>
      </div>
      <div className='home-details-container'>
        <div className='property-images'>
          <img src={images[currentImageIndex]} />
          <div className='slider-buttons'>
            <button type='button' id='prev-image' onClick={goToPreviousImage}><AiOutlineArrowLeft /></button>
            <button type='button' id='next-image' onClick={goToNextImage}><AiOutlineArrowRight /></button>
          </div>
        </div>
        <div className='all-property-details'>
          <div className='property-details'>
            <h1>{property?.address?.street}, {property?.address?.city}, {property?.address?.postcode}</h1>
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
              <section className='property-type'>
                <h4>Property Type</h4>
                <h3>{property?.property_type}</h3>
              </section>
              <section className='property-price'>
                <h4>Price</h4>
                <h3>£{property?.rent}</h3>
              </section>
              <section className='property-state'> 
                <h4>Furnished type</h4>
                <h3>{property?.furnished}</h3>
              </section>
              <section className='property-availability'>
                <h4>Available from</h4>
                <h3>{property?.availability}</h3>
              </section>
            </div>
          </div>
        <div className='shortlist-book-viewing-container'>
        {
          isFavourite ? (    
            <div className='shortlist-properties' onClick={() => removeProperty(propertyId)}> 
              <FaHeart className='heart-icon'/>
              <button type='button'>Remove from Shortlist</button>
            </div>
        ) : (
            <div className='shortlist-properties' onClick={() => addProperty(property)}>
              <FaRegHeart className='heart-icon' />
              <button type='button'>Shortlist</button>
            </div>
        )
        }
        <button type='button' id='book-viewing-btn' onClick={() => setIsOpen(true)}>Book Viewing</button>
        </div>
      </div>
      </div>
      <div className='middle-content-container'>
      <div className='property-description'>
        <h1>Description</h1>
        <p>{property?.property_description}</p>
      </div>
      <div className='bedroom-prices'>
            <h1>Bedroom Prices</h1>
            <div className='single-bedroom-prices'>
            {propertyPrice.length > 0 && (
          <div className='single-price'>
            <h4>Bedroom 1</h4>
            <h4>£{propertyPrice[0]} per week</h4>
          </div>
        )}
        {propertyPrice.slice(1).map((item, index) => (
          <div className='single-price' key={item}>
            <h4>Bedroom {index + 2}</h4>
            <h4>£{item} per week</h4>
          </div>
        ))}
      </div>
      </div>
      </div>
      <div className='key-features'>
        <h1>Key Features</h1>
        {property?.key_features?.map((feature, index) => (
          <div key={index} className='feature'>
          <img src={tick} />
          <p>{feature}</p>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isOpen}
        style={customStyles}
        contentLabel="Book Viewing Modal">
        <div className='book-viewing-container'>
          <div className='top-viewing-container'>
            <h1>Book a Viewing</h1>
            <h3>{property?.address?.street}, {property?.address?.city}, {property?.address?.postcode}</h3>
            <i><AiOutlineClose id='close-modal' onClick={() => setIsOpen(false)}/></i>
          </div>
          <form className='form-container'>
            <div className='left-side-form'>
              <section>
                <label htmlFor="name"><strong>Name</strong></label><br/>
                <input type='text' id='name' placeholder='Enter your name' />
              </section>
              <section>
                <label htmlFor='email'><strong>Email</strong></label><br/>
                <input type='text' id='email' placeholder='Enter your email address' />
              </section>
              <section>
                <label htmlFor="phone-numb"><strong>Phone Number</strong></label><br/>
                <input type='text' id='phone-numb' placeholder='Enter your phone number' />
              </section>
            </div>
            <div className='right-side-form'>
              <section>
                <label htmlFor="message"><strong>Message</strong></label><br/>
                <textarea id='message' rows='7' cols='30' placeholder='Enter your message'></textarea>
              </section>
              <button type='button' id='book-viewing-submit-btn'>Submit</button>
            </div>
          </form>
        </div>
      </Modal>
      <BlueFooterComponent /> 
    </>
  )
}

export default HomeDetails