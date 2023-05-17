require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const path = require('path');
const genLedgerRoutes = require("./routes/genLedger");
const depositRoutes = require("./routes/deposit");
const userRoutes = require("./routes/user");
const PORT = process.env.port || 3000

// initialise the express App
const app = express();

// register a global middleware
 app.use(express.json()); // to be use in accessing the request body
 app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
    
});

// setup a route handler
//app.use('/api/genLedger', genLedgerRoutes)
app.use("/api/deposit", depositRoutes);
app.use("/api/user", userRoutes);


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


/// connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for a request in a certain port number.
    // through the use of the .env
    app.listen(PORT, async () => {
      console.log(`connect to MongoDB and listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

