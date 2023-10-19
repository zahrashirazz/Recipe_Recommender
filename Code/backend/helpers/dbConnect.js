const logger = require('./logger')(module);
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

/**
 * Establish Connection to MongoDB
 */
module.exports  = async () => {
  try {
    await mongoose.connect(process.env.RECIPES_DB_URI, {
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true,
    });
    logger.log('info', 'Mongo DB Connection Established');
  } catch (error) {
    console.log('ERROR DB CONNECTION MONGO', error);
    logger.log('error', `Mongo DB Connection ERROR, ${JSON.stringify(error)}`);
  }
};