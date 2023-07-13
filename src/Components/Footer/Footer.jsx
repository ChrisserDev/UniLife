import React from 'react'
import './Footer.css'
import { AiOutlineCopyrightCircle } from "react-icons/ai"

function Footer() {
  return (
    <div className='footer-container'>
      <div className='footer-left-links'>
        <p>About Us</p>
        <p>Terms & Conditions</p>
        <p>Privacy & Cookie Policies</p>
      </div>
      <div className='footer-right-links'>
        <p>2023</p>
        <div id='copyright-text'>
          <i><AiOutlineCopyrightCircle /></i>
          <p>UniLife</p>
        </div>
      </div>
    </div>
  )
}

export default Footer