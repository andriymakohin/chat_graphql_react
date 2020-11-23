import gql from 'graphql-tag';

const MessageQuery = gql`
  query {
    messages {
      id
      message
      senderName
      date
      users {
        name
      }
    }
  }
`;

const CreateMessageMutation = gql`
  mutation(
    $message: String!
    $senderName: String!
    $date: Float!
  ) {
    createMessage(
      message: $message
      senderName: $senderName
      date: $date
    ) {
      message
      senderName
      id
      date
      users {
        name
      }
    }
  }
`;

// const UserTypingMutation = gql`
//   mutation($name: String!, $senderName: String!) {
//     userTyping(name: $name, senderName: $senderName)
//   }
// `;

const MessageSubscription = gql`
  subscription($message: String!) {
    newMessage(message: $message) {
      message
      senderName
      id
      date
      users {
        name
        date
      }
    }
  }
`;

// const UserTypingSubscription = gql`
//   subscription($senderName: String!) {
//     userTyping(senderName: $senderName)
//   }
// `;

export {
  MessageQuery,
  CreateMessageMutation,
  // UserTypingMutation,
  MessageSubscription,
  // UserTypingSubscription
};
