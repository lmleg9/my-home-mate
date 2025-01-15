const express = require("express")
const { getAllHomes, postOneHomes, createUser, getAllUsers, getFlatmatesForHome } = require("./controller");
const router = express.Router()

// Home page route.
router.get("/", function (req, res, next) {
  res.send("Welcome to My Homes Mate Server");
});

// About page route.
router.get("/homes", getAllHomes);

router.post("/homes", postOneHomes);

// Users routes
router.post("/users", createUser);
router.get("/users", getAllUsers);
router.get("/homes/:homeId/flatmates", getFlatmatesForHome);

module.exports = router;