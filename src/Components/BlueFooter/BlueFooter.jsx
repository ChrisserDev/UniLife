import React from 'react'
import './BlueFooter.css'
import { FaFacebook } from 'react-icons/fa'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { GrInstagram } from 'react-icons/gr'


//The Blue Footer component displays the newsletter signup and the social links (Instagram, Facebook, Twiteer).

export default function BlueFooterComponent() {
    
  return (
    <div className='blue-footer-container'>
      <div className='newsletter-container'>
        <h2>Keep in touch</h2>
        <p>Curious about new offerings? Sign up for our <br/> weekly newsletter and stay informed.</p>
        <input type='text' placeholder='Enter your email' />
      </div>
      <div className='socials-container'>
        <h2>Let's Socialise</h2>
          <section className='social-links'>
            <i><FaFacebook /></i>
            <p>Facebook</p>
          </section>
          <section className='social-links'>
            <i>< AiFillTwitterCircle/></i>
            <p>Twitter</p>
          </section>
          <section className='social-links'>
            <i><GrInstagram /></i>
            <p>Instagram</p>
          </section>
      </div>
    </div>
  )
}