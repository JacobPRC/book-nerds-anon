const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const schema = require("./schema/schema");

const app = express();

mongoose.connect(
  keys.mongoURI,
  { useFindAndModify: false },
  { useNewUrlParser: true }
);

require("./models/Book");
require("./models/Comment");
require("./models/Paragraph");

app.use(cors());
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => console.log("listening on 4000"));
