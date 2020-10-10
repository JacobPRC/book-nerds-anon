const graphql = require("graphql");

const Book = require("../models/Book");
const Comment = require("../models/Comment");
const Paragraph = require("../models/Paragraph");
const Types = require("./Types");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} = graphql;

const { BookType, ParagraphType, CommentType } = Types;

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parentValue, args) {
        return Book.find({});
      },
    },
    book: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Book.findById(id);
      },
    },
    bookByTitle: {
      type: BookType,
      args: { title: { type: new GraphQLNonNull(GraphQLString) } },
      resolve(parentValue, { title }) {
        return Book.findOne({ title });
      },
    },
    comment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Comment.findById(id);
      },
    },
    paragraph: {
      type: ParagraphType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Paragraph.findById(id);
      },
    },
  },
});

module.exports = RootQuery;
