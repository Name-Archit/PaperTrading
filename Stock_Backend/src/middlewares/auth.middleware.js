const jwt =
  require("jsonwebtoken")

const prisma =
  require("../config/db")

const authMiddleware =
  async (req, res, next) => {

    try {

      const authHeader =
        req.headers.authorization

      if (
        !authHeader ||
        !authHeader.startsWith("Bearer ")
      ) {

        return res.status(401).json({
          message: "Unauthorized"
        })
      }

      const token =
        authHeader.split(" ")[1]

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        )

      const user =
        await prisma.user.findUnique({
          where: {
            id: decoded.userId
          }
        })

      if (!user) {

        return res.status(401).json({
          message: "User not found"
        })
      }

      req.user = user

      next()

    } catch (err) {

      res.status(401).json({
        message: "Invalid token"
      })
    }
}

module.exports =
  authMiddleware