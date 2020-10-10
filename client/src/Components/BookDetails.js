import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";

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

  const renderParagraphs = () => {
    if (paragraphs.length < 1) {
      return;
    }

    return paragraphs.map((p) => {
      return (
        <>
          <p>{p.content}</p>
          <h4>Likes: {p.likes}</h4>
          <h4>{p.createdAt}</h4>
        </>
      );
    });
  };

  const renderComments = () => {
    if (comments.length < 1) {
      return;
    }

    return comments.map((comment) => {
      return (
        <>
          <div class="ui list">
            <div className="item">
              <div className="header">{comment.comment}</div>
              likes: {comment.likes}
            </div>
          </div>
        </>
      );
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
      <div
        className="ui negative submit button"
        onClick={() => history.goBack()}
      >
        Back to the list
      </div>
    </div>
    // <div style={{ paddingLeft: "10%" }}>
    //   <h1>{title}</h1>
    //   <p>genre: {genre}</p>
    //   <p>{about}</p>
    //   <p>likes: {likes}</p>
    //
    // </div>
  );
};
