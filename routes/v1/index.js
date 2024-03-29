const router = require("express").Router();

const userController = require("../../controllers/userController");

router.post("/users", userController.register);
router.get("/users", userController.index);
router.get("/users/:id", userController.show);
router.delete("/users/:id",userController.delete)
router.put("/users/:id",userController.update)

module.exports = router;
