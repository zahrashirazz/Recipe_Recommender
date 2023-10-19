const User = require('../../dto/users');
const mongoose = require('mongoose');
const logger = require('../../helpers/logger')(module);

module.exports = async (username) => {
  try {
    const user = User.findOne({ "credentials.username": username });
    return user;

  } catch (error) {
    console.log(error);
    logger.log('info', `Error in Creating a new recipe ${JSON.stringify(error)}`);
    throw (error);
  }
};
