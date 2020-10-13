import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";

import Comment from "./Comment";
import ActionButtons from "./ActionButtons";
import Paragraph from "./Paragraph";

export default () => {
  let params = useParams();
  let history = useHistory();

  const FETCH_BOOK = gql`
{
    book(id:  "${params.id}") {
      title
      genre
      about
      likes
      comments {
        comment
        likes
        createdAt
      }
      paragraphs {
        content
        likes
        createdAt
      }
    }
  }
`;

  const { loading, error, data, refetch } = useQuery(FETCH_BOOK);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error! {error.message}</h1>;

  const { title, genre, about, likes, comments, paragraphs } = data.book;
  refetch();

  const renderParagraphs = () => {
    if (paragraphs.length < 1) {
      return;
    }

    return paragraphs.map((p) => {
      return (
        <Paragraph
          content={p.content}
          likes={p.likes}
          createdAt={p.createdAt}
        />
      );
    });
  };

  const renderComments = () => {
    if (comments.length < 1) {
      return;
    }

    return comments.map((comment) => {
      return <Comment comment={comment.comment} likes={comment.likes} />;
    });
  };

  return (
    <div className="ui raised very padded text container segment">
      <h1 className="ui header">{title}</h1>
      <h4>Likes: {likes}</h4>
      <h3 style={{ textAlign: "right" }}>Genre: {genre}</h3>
      <h3>{about}</h3>
      <br />
      {paragraphs.length < 1 ? null : <h2>Paragraphs:</h2>}
      {renderParagraphs()}
      <br />
      {comments.length < 1 ? null : <h2>Comments:</h2>}
      {renderComments()}
      <ActionButtons id={params.id} query={FETCH_BOOK} />
      <div
        className="ui negative submit button"
        onClick={() => history.goBack()}
      >
        Back to the list
      </div>
    </div>
  );
};

//bc of action button component, the add p and and comment will probs just return true or false
//I will need this component to read it and decide to render a form or not.
//kinda like render comment/p funcs
