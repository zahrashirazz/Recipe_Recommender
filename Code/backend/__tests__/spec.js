const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const expect = require("chai").expect;
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");
let should = chai.should();
//const userAuthModel = require("../dao/users/userAuthModel");
//const recipesDAO = require("../dao/recipes/recipesDAO");
const updateRecipe = require("../dao/recipes/updateRecipe");
const addNewRecipe = require("../dao/recipes/addNewRecipe");
const getAllRecipe = require("../dao/recipes/getAllRecipe");
const autocompleteRecipe = require("../dao/recipes/getAutoComplete");
const countRecipe = require("../dao/recipes/getTotalRecipeCount");
const request = require("supertest")("http://localhost:8000/api/v1");
const estabDbConnection = require("../helpers/dbConnect");

chai.use(chaiHttp);
estabDbConnection();
describe("checking api", () => {

  it("is the API is functional test 1", async function () {
    const response = await request.get("/recipes?CleanedIngredients=EgG");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 2", async function () {
    const response = await request.get("/recipes?CleanedIngredients=cream");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 3", async function () {
    const response = await request.get("/recipes?CleanedIngredients=egg");
    console.log(response);
    console.log(response.status);
    expect(response.status).to.eql(200);
    });

  it("is the API is functional test 4", async function () {
    const response = await request.get("/recipes/recipe/autocomplete/ja");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 5", async function () {
    const response = await request.get("/recipes/recipe/autocomplete/xxx");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 6", async function () {
    const response = await request.post("/recipes/recipe")
                        .send({"TranslatedRecipeName":"Jay's Subji",
                        "TranslatedInstructions":"Fry the veggies in oil and add salt and spices as reqd",
                        "TotalTimeInMins":15,
                        "Cuisine":"Indian",
                        "CleanedIngredients": ["veggies","oil","spices","salt"],
                        "ImageUrl":"https://www.thecookierookie.com/wp-content/uploads/2023/02/featured-vegetable-stir-fry-recipe.jpg",
                        "URL":"https://www.thecookierookie.com/wp-content/uploads/2023/02/featured-vegetable-stir-fry-recipe.jpg",
                        "IngredientCount":4});

    expect(response);
  });

  it("is the API is functional test 7", async function () {
    const response = await request.get("/recipes?CleanedIngredients={egg,cream}");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 8", async function () {
    const response = await request.get("/recipes?CleanedIngredients={egg,onion}");
    console.log(response.body);
    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 9", async function () {
    const response = await request.get("/recipes?CleanedIngredients={ice cream,cake}");

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 10", async function () {
    const response = await request.get("/recipes?CleanedIngredients={}");

    expect(response.status).to.eql(200);
    });

  it("is the API is functional test 11", async function () {
    const response = await request.put("/recipes/recipe")
                        .send({
                        "TranslatedRecipeName":"Jay's Subji",
                        "TranslatedInstructions":"Fry the veggies in oil and add salt and spices as reqd",
                        "TotalTimeInMins":15,
                        "Cuisine":"Indian",
                        "CleanedIngredients": ["veggies","oil","spices","salt","extras"],
                        "ImageUrl":"https://www.thecookierookie.com/wp-content/uploads/2023/02/featured-vegetable-stir-fry-recipe.jpg",
                        "URL":"https://www.thecookierookie.com/wp-content/uploads/2023/02/featured-vegetable-stir-fry-recipe.jpg",
                        "IngredientCount":4
                        });

    expect(response.status).to.eql(200);
    });

  it("is the API is functional test 12", async function () {
    const response = await request.put("/recipes/recipe")
                        .send({
                        "TranslatedRecipeName":"Does not exist",
                        "TranslatedInstructions":"No action",
                        "TotalTimeInMins":15,
                        "Cuisine":"None",
                        "CleanedIngredients": ["none"],
                        "ImageUrl":"https://www.thecookierookie.com/wp-content/uploads/2023/02/featured-vegetable-stir-fry-recipe.jpg",
                        "URL":"https://www.thecookierookie.com/wp-content/uploads/2023/02/featured-vegetable-stir-fry-recipe.jpg",
                        "IngredientCount":1
                        });

    expect(response.status).to.eql(200);
    });
});
