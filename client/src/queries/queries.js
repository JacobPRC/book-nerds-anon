import { gql } from "@apollo/client";

export const FETCH_BOOKS = gql`
  {
    books {
      title
      id
      createdAt
    }
  }
`;

export const FETCH_BOOK = gql`
  query FetchBook($ID: ID!) {
    book(id: $ID) {
      title
      genre
      id
      createdAt
      likes
      comments {
        comment
        likes
        createdAt
        id
      }
      paragraphs {
        content
        likes
        createdAt
      }
    }
  }
`;
