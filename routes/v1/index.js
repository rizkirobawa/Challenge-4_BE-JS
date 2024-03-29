const router = require("express").Router();

const accountController = require("../../controllers/accountController");
const userController = require("../../controllers/userController");


// Endpoint Users
router.post("/users", userController.register);
router.get("/users", userController.index);
router.get("/users/:id", userController.show);
router.delete("/users/:id",userController.delete)
router.put("/users/:id",userController.update)

// Endpoint Accounts
router.post("/accounts", accountController.create);
router.get("/accounts", accountController.index);
router.get("/accounts/:id", accountController.show);
router.put("/accounts/:id",accountController.update)
router.delete("/accounts/:id",accountController.delete)



module.exports = router;
