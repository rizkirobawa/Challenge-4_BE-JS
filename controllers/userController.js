const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  register: async (req, res, next) => {
    try {
      let { name, email, password, identity_type, identity_number, address } =
        req.body;
      let createUser = await prisma.user.findFirst({
        where: { email },
      });

      if (createUser) {
        return res.status(400).json({
          status: false,
          message: " Email already used!",
        });
      }

      if (!["KTP", "SIM", "Passport"].includes(identity_type)) {
        return res.status(400).json({
          status: false,
          message: "Invalid identity_type. Must be KTP, SIM, or Passport",
        });
      }

      if (!identity_number || identity_number.length !== 16) {
        return res.status(400).json({
          status: false,
          message: "Invalid identity number. Must be exactly 16 characters",
        });
      }

      let user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          profile: {
            create: { identity_type, identity_number, address },
          },
        },
        include: {
          profile: true,
        },
      });

      res.status(201).json({
        status: true,
        message: "Register Successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      let users = await prisma.user.findMany();

      res.status(200).json({
        status: true,
        message: "OK",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);
      let user = await prisma.user.findUnique({
        where: { id: id },
        include: { profile: true },
      });

      if (!user) {
        return res.status(404).json({
          status: false,
          message: "Can't find user with id " + id,
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
