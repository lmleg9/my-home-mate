const express = require("express")
const { getAllHomes, postOneHomes } = require("./controller");
const router = express.Router()

// Home page route.
router.get("/", function (req, res, next) {
  res.send("Welcome to My Homes Mate Server");
});

// About page route.
router.get("/homes", getAllHomes);

router.post("/homes", postOneHomes);

module.exports = router;