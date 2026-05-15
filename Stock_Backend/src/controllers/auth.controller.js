const prisma =
  require("../config/db")

const bcrypt =
  require("bcryptjs")

const generateToken =
  require("../utils/jwt")

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

exports.register =
  async (req, res) => {

    try {

      const {
        username,
        email,
        password
      } = req.body

      /*
      |--------------------------------------------------------------------------
      | Check Existing User
      |--------------------------------------------------------------------------
      */

      const existingUser =
        await prisma.user.findFirst({
          where: {
            OR: [
              { email },
              { username }
            ]
          }
        })

      if (existingUser) {

        return res.status(400).json({
          success: false,
          message:
            "User already exists"
        })
      }

      /*
      |--------------------------------------------------------------------------
      | Hash Password
      |--------------------------------------------------------------------------
      */

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        )

      /*
      |--------------------------------------------------------------------------
      | Create User
      |--------------------------------------------------------------------------
      */

      const user =
        await prisma.user.create({
          data: {
            username,
            email,
            password:
              hashedPassword
          }
        })

      /*
      |--------------------------------------------------------------------------
      | Generate JWT
      |--------------------------------------------------------------------------
      */

      const token =
        generateToken(user.id)

      /*
      |--------------------------------------------------------------------------
      | Send Response
      |--------------------------------------------------------------------------
      */

      return res.status(201).json({

        success: true,

        message:
          "Account created successfully",

        token,

        user: {
          id: user.id,
          username:
            user.username,
          email:
            user.email,
          balance:
            user.balance
        }
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        message:
          err.message
      })
    }
}

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

exports.login =
  async (req, res) => {

    try {

      const {
        email,
        password
      } = req.body

      /*
      |--------------------------------------------------------------------------
      | Find User
      |--------------------------------------------------------------------------
      */

      const user =
        await prisma.user.findUnique({
          where: { email }
        })

      if (!user) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid credentials"
        })
      }

      /*
      |--------------------------------------------------------------------------
      | Compare Password
      |--------------------------------------------------------------------------
      */

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        )

      if (!isMatch) {

        return res.status(400).json({
          success: false,
          message:
            "Invalid credentials"
        })
      }

      /*
      |--------------------------------------------------------------------------
      | Generate JWT
      |--------------------------------------------------------------------------
      */

      const token =
        generateToken(user.id)

      /*
      |--------------------------------------------------------------------------
      | Send Response
      |--------------------------------------------------------------------------
      */

      res.json({

        success: true,

        message:
          "Login successful",

        token,

        user: {
          id: user.id,
          username:
            user.username,
          email:
            user.email,
          balance:
            user.balance
        }
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        message:
          err.message
      })
    }
}

/*
|--------------------------------------------------------------------------
| Check Username Availability
|--------------------------------------------------------------------------
*/

exports.checkUsername =
  async (req, res) => {

    try {

      const { username } =
        req.params

      const existingUser =
        await prisma.user.findUnique({
          where: { username }
        })

      res.json({
        success: true,

        exists:
          !!existingUser
      })

    } catch (err) {

      res.status(500).json({
        success: false,
        message:
          err.message
      })
    }
}

/*
|--------------------------------------------------------------------------
| Get Current Logged In User
|--------------------------------------------------------------------------
*/

exports.getMe =
  async (req, res) => {

    try {

      res.json({

        success: true,

        user: {
          id: req.user.id,

          username:
            req.user.username,

          email:
            req.user.email,

          balance:
            req.user.balance
        }
      })

    } catch (err) {

      res.status(500).json({

        success: false,

        message:
          err.message
      })
    }
}