// // Equivalent to `parent.children.pull(_id)`
// parent.children.id(_id).remove();
// // Equivalent to `parent.child = null`
// parent.child.remove();
// parent.save(function (err) {
//   if (err) return handleError(err);
//   console.log('the subdocs were removed');
// });

// good tips for doing shit w/ embedded models: https://bezkoder.com/mongoose-one-to-many-relationship/

const graphql = require("graphql");
const dateQL = require("graphql-iso-date");

const Book = require("../models/Book");
const Comment = require("../models/Comment");
const Paragraph = require("../models/Paragraph");
const Genre = require("../models/Genre");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLSchema,
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
    genre: {
      type: GenreType,
      resolve(parentValue, args) {
        return Book.findById(parentValue.id)
          .populate("genre")
          .then((book) => book.genre);
      },
    },
    comments: {
      type: CommentType,
      resolve(parentValue, args) {
        return Book.findById(parentValue.id).populate("comments");
      },
    },
    paragraphs: {
      type: ParagraphType,
      resolve(parentValue, args) {
        return Book.findById(parentValue.id).populate("paragraph");
      },
    },
  }),
});

const GenreType = new GraphQLObjectType({
  name: "Genre",
  fields: () => ({
    genre: { type: GraphQLString },
    description: { type: GraphQLString },
    id: { type: GraphQLID },
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
    comments: {
      type: CommentType,
      resolve(parentValue, args) {
        Paragraph.findById(parentValue.id).populate("comments");
      },
    },
  }),
});

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
    genre: {
      type: GenreType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Genre.findById(id);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLString },
      },
      resolve(parentValue, { title, about }) {
        return new Book({ title, about }).save();
      },
    },
    editBookTitle: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id, title }) {
        return Book.findByIdAndUpdate(id, { title });
      },
    },
    deleteBook: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Book.findByIdAndDelete(id);
      },
    },
    addBookDescription: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        about: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id, about }) {
        return Book.findByIdAndUpdate(id, { about });
      },
    },
    editBookDescription: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        about: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id, about }) {
        return Book.findByIdAndUpdate(id, { about });
      },
    },
    likeBook: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Book.findById(id).then((book) => {
          ++book.likes;
          return book.save();
        });
      },
    },
    unlikeBook: {
      type: BookType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Book.findById(id).then((book) => {
          --book.likes;
          return book.save();
        });
      },
    },
    likeParagraph: {
      type: ParagraphType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Paragraph.findById(id).then((paragraph) => {
          ++paragraph.likes;
          return paragraph.save();
        });
      },
    },
    unlikeParagraph: {
      type: ParagraphType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Paragraph.findById(id).then((paragraph) => {
          --paragraph.likes;
          return paragraph.save();
        });
      },
    },
    likeComment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Comment.findById(id).then((comment) => {
          ++comment.likes;
          return comment.save();
        });
      },
    },
    unlikeComment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Comment.findById(id).then((comment) => {
          --comment.likes;
          return comment.save();
        });
      },
    },
  },
});

//What  mutations?
//AddCommentToBook, EditBookComment, DeleteBookComment
//AddCommentToPagraph, editParaComment deleteParacomment, AddGenre, AddBookToGenre,

module.exports = new GraphQLSchema({ query: RootQuery, mutation });
