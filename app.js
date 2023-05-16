require("dotenv").config();

const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors");
const { errors } = require("celebrate");
const errorHandler = require("./middlewares/errorHandler");
const rootRoute = require("./routes/index");

const {PORT, MONGO_URL} = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

app.use(cors);

app.use("/api", rootRoute);

app.use(errorHandler);

app.use(errors());

app.listen(PORT, () => {
  console.log(`Server start! PORT: ${PORT}`);
});