import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Message from "../Message/Message";
import SendMessage from "../../assets/icons/send.svg";
import arrow from "../../assets/icons/arrow.png";
import "./MessageViwe.scss";

import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { MessageQuery, CreateMessageMutation } from "../MessageQuery";

const MessageViwe = ({
  createMessage,
  contacts,
  me,
  displayOn,
  windowWidth,
  displayOk,
  displayOff,
}) => {
  const [messages, setMessage] = useState({
    message: "",
  });
  const [randomeMessage, setRandomeMessage] = useState({
    message: "",
  });

  const message = contacts.messages.map((e) => e);

  let valueJoke;
  const joke = async () =>
    await axios({
      method: "get",
      url: "https://api.chucknorris.io/jokes/random?category=music",
    }).then((response) => response.data);

  joke().then((response) => (valueJoke = response.value));
  const handleChange = (e) => {
    const { value } = e.target;
    setMessage((e) => ({ ...e, message: value }));
  };

  const handleSubmit = (e) => {
    if (messages.message.length > 0) {
      e.preventDefault();
      createMessage({
        variables: {
          senderName: contacts.name,
          message: messages.message,
          date: Date.now(),
        },
        update: (store, { data: { createMessage } }) => {
          const data = store.readQuery({ query: MessageQuery });
          data.messages.push(createMessage);
          store.writeQuery({ query: MessageQuery, data });
        },
      });
    }
    setMessage((el) => ({ ...el, message: "" }));
    setTimeout(() => {
      setRandomeMessage((el) => ({ ...el, message: valueJoke }));
    }, 6000);
    // console.log(randomeMessage)
  };

  useEffect(() => {
    if (randomeMessage.message !== "") {
      createMessage({
        variables: {
          senderName: contacts.name,
          message: randomeMessage.message,
          date: Date.now(),
        },
        update: (store, { data: { createMessage } }) => {
          const data = store.readQuery({ query: MessageQuery });
          data.messages.push(createMessage);
          store.writeQuery({ query: MessageQuery, data });
        },
      });
    }
  }, [contacts.name, createMessage, randomeMessage]);

  

  return (
    <div className={windowWidth < 740 ? "messagesOff" && displayOff : ""}>
      <div className={"messages"}>
        <div className="receiver">
          <picture className="image-block">
            <img
              className="receiver-image"
              src={contacts.image}
              alt="profile_image"
            />
          </picture>
          <span className="receiver-name">{contacts.name}</span>
          {windowWidth < 740 && (
            <img
              src={arrow}
              width="40px"
              height="40px"
              className="bak-btn"
              alt="bak_btn"
              onClick={() => displayOn(false)}
            />
          )}
        </div>
        <div className="history">
          <Message message={message} contacts={contacts} me={me} />
        </div>
        <div className="send">
          <form className="input-message" onSubmit={handleSubmit}>
            <img
              className="send-img"
              onClick={handleSubmit}
              src={SendMessage}
              alt="send_message_image"
            />
            <input
              type="text"
              value={messages.message}
              onChange={handleChange}
              className="send-message"
              placeholder="Type your message"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default compose(
  graphql(MessageQuery, { name: "messages" }),
  graphql(CreateMessageMutation, { name: "createMessage" })
)(MessageViwe);

MessageViwe.propTypes = {
  contacts: PropTypes.shape({
    messages: PropTypes.array.isRequired,
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  me: PropTypes.string.isRequired,
};
