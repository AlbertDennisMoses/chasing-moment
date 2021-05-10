const mongoose = require("mongoose");

mongoose
  .connect(
    //   .connect(process.env.MONGODB_URI, {
    `mongodb://localhost:27017/Chasing-Moment`,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err.message));
