const graphql = require("graphql");
const dateQL = require("graphql-iso-date");

const Book = require("../models/Book");
const Paragraph = require("../models/Paragraph");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = graphql;

const { GraphQLDate } = dateQL;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    title: { type: GraphQLString },
    about: { type: GraphQLString },
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    createdAt: {
      type: GraphQLDate,
      resolve: () => new Date(),
    },
    // JWT auth should work w/ seperate server. JWT is perf for that. Now it won't be a monolith!
    //props should have seperate db as well so they don't rely on e/o
    //should use RS256  aysymetrical public private key for this kind of setup
    genre: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue, args) {
        return Book.findById(parentValue.id)
          .populate("comments")
          .then((book) => book.comments);
      },
    },
    paragraphs: {
      type: new GraphQLList(ParagraphType),
      resolve(parentValue, args) {
        return Book.findById(parentValue.id)
          .populate("paragraphs")
          .then((book) => book.paragraphs);
      },
    },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    comment: { type: GraphQLString },
    likes: { type: GraphQLString },
    id: { type: GraphQLID },
    createdAt: {
      type: GraphQLDate,
      resolve: () => new Date(),
    },
  }),
});

const ParagraphType = new GraphQLObjectType({
  name: "Paragraph",
  fields: () => ({
    content: { type: GraphQLString },
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    createdAt: {
      type: GraphQLDate,
      resolve: () => new Date(),
    },
  }),
});

module.exports = {
  BookType,
  CommentType,
  ParagraphType,
};
