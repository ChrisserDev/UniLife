import React, {useContext} from 'react'
import './HomeDetails.css'
import BlueFooterComponent from '../../Components/BlueFooter/BlueFooter'
import {AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose} from 'react-icons/ai'
import { FavouritesContext } from '../../Contexts/FavouritesContext'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal';
import beds from '../../assets/beds2.png'
import baths from '../../assets/baths2.png'
import tick from '../../assets/tick.png'


function HomeDetails() {

  const {propertyId} = useParams();

  const [property, setProperty] = React.useState([]);
  const [propertyPrice, setPropertyPrice] = React.useState([])
  const [images, setImages] = React.useState([]);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isFavourite, setIsFavourite] = React.useState(false)

  
      //now change to global state
    //NOTE { } NOT []
    const { favourites, addProperty, removeProperty } = useContext(FavouritesContext)
  
    React.useEffect(() => {
      //is this property in favourites?
      setIsFavourite(favourites.find(item => item.id == propertyId))
      
    }, [favourites, propertyId])


  React.useEffect(() => {
    //Call the API to get the cities data
    axios.get(`https://unilife-server.herokuapp.com/properties/${propertyId}`)
    .then(res => {
      console.log(res.data)
      //Storing the data in state
      setProperty(res.data)
      setImages(res.data.images)
      setPropertyPrice(Object.values(res.data.bedroom_prices))
      console.log(res.data.bedroom_prices)

    })
    .catch(err => console.log(err))

  }, [])



  const goToPreviousImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1);
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1);
  };


  Modal.setAppElement(document.getElementById('root'));

  const [isOpen, setIsOpen] = React.useState(false);

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
    <section className='previous-page-btn'>
      <i><AiOutlineArrowLeft/></i>
      <h4>Back to Search</h4>
      </section>
      <div className='home-details-container'>
        <div className='property-images'>
          <img src={images[currentImageIndex]} />
          <div className='slider-buttons'>
            <button type='button' id='prev-image' onClick={goToPreviousImage}>
              <AiOutlineArrowLeft />
            </button>
            <button type='button' id='next-image' onClick={goToNextImage}>
              <AiOutlineArrowRight />
            </button>
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
        {isFavourite ? (
          <div className='remove-properties' onClick={() => removeProperty(property)}> 
           <FaHeart className='heart-icon'/>
            <button type='button'>Remove from Shortlist</button>
          </div>
        ) : (
          <div className='add-properties' onClick={() => addProperty(property)}>
            <FaRegHeart className='heart-icon' />
            <button type='button'>Shortlist</button>
        </div>
        )}
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
        <div className='single-bedroom-price'>
        {propertyPrice.map((item, index) => (
          <div className='single-price' key={item}>
            <h4>Bedroom {index}</h4>
            <h4>£{item} per week</h4>
          </div>
        ))}
      </div>
      </div>
      </div>
      <div  className='key-features'>
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
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Book Viewing Modal">
        <div className='book-viewing-container'>
          <div className='top-viewing-container'>
            <h1>Book a Viewing</h1>
            <h3>{property?.address?.street}, {property?.address?.city}, {property?.address?.postcode}</h3>
            <i><AiOutlineClose /></i>
          </div>
          <form className='form-container'>
          <section>
                  <label htmlFor="name"><strong>Name</strong></label><br/>
                  <input type='text' id='name' placeholder='Enter your name' />
                  </section>
                  <section>
                    <label htmlFor="message"><strong>Message</strong></label><br/>
                    <textarea id='message' rows='6' cols='30' placeholder='Enter your message'></textarea>
                  </section>
                  <div className='right-side-form'>
                  <section>
                    <label htmlFor='email'><strong>Email</strong></label><br/>
                    <input type='text' id='email' placeholder='Enter your email address' />
                  </section>
                  <section>
                    <label htmlFor="phone-numb"><strong>Phone Number</strong></label><br/>
                  <input type='text' id='phone-numb' placeholder='Enter your phone number' />
                  </section>
                  </div>
                  <button type='button' id='submit-btn'>Submit</button>
          </form>
        </div>
        </Modal>
        <BlueFooterComponent /> 
    </>
  )
}

export default HomeDetails