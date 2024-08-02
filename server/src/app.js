const express = require("express");
const app = express();


const bodyParser = require("body-parser");

const cors = require("cors");
const { router } = require("./routes");

const dotenv = require("dotenv");
dotenv.config();


app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(cors());
app.use(router)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is running on port " + PORT);
});


