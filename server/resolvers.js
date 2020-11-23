const { PubSub, withFilter } = require("graphql-yoga");
const { User, Message } = require('./models');

const resolvers = {
  Query: {
    users: () => User.find(),
    messages: () => Message.find()
  },

  User: {
    messages: async ({name}) => {
      return Message.find({ senderName: name });
    }
  },

  Message: {
    users: async ({ senderName }) => {
      return User.find({ name: senderName });
    }
  },

  Mutation: {
    createUser: async (_, { name, image}) => {
      const user = new User({name, image});
      await user.save();
      pubsub.publish("newUser", { newUser: user });
      return user;
    },

    updateUser: async (_, { id, name }) => {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true }
      );
      return user;
    },

    deleteUser: async (_, {name }) => {
      await Promise.all([
        User.findOneAndDelete({  name: name }),
        Message.deleteMany({ senderName: name })
      ]);
      pubsub.publish("oldUser", { oldUser: name });
      return true;
    },

    userTyping: (_, { name }) => {
      pubsub.publish("userTyping", { userTyping: name });
      return true;
    },

    createMessage: async (
      _,
      { senderName, message, date }
    ) => {
      const userText = new Message({
        senderName,
        message,
        date
      });
      await userText.save();
      pubsub.publish("newMessage", {
        newMessage: userText
      });
      return userText;
    },

    updateMessage: async (_, { id, message }) => {
      const userText = await Message.findOneAndUpdate(
        { _id: id },
        { message },
        { new: true }
      );
      return userText;
    },

    deleteMessage: async (_, { id }) => {
      await Message.findOneAndDelete({ _id: id });
      return true;
    }
  },

  Subscription: {
    newMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("newMessage"),
        (payload, variables) => {
          return payload.message === variables.message;
        }
      )
    },

    newUser: {
      subscribe: (_, {}, { pubsub }) => {
        return pubsub.asyncIterator("newUser");
      }
    },

    oldUser: {
      subscribe: (_, {}, { pubsub }) => {
        return pubsub.asyncIterator("oldUser");
      }
    },

    userTyping: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("userTyping"),
        (payload, variables) => {
          return payload.message === variables.message;
        }
      )
    }
  }
};

const pubsub = new PubSub();

module.exports = resolvers;
