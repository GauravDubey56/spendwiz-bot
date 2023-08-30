const MongoClient = require("mongodb").MongoClient;
const config = require('../utils/config');
const mongoose = require("mongoose");
const getDbClient = (url) => {
  return new MongoClient(url);
};

const getDbConnection = async () => {
  const client = getDbClient(config.MONGO_URI);
  await client.connect();
  const db = client.db(config.DB_NAME);
  return db;
};
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
  connectDB,
  getDbConnection
};
