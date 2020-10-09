const graphql = require("graphql");

const Book = require("../models/Book");
const Comment = require("../models/Comment");
const Paragraph = require("../models/Paragraph");
const Types = require("./Types");

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull } = graphql;

const { BookType, ParagraphType, CommentType } = Types;

const removeIdFromNestedArr = (id, arr) => {
  const idToRemove = arr.indexOf(id);
  if (idToRemove >= 0) {
    return arr.splice(idToRemove, 1);
  }
};

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        about: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parentValue, { title, about, genre }) {
        return new Book({ title, about, genre }).save();
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
    addCommentToBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id, comment }) {
        return new Comment({ comment }).save().then((comment) => {
          return Book.findByIdAndUpdate(
            id,
            { $push: { comments: comment._id } },
            { new: true, useFindAndModify: false }
          );
        });
      },
    },
    editBookComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        comment: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id, comment }) {
        return Comment.findByIdAndUpdate(id, { comment });
      },
    },
    deleteBookComment: {
      type: CommentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        bookId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id, bookId }) {
        return Book.findById(bookId)
          .then((book) => {
            removeIdFromNestedArr(id, book.comments);
            return book.save();
          })
          .then(() => Comment.findByIdAndDelete(id));
      },
    },
    addParagraphToBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id, content }) {
        return new Paragraph({ content }).save().then((p) => {
          return Book.findByIdAndUpdate(
            id,
            { $push: { paragraphs: p._id } },
            { new: true, useFindAndModify: false }
          );
        });
      },
    },
    editParagraph: {
      type: ParagraphType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id, content }) {
        return Paragraph.findByIdAndUpdate(id, { content });
      },
    },
    deleteParagraph: {
      type: ParagraphType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        bookId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parentValue, { id, bookId }) {
        return Book.findById(bookId)
          .then((book) => {
            removeIdFromNestedArr(id, book.paragraphs);
            return book.save();
          })
          .then(() => Paragraph.findByIdAndDelete(id));
      },
    },
    addBookGenre: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id, genre }) {
        return Book.findByIdAndUpdate(id, { genre });
      },
    },
    editBookGenre: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, { id, genre }) {
        return Book.findByIdAndUpdate(id, { genre });
      },
    },
  },
});

module.exports = mutation;
