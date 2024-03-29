const router = require("express").Router();

const accountController = require("../../controllers/accountController");
const transactionController = require("../../controllers/transactionController");
const userController = require("../../controllers/userController");

// Endpoint Users
router.post("/users", userController.register);
router.get("/users", userController.index);
router.get("/users/:id", userController.show);
router.delete("/users/:id", userController.delete);
router.put("/users/:id", userController.update);

// Endpoint Accounts
router.post("/accounts", accountController.create);
router.get("/accounts", accountController.index);
router.get("/accounts/:id", accountController.show);
router.put("/accounts/:id", accountController.update);
router.delete("/accounts/:id", accountController.delete);

// Endpoint transactions
router.post("/transactions", transactionController.create);
router.get("/transactions", transactionController.index);
router.get("/transactions/:id", transactionController.show);
router.delete("/transactions/:id", transactionController.delete);

module.exports = router;
