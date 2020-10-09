const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const schema = require("./schema/schema");

const app = express();

//if I want to expand the backend, maybe add a spell check. Check this API:
//https://docs.microsoft.com/en-us/azure/cognitive-services/bing-spell-check/quickstarts/nodejs
//they also have apis w/ docs for moderation. Maybe that'd be cool for this or maybe focus on that
//for nxt app?

//Maybe I can have users? This may be last "full stack" app for a bit since I want the nxt to b
//JAM stack. So maybe these users can have a profile where it shows the books that they've liked and
// small bio. But no nesting and whatnot. Sound good?
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
