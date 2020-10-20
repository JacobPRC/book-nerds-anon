import React, { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";

import Comment from "./Comment";
import ActionButtons from "./ActionButtons";
import Paragraph from "./Paragraph";
import EmbeddedForm from "./EmbeddedForm";
import Popup from "./PopUp";
import { useModal } from "../hooks/useModal";
import { DELETE_BOOK } from "../queries/mutations";
import ErrorPage from "./ErrorPage";

export default () => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { isShowing, toggle } = useModal();
  const [deleteBook] = useMutation(DELETE_BOOK);

  let params = useParams();
  let history = useHistory();

  const FETCH_BOOK = gql`
{
    book(id:  "${params.id}") {
      title
      genre
      about
      likes
      id
      comments {
        comment
        id
        likes
        createdAt
      }
      paragraphs {
        content
        likes
        id
        createdAt
      }
    }
  }
`;

  const { loading, error, data, refetch } = useQuery(FETCH_BOOK);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <ErrorPage />;

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
          id={p.id}
          query={FETCH_BOOK}
          bookId={data.book.id}
        />
      );
    });
  };

  const renderComments = () => {
    if (comments.length < 1) {
      return;
    }

    return comments.map((comment) => {
      return (
        <Comment
          comment={comment.comment}
          likes={comment.likes}
          query={FETCH_BOOK}
          id={comment.id}
          bookId={data.book.id}
        />
      );
    });
  };

  const removeBook = () => {
    deleteBook({ variables: { id: data.book.id } }).then(() =>
      history.push("/books")
    );
  };

  const showCommentFormFunc = () => {
    if (!showCommentForm) {
      return;
    }
    if (showCommentForm)
      return (
        <EmbeddedForm
          showCommentForm={() => setShowCommentForm(!showCommentForm)}
          id={params.id}
          query={FETCH_BOOK}
        />
      );
  };

  return (
    <div className="ui raised very padded text container segment">
      <h1 className="ui header">{title}</h1>
      <div
        className="ui icon button"
        data-tooltip="Delete Book"
        data-inverted=""
        onClick={toggle}
      >
        <i className="x icon"></i>
        <Popup action={removeBook} isShowing={isShowing} hide={toggle} />
      </div>
      {/* // make this a component. Having 2 in same component is fucking this up */}
      {/* //comments after buttons */}
      <h4>Likes: {likes}</h4>
      <h3 style={{ textAlign: "right" }}>Genre: {genre}</h3>
      <h3>{about}</h3>
      <br />
      {paragraphs.length < 1 ? null : <h2>Paragraphs:</h2>}
      {renderParagraphs()}
      <div
        className="ui icon button"
        data-tooltip="Add paragraph"
        data-inverted=""
        onClick={toggle}
      >
        <Link to={`/books/${params.id}/new-paragraph`}>
          <i className="plus icon"></i>
        </Link>
      </div>
      <br />
      <div style={{ border: "2px solid black" }}>
        {comments.length < 1 ? null : <h2>Comments:</h2>}
        {renderComments()}
        {showCommentFormFunc()}
      </div>
      <br />
      <hr />
      <div style={{ padding: "5%" }}>
        <ActionButtons
          id={params.id}
          query={FETCH_BOOK}
          showCommentForm={() => setShowCommentForm(!showCommentForm)}
          parent="book"
        />
      </div>
      <hr />
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
