const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    console.log(process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL, {
      // useCreateIndex: true,
      // useFindAndModify: false,
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });
    console.log("Db is Connected Successfully");
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

module.exports = dbConnect;
