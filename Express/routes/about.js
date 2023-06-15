const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.send("This is the about page");
  res.end();
});

module.exports = router;
