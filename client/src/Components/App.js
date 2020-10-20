import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "../app.css";

import HomePage from "./HomePage";
import BookDetails from "./BookDetails";
import NewBookForm from "./NewBookForm";
import BookList from "./BookList";
import Header from "./Header";
import PopUp from "./PopUp";
import ParagraphForm from "./ParagraphForm";

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/books" exact component={BookList} />
          <Route path="/books/new" exact component={NewBookForm} />
          <Route path="/books/:id" exact component={BookDetails} />
          <Route path="/books/error" exact component={PopUp} />
          <Route
            path="/books/:id/new-paragraph"
            exact
            component={ParagraphForm}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
