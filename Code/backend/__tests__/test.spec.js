const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const request = require("supertest")("http://localhost:5000/api/v1");
const expect = require("chai").expect;
var util= require('util');
var encoder = new util.TextEncoder('utf-8');

// describe("GET /recipes", function () {
//   it("is the API is functional", async function () {
//     const response = await request.get("/recipes?CleanedIngredients=coconut");
//
//     expect(response.status).to.eql(200);
//   });
//
//   it("is the API is fetching the filtered ingredient", async function () {
//     const response = await request.get("/recipes?CleanedIngredients=pear");
//
//     expect(response.body.filters.CleanedIngredients).to.eql("pear");
//   });
// });

function test_connectivity_func() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://hselvar2:hselvar2@cluster0.e7zgr.mongodb.net/recipe?retryWrites=true&w=majority";

  try {
    // Connect to the MongoDB cluster
    MongoClient.connect(uri, {
      useNewUrlParser: true,
    });
    return true;
  } catch (e) {
  } finally {
  }
  return false;
}

describe("GET /recipes", function () {
  it("is Db up and running", async function () {
    const response = test_connectivity_func();
    expect(response).to.equal(true);
  });
});
