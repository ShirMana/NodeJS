const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const mongoose = require("mongoose");

//connecting to mongo DB from an ip address (where the DB is on it)
mongoose
  .connect("mongodb://localhost/my_rest_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB...."))
  .catch((err) => console.log("Could not connect to MongoDB..." + err));


//routes to different locations
app.use(cors());
app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cards", cards);

//approach to a specific port 
const port = process.env.PORT || 3000;

//listening to the specific port
http.listen(port, () =>
  console.log(`Listening to port ${port}, click http://localhost:${port}`)
);
