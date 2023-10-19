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
/*
  it("is the API is functional test 8", async function () {
    const response = await request.get(
      "/recipes?CleanedIngredients={salt, mango}"
    );

    expect(response.status).to.eql(200);
  });

  it("is the API is functional test 9", async function () {
    const response = await request.get("/recipes?CleanedIngredients={}");

    expect(response.status).to.eql(200);
  });

  it("is the API is fetching the filtered ingredient", async function () {
    const response = await request.get("/recipes?CleanedIngredients=pear");

    expect(response.body.filters.CleanedIngredients).to.eql("pear");
  });

  it("is the API is fetching calories", async function () {
    const response = await request.get(
      "/recipes?Cleaned-Ingredients=salt,mint,peanuts"
    );

    expect(response.body.calories).to.not.eql(0);
  });

  it("is the API is fetching calories", async function () {
    const response = await request.get(
      "/recipes?Cleaned-Ingredients=mAnGo,SaLT,pEanUTs"
    );

    expect(response.body.calories).to.not.eql(0);
  });

  it("is the email being sent to the recipent", async function () {
    const response = await request.get(
      "/recipes?Email='thosaniparth0@gmail.com',Flag=true,CleanedIngredients=mango"
    );

    expect(response.status).to.eql(200);
  });

  it("is the API is fetching users", async function () {
    const response = await request.get("/users/getAllUsers");

    expect(response.status).to.eql(200);
  });
  it("is the API is authorizing users", async function () {
    const response = await request
      .post("/users/authorizeUser")
      .send({ username: "hello", password: "world" });

    expect(response.status).to.eql(200);
  });
  it("invalid username", async function () {
    const response = await request
      .post("/users/authorizeUser")
      .send({ username: "hello1", password: "world" });

    expect(response.status).to.eql(404);
  });
  it("invalid password", async function () {
    const response = await request
      .post("/users/authorizeUser")
      .send({ username: "hello", password: "world1" });

    expect(response.status).to.eql(500);
  });
  it("save recipe not working", async function () {
    const response = await request
      .post("/users/saveRecipe")
      .send({ username: "hello", recipeID: "614f8fcc0f571ff03e10ba65" });

    expect(response.status).to.eql(404);
  });

  it("invalid password", async function () {
    const response = await request
      .post("/users/authorizeUser")
      .send({ username: "hello", password: "world12" });

    expect(response.status).to.eql(500);
  });*/
});
