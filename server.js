const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const genLedgerRoutes = require("./routes/genLedger");
const depositRoutes = require("./routes/deposit");
const userRoutes = require("./routes/user");

// initialise the express App
const app = express();
const PORT = process.env.PORT || 500;

// register a global middleware
app.use(express.json()); // to be use in accessing the request body
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});



// serving the front end
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});


  // setup a route handler
//app.use('/api/genLedger', genLedgerRoutes)
app.use("/api/deposit", depositRoutes);
app.use("/api/user", userRoutes);

/// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for a request in a certain port number.
    // through the use of the .env
    app.listen(PORT, () => {
      console.log("connect to MongoDB and listening on port");
    });
  })
  .catch((error) => {
    console.log(error);
  });

