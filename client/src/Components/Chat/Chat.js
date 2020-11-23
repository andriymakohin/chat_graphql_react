import React, { useState, useEffect } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  UserQuery,
} from "../UserQuery";
import ContactList from "../ContactList/ContactList";
import MessageVeiwe from "../MessageViwe/MessageViwe";
import ProfileImage from "../../image/santa.png";
import SearchImage from "../../assets/icons/search.svg";

import "./Chat.scss";

const Chat = (props) => {
  const contacts = props.data.users;
  console.log(contacts);
  const [newContacts, setNewContact] = useState(contacts.map((e) => e)[0]);
  const [query, setQuery] = useState("");
  const [displayOk, setDisplayOk] = useState("");
  const [displayOff, setDisplayOff] = useState("");

  const changeFilter = (e) => {
    const name = e.target.value;
    setQuery(name);
  };

  const filterName = (arr, filter) => {
    return arr.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const openMessage = (contactId) => {
    let newContacts = contactId;
    setNewContact(newContacts);
  };

  const windowWidth = document.documentElement.clientWidth;

  const displayOn = (e) => {
    if (e) {
      setDisplayOk("on");
      setDisplayOff("off");
    } else {
      setDisplayOk("off");
      setDisplayOff("on");
    }
  };

  return (
    <div className="chat">
      <div className="left-block">
        <div className="left-block__top">
          <picture className="image-block">
            <img
              className="user-image"
              src={ProfileImage}
              alt="profile_image"
            />
          </picture>
          <p className="user-name">User</p>
          <div className={"search"}>
            <img
              className="search-image"
              src={SearchImage}
              alt="search_image"
            />
            <input
              className="filter"
              type="text"
              placeholder="Search or start new chat"
              value={query}
              onChange={changeFilter}
            />
          </div>
        </div>
        <div className="left-block__bottom">
          <ContactList
            windowWidth={windowWidth}
            displayOk={displayOk}
            displayOn={displayOn}
            openMessage={openMessage}
            contacts={filterName(contacts, query)}
          />
        </div>
      </div>
      <MessageVeiwe
        windowWidth={windowWidth}
        displayOk={displayOk}
        displayOff={displayOff}
        displayOn={displayOn}
        contacts={newContacts}
        me={ProfileImage}
      />
    </div>
  );
};

export default compose(
  graphql(UserQuery),
)(Chat);
