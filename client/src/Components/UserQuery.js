import gql from 'graphql-tag';

const UserQuery = gql`
  query {
    users {
      id
      name
      image
      messages {
        id
        message
        senderName
        date
      }
    }
  }
`;

const CreateUserMutation = gql`
  mutation($name: String!, $image: String!) {
    createUser(name: $name, image: $image) {
      name
      image
      id
      messages {
        message
        senderName
        date
      }
    }
  }
`;

const DeleteUserMutation = gql`
  mutation($name: String!) {
    deleteUser(name: $name)
  }
`;

const AddUserSubscription = gql`
  subscription {
    newUser {
      name
      image
      id
      messages {
        message
        senderName
        date
      }
    }
  }
`;

const DeleteUserSubscription = gql`
  subscription {
    oldUser
  }
`;

export {
  UserQuery,
  CreateUserMutation,
  DeleteUserMutation,
  AddUserSubscription,
  DeleteUserSubscription
};
