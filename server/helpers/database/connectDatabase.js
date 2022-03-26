const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDb Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDatabase;
