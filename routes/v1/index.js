const router = require("express").Router();

const userController = require("../../controllers/userController");

router.post("/users", userController.register);
router.get("/users", userController.index);
router.get("/users/:id", userController.show);

module.exports = router;
