var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../model/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("devoured", req.body.devoured);

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});

router.post("/", function(req, res) {
	console.log('Post Req',req.body);
  burger.insertOne([
    "burger_name"], [
    req.body.new_burger_name], function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;