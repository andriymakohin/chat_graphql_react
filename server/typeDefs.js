const typeDefs = `
  type Query {
    users: [User]
    messages: [Message]
  }

  type User {
    id: ID!
	  name: String!
	  image: String!
    messages: [Message]
  }

  type Message {
    id: ID!
    message: String!
    senderName: String!
    date: Float!
    users: [User]
  }

  type Mutation {
    createUser(name: String! image: String!): User!
    updateUser(id: ID! name: String!): User!
    deleteUser(name: String!): Boolean!
    userTyping(name: String!): Boolean!

    createMessage(senderName: String! message: String! date: Float!): Message!
    updateMessage(id: ID! message: String!): Message!
    deleteMessage(id: String!): Boolean!
  }

  type Subscription {
    newMessage(message: String!): Message
    userTyping (message: String!): String
    newUser: User
    oldUser: String
  }
`;

module.exports = typeDefs;
