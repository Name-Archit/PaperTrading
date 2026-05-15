const express =
  require("express");

const router =
  express.Router();

/*
|--------------------------------------------------------------------------
| Controllers
|--------------------------------------------------------------------------
*/

const authController =
  require(
    "../controllers/auth.controller"
  );

/*
|--------------------------------------------------------------------------
| Middlewares
|--------------------------------------------------------------------------
*/

const validate =
  require(
    "../middlewares/validate.middleware"
  );

const authMiddleware =
  require(
    "../middlewares/auth.middleware"
  );

/*
|--------------------------------------------------------------------------
| Validations
|--------------------------------------------------------------------------
*/

const {
  registerSchema,
  loginSchema
} = require(
  "../validations/auth.validation"
);

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Register User
|--------------------------------------------------------------------------
*/

router.post(
  "/register",

  validate(registerSchema),

  authController.register
);

/*
|--------------------------------------------------------------------------
| Login User
|--------------------------------------------------------------------------
*/

router.post(
  "/login",

  validate(loginSchema),

  authController.login
);

/*
|--------------------------------------------------------------------------
| Current Logged In User
|--------------------------------------------------------------------------
*/

router.get(
  "/me",

  authMiddleware,

  authController.getMe
);

/*
|--------------------------------------------------------------------------
| Check Username Availability
|--------------------------------------------------------------------------
*/

router.get(
  "/check-username/:username",

  authController.checkUsername
);

module.exports = router;