const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({});
      } else if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id });
      } else if (!args.author && args.genre) {
        return await Book.find({ genres: args.genre });
      } else if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        return await Book.find({ author: author._id, genres: args.genre });
      }
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return authors;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return {
        id: author._id,
        name: author.name,
        born: author.born,
      };
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      const foundBooks = await Book.find({ author: author._id });
      return foundBooks.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      let book = null;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const existingAuthor = await Author.findOne({ name: args.author });

      if (args.title.length < 5) {
        throw new GraphQLError("title too short, minimum length: 5", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (args.author.length < 4) {
        throw new GraphQLError("author name too short, minimum length: 4", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (args.published < 0) {
        throw new GraphQLError("book publishing cannot be negative", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (args.genres.length < 1) {
        throw new GraphQLError("book must have at least one genre", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (!existingAuthor) {
        const author = new Author({ name: args.author });
        author.born = null;
        await author.save();
        book = new Book({ ...args, author: author._id });
        await book.save();
      } else {
        book = new Book({ ...args, author: existingAuthor._id });
        await book.save();
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      } else {
        author.born = args.setBornTo;
        return await author.save();
      }
    },
    createUser: async (root, args) => {
      const existingUser = await User.findOne({ username: args.username });
      if (!existingUser) {
        const user = new User({
          username: args.username,
          favoriteGenre: args.favoriteGenre,
        });

        return user.save().catch((error) => {
          throw new GraphQLError("Creating the user failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error,
            },
          });
        });
      } else {
        throw new GraphQLError("username must be unique", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
