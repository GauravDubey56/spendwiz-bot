// const { MongoClient } = require("mongodb");
// const config = require('../utils/config');

// export const getDbClient = (url) => {
//   return new MongoClient(url);
// };

// export const getDbConnection = async () => {
//   const client = getDbClient(config.MONGO_URI);
//   await client.connect();
//   const db = client.db(config.DB_NAME);
//   return db;
// };

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.log(`Error: ${err.message}`);
    throw err;
  }
};

module.exports = {
    connectDB
}
