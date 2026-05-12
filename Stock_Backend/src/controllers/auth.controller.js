const prisma = require("../config/db");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/jwt");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    const token = generateToken(user.id);

    return res.status(201).json({
      token,
      user
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};