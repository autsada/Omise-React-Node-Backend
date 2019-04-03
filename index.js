const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const checkoutRoutes = require('./routes/checkoutRoutes')

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(checkoutRoutes)

app.listen(80, () => {
  console.log("Server is up");
});
