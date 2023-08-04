import React from 'react'
import './Slider.css'
import 'react-slideshow-image/dist/styles.css'
import { Fade } from 'react-slideshow-image'
import city1 from '../../assets/city1.jpg'
import city2 from '../../assets/city2.jpg' 
import city3 from '../../assets/city3.jpg' 
import city4 from '../../assets/city4.jpg'
import city5 from '../../assets/city5.jpg'


//The slider component is using 5 images that will change every 5 seconds. This is used on the homepage and all cities page.
//This is based on the react-slideshow-image library.

function Slider() {

const fadeImages = [city1, city2, city3, city4, city5]

  return (
    <div className="slider-container">
    <Fade>
        {
          fadeImages.map((image, index) => (
            <img key={index} src={image} className='overlay'/>
          ))  
        }
      </Fade>
      </div>
  )
}

export default Slider