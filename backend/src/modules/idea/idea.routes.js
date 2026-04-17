const express = require("express");
const router = express.Router();

const controller = require("./idea.controller");
const auth = require("../../middleware/auth.middleware");

// Create idea + AI validation
router.post("/", auth, controller.createIdea);

// Get all ideas of user
router.get("/", auth, controller.getIdeas);

// Get single idea
router.get("/:id", auth, controller.getIdea);



router.post("/:id/regenerate", auth, controller.regenerateIdea);
module.exports = router;