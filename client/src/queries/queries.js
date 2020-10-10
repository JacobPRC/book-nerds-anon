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
