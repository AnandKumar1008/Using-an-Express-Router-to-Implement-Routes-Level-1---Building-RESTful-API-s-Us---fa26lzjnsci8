const fs = require("fs");
const express = require("express");
const app = express();
const router = new express.Router();
//Aim: With the help of router, get all the product with router.GET request and create a product with router.POST request

//middleware
//write router middleware here
app.use(express.json());
app.use(router);

//Including product.json file
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/product.json`)
);

// Defining The Router
// Get all the products
router.get("/api/v1/product", (req, res) => {
  try {
    //Write your code here
    // console.log(product);
    // console.log("request coming");
    res.status(200).json({
      status: "success",

      results: 10,

      data: {
        product: [...product],
      },
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

//Create a new Product
router.post("/api/v1/product", (req, res) => {
  try {
    //Write your code here
    if (!req.body.title || !req.body.price) {
      res.status(404).json({
        message: "Title and price are required",

        status: "Error",
      });
    } else {
      const toAdd = req.body;
      toAdd.id = product.length + 1;
      product.push({ ...toAdd });
      fs.writeFile(
        `${__dirname}/../dev-data/product.json`,
        JSON.stringify(product),
        (err) => {
          res.status(201).json({
            status: "Success",

            data: {
              product: {
                ...toAdd,
              },
            },
          });
        }
      );
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//Registering our Router
//Write here to register router

module.exports = app;
