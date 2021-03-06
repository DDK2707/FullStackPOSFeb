const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();


//configure database and mongoose
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuration ends here


//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configure morgan
// define first route
app.get("/", (req, res) => {
  console.log("Welcome to ...");
});
const userRoutes = require("./routes/usersRoute.js"); //bring in our user routes
const productRoutes = require("./routes/productsRoute.js"); //bring in product routes
app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});