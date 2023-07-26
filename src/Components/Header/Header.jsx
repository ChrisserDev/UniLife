import React from 'react'
import './Header.css'
import picture from '../../assets/holiday.png'
import {AiOutlineHeart, AiOutlineMail} from 'react-icons/ai'
import Modal from 'react-modal'
import mailbox from '../../assets/mailbox.png'
import { Link } from 'react-router-dom'

function Header() {

  //Initiate the Modal
  Modal.setAppElement(document.getElementById('root'))
  const [isOpen, setIsOpen] = React.useState(false)
  const [isOpen2, setIsOpen2] = React.useState(false)


  //Styling for modal
  const customStyles = {
    content: {
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '20px'
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    }
  }
  
  return (
    <header className='header-container'>
      <div className='logo-and-title'>
        <img src={picture}></img>
        <Link to='/' id='unilife-homepage'>UniLife</Link>
      </div>
      <div className='right-header-links'>
        <div className='shortlist-container'>
          <i id='shortlist-icon'><AiOutlineHeart /></i>
          <p onClick={() => setIsOpen2(true)} id='shortlist-btn'>Shortlist</p>
          <Modal
                isOpen={isOpen2}
                onRequestClose={() => setIsOpen2(false)}
                style={customStyles}
                contentLabel='Shortlist Modal'>
                <form>

                  <h2>Favourite Properties</h2>
                </form>
              </Modal>
        </div>
          <div className='contact-us-container'>
              <i id='contact-icon'><AiOutlineMail /></i>
              <button type='button' id='contact-btn' onClick={() => setIsOpen(true)}>Contact Us</button>
          </div>
              <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
                contentLabel='Contact Us Modal'>
                <div className='modal-header'>
                  <h2>Contact us</h2>
                  <img src={mailbox} id="mailbox-pic"></img>
                  <p>Feel free to contact us if you have any questions. 
                    <br/>Looking forward to hear from you.</p>
                  </div>
                <form className='form-container'>
                  <div className='left-side-form'>
                  <section>
                  <label htmlFor="name"><strong>Name</strong></label><br/>
                  <input type='text' id='name' placeholder='Enter your name' />
                  </section>
                  <section>
                    <label htmlFor="phone-numb"><strong>Phone Number</strong></label><br/>
                  <input type='text' id='phone-numb' placeholder='Enter your phone number' />
                  </section>
                  <section>
                    <label htmlFor='student-type'><strong>Are you a...</strong></label><br/>
                    <select name='students' id='student-type'>
                    <option value="student">Student</option>
                  </select>
                  </section>
                  </div>
                  <div className='right-side-form'>
                  <section>
                    <label htmlFor='email'><strong>Email</strong></label><br/>
                    <input type='text' id='email' placeholder='Enter your email address' />
                  </section>
                  <section>
                    <label htmlFor="message"><strong>Message</strong></label><br/>
                    <textarea id='message' rows='6' cols='30' placeholder='Enter your message'></textarea>
                  </section>
                  <button type='button' id='submit-btn'>Submit</button>
                </div>
                </form>
              </Modal>
            </div>
        </header>
  )
}

export default Header