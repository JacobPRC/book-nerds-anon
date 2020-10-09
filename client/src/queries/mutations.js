import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $about: String, $genre: String) {
    addBook(title: $title, about: $about, genre: $genre) {
      title
    }
  }
`;

export const EDIT_BOOK_TITLE = gql`
  mutation EditBookTitle($id: ID!, $title: String!) {
    editBookTitle(id: $id, title: $title) {
      title
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export const EDIT_BOOK_DESCRIPTION = gql`
  mutation EditBookDescription($id: ID!, $about: String!) {
    editBookDescription(id: $id, about: $about) {
      id
    }
  }
`;

export const LIKE_BOOK = gql`
  mutation LikeBook($id: ID!) {
    likeBook(id: $id) {
      id
    }
  }
`;

export const UNLIKE_BOOK = gql`
  mutation UnlikeBook($id: ID!) {
    unlikeBook(id: $id) {
      id
    }
  }
`;

export const LIKE_PARAGRAPH = gql`
  mutation LikeParagraph($id: ID!) {
    likeParagraph(id: $id) {
      id
    }
  }
`;

export const UNLIKE_PARAGRAPH = gql`
  mutation UnlikeParagraph($id: ID!) {
    unlikeParagraph(id: $id) {
      id
    }
  }
`;

export const LIKE_COMMENT = gql`
  mutation LikeComment($id: ID!) {
    likeComment(id: $id) {
      id
    }
  }
`;

export const UNLIKE_COMMENT = gql`
  mutation UnlikeComment($id: ID!) {
    unlikeComment(id: $id) {
      id
    }
  }
`;

export const ADD_COMMENT_TO_BOOK = gql`
  mutation AddCommentToBook($id: ID!, $comment: String!) {
    addCommentToBook(id: $id, comment: $comment) {
      id
    }
  }
`;

export const EDIT_BOOK_COMMENT = gql`
  mutation EditBookComment($id: ID!, $comment: String!) {
    editBookComment(id: $id, comment: $comment) {
      id
    }
  }
`;

export const DELETE_BOOK_COMMENT = gql`
mutation DeleteBookComment($id: ID!, bookId: ID!){
    deleteBookComment(id: $id, bookId: $bookId){
        id
    }
}
`;

export const ADD_PARAGRAPH_TO_BOOK = gql`
  mutation AddParagraphToBook($id: ID!, $content: content) {
    addParagraphToBook(id: $id, content: $content) {
      id
    }
  }
`;

export const EDIT_PARAGRAPH = gql`
  mutation editParagraph($id: ID!, $content: content) {
    editParagraph(id: $id, content: $content) {
      id
    }
  }
`;

export const DELETE_PARAGRAPH = gql`
mutation DeleteParagraph($id: ID!, bookId: ID!){
    deleteParagraph(id: $id, bookId: $bookId){
        id
    }
}
`;

export const ADD_BOOK_GENRE = gql`
  mutation AddBookGenre($id: ID!, $genre: String!) {
    addBookGenre(id: $id, genre: $genre) {
      id
    }
  }
`;

export const EDIT_BOOK_GENRE = gql`
  mutation EditBookGenre($id: ID!, $genre: String!) {
    editBookGenre(id: $id, genre: $genre) {
      id
    }
  }
`;
