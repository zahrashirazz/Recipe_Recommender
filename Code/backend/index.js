const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require('./handler/router');
const logger = require('./helpers/logger')(module);
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');


dotenv.config();
//DB port number
const port = process.env.PORT || 8000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "v1",
      title: 'Recipe Recommender API',
      description: 'This is a Software Engineering project',
      contact: {
        name: "SE Project Team 14 2023"
      },
    },
  },
  apis: ["./handler/**/*.js"]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: false, customSiteTitle: "Recipe Recommender + Api", customCss: '.swagger-ui .topbar {display:none}' }));
app.use('/api', router);


/**
 * Establish Connection to MongoDB
 */
const estabDbConnection = async () => {
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
estabDbConnection();

//Error thrown when page is not found
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = app;
