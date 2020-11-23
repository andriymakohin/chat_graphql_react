import React from 'react'
import moment from 'moment'
import PropTypes from "prop-types";

import "./ContactList.scss"



const ContactList = ({ contacts, openMessage,displayOn,displayOk,windowWidth }) => {
    
    const timestampToDate = (timestamp) => {
        return moment(timestamp).format("MMM Do YY");
      }
    contacts.sort((a,b) => (b.messages.map(e=>(e.date))[0] - a.messages.map(e=>(e.date))[0]))

    return (
        <div className={windowWidth < 740 ? displayOk : ""}>
            <h2  className="title">Chats</h2>
            <ul className="list">
                {contacts.map(contact => (
                    <li className="contact" key={contact.id} onClick={() => (openMessage(contact))}>
                    <picture className="image-block">
                        <img
                            className="contact-image"
                            src={contact.image}
                            alt="contact_image"
                        />
                    </picture>
                    <div className="contact-box">
                        <div className="contact-description">
                            <span>{contact.name}</span>
                            <span className="contact-description__message">
                                { contact.messages[contact.messages.length-1] ? contact.messages.map(e => (e.message))[0] : " " }
                            </span>
                        </div>
                        <p className="contact-description__date">
                            { contact.messages[contact.messages.length-1] ? contact.messages.map(e => (timestampToDate(e.date)))[[0]] : " " }
                        </p>
                    </div>
                 </li>
                ))}
        </ul>
        </div >
    )
}

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        messages: PropTypes.arrayOf(PropTypes.shape({
            message: PropTypes.string,
            date: PropTypes.number
        })).isRequired,
    })).isRequired,
    openMessage: PropTypes.func.isRequired,
  };