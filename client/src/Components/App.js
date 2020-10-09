import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./HomePage";
import BookDetails from "./BookDetails";
import NewBookForm from "./NewBookForm";
import BookList from "./BookList";

export default () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/books" exact component={BookList} />
          <Route path="/books/new" exact component={NewBookForm} />
          <Route path="/books/:id" exact component={BookDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
