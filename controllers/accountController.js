const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  create: async (req, res, next) => {
    try {
      let { bank_name, bank_account_number, balance, user_id } = req.body;

      const existingUser = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!existingUser) {
        return res.status(404).json({
          status: false,
          message: `User with ID ${user_id} not found`,
        });
      }

      const newBankAccount = await prisma.bankAccount.create({
        data: {
          bank_name,
          bank_account_number,
          balance,
          user: {
            connect: { id: user_id },
          },
        },
      });

      res.status(201).json({
        status: true,
        message: `Bank Account createad successfully`,
        data: newBankAccount,
      });
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      let accounts = await prisma.bankAccount.findMany();

      res.status(200).json({
        status: true,
        message: "OK",
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      let accounts = await prisma.bankAccount.findUnique({
        where: { id: id },
      });

      if (!accounts) {
        return res.status(404).json({
          status: false,
          message: `Can't find account with ID ${id}`,
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const { bank_name, bank_account_number, balance } = req.body;

      let accounts = await prisma.bankAccount.update({
        where: { id: id },
        data: {
          bank_name: bank_name,
          bank_account_number: bank_account_number,
          balance: balance,
        },
      });

      if (!accounts) {
        return res.status(404).json({
          status: false,
          message: `Account with ID ${id} not found`,
        });
      }

      res.status(200).json({
        status: true,
        message: `Update account with ID ${id} successfully`,
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = Number(req.params.id);

      let accounts = await prisma.bankAccount.findUnique({ where: { id: id } });

      if (!accounts) {
        return res.status(404).json({
          status: false,
          message: `User with ID ${id} not found`,
          data: null,
        });
      }

      await prisma.bankAccount.delete({
        where: { id },
      });

      res.status(200).json({
        status: true,
        message: `Account with ID ${id} deleted successfully`,
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
