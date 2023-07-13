import React from 'react'
import './Header.css'
import picture from '../../assets/holiday.png'
import {AiOutlineHeart, AiOutlineMail} from 'react-icons/ai'
import Modal from 'react-modal'

function Header() {

  //Initiate the Modal
  Modal.setAppElement(document.getElementById('root'));
  const [isOpen, setIsOpen] = React.useState(false);

  //Styling for modal
  const customStyles = {
    content: {
      top: '55%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    }
  }
  
  return (
    <div className='header-container'>
      <div className='logo-and-title'>
        <img src={picture}></img>
        <h2>UniLife</h2>
      </div>
      <div className='right-header-links'>
        <div className='shortlist-container'>
          <i id='shortlist-icon'><AiOutlineHeart /></i>
          <p>Shortlist</p>
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
                <div className='modal-container'>Im a modal</div>
                <form>
                  Form goes here
                </form>
              </Modal>
            </div>
        </div>
  )
}

export default Header