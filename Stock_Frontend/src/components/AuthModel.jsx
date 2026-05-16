import { useState } from "react"

const API =
  "http://localhost:5000/api/auth"

const AuthModel = ({
  isOpen,
  onClose
}) => {

  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */

  const [isLogin,
    setIsLogin] =
      useState(true)

  const [username,
    setUsername] =
      useState("")

  const [email,
    setEmail] =
      useState("")

  const [password,
    setPassword] =
      useState("")

  const [message,
    setMessage] =
      useState("")

  /*
  |--------------------------------------------------------------------------
  | Reset Form
  |--------------------------------------------------------------------------
  */

  const resetForm = () => {

    setUsername("")

    setEmail("")

    setPassword("")

    setMessage("")
  }

  /*
  |--------------------------------------------------------------------------
  | Close Model
  |--------------------------------------------------------------------------
  */

  const handleClose = () => {

    resetForm()

    setIsLogin(true)

    onClose()
  }

  /*
  |--------------------------------------------------------------------------
  | Toggle Login / Signup
  |--------------------------------------------------------------------------
  */

  const handleToggle = () => {

    resetForm()

    setIsLogin(!isLogin)
  }

  /*
  |--------------------------------------------------------------------------
  | Submit Handler
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        const endpoint =
          isLogin
            ? "login"
            : "register"

        const response =
          await fetch(
            `${API}/${endpoint}`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({

                username,

                email,

                password
              })
            }
          )

        const data =
          await response.json()

        /*
        |--------------------------------------------------------------------------
        | Error Handling
        |--------------------------------------------------------------------------
        */

        if (!response.ok) {

          setMessage(
            data.message
          )

          return
        }

        /*
        |--------------------------------------------------------------------------
        | SIGN UP FLOW
        |--------------------------------------------------------------------------
        */

        if (!isLogin) {

          setMessage(
            "Account created successfully"
          )

          /*
          |--------------------------------------------------------------------------
          | Clear Sensitive Inputs
          |--------------------------------------------------------------------------
          */

          setUsername("")

          setPassword("")

          /*
          |--------------------------------------------------------------------------
          | Redirect To Login
          |--------------------------------------------------------------------------
          */

          setTimeout(() => {

            setIsLogin(true)

            setMessage("")

          }, 1500)

          return
        }

        /*
        |--------------------------------------------------------------------------
        | LOGIN FLOW
        |--------------------------------------------------------------------------
        */

        localStorage.setItem(
          "token",
          data.token
        )

        localStorage.setItem(
          "user",
          JSON.stringify(
            data.user
          )
        )

        setMessage(
          "Access Granted"
        )

       setTimeout(() => {
         handleClose();

         window.location.reload();
       }, 1000);

      } catch (err) {

        console.log(err)

        setMessage(
          "Server Error"
        )
      }
    }

  /*
  |--------------------------------------------------------------------------
  | Prevent Rendering
  |--------------------------------------------------------------------------
  */

  if (!isOpen) return null

  return (

    <div
      className="
        fixed inset-0 z-[100]
        bg-black/70
        backdrop-blur-md
        flex items-center justify-center
        px-4
      "
    >

      <div
        className="
          w-full max-w-md
          bg-neutral-950
          border border-[#C9A84C]/30
          rounded-3xl
          p-8
          relative
        "
      >

        {/* CLOSE BUTTON */}

        <button

          onClick={handleClose}

          className="
            absolute top-4 right-4
            text-[#C9A84C]/50
            hover:text-[#C9A84C]
            transition-all
          "
        >
          ✕
        </button>

        {/* TITLE */}

        <h2
          className="
            text-3xl font-bold
            text-[#C9A84C]
            font-serif
            tracking-widest
            uppercase
            mb-8
          "
        >

          {
            isLogin
              ? "Access Terminal"
              : "Create Account"
          }

        </h2>

        {/* FORM */}

        <form
          autoComplete="off"

          onSubmit={handleSubmit}

          className="space-y-5"
        >

          {/* USERNAME */}

          {!isLogin && (

            <input

              autoComplete="off"

              type="text"

              placeholder="Username"

              value={username}

              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }

              className="
                w-full
                bg-black
                border border-[#C9A84C]/20
                rounded-xl
                px-4 py-3
                text-[#C9A84C]
                outline-none
                focus:border-[#C9A84C]
              "
            />
          )}

          {/* EMAIL */}

          <input

            autoComplete="off"

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }

            className="
              w-full
              bg-black
              border border-[#C9A84C]/20
              rounded-xl
              px-4 py-3
              text-[#C9A84C]
              outline-none
              focus:border-[#C9A84C]
            "
          />

          {/* PASSWORD */}

          <input

            autoComplete="new-password"

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            className="
              w-full
              bg-black
              border border-[#C9A84C]/20
              rounded-xl
              px-4 py-3
              text-[#C9A84C]
              outline-none
              focus:border-[#C9A84C]
            "
          />

          {/* MESSAGE */}

          {message && (

            <p
              className={`
                text-sm
                ${
                  message.includes("success")
                    || message.includes("Granted")
                    ? "text-green-400"
                    : "text-red-400"
                }
              `}
            >
              {message}
            </p>
          )}

          {/* SUBMIT BUTTON */}

          <button

            type="submit"

            className="
              w-full
              bg-[#C9A84C]
              text-black
              py-3 rounded-xl
              font-bold
              uppercase
              tracking-widest
              hover:opacity-90
              transition-all
            "
          >

            {
              isLogin
                ? "Sign In"
                : "Create Account"
            }

          </button>

        </form>

        {/* TOGGLE */}

        <div
          className="
            mt-6
            text-center
            text-sm
            text-[#C9A84C]/60
          "
        >

          {
            isLogin
              ? "No account?"
              : "Already registered?"
          }

          <button

            onClick={handleToggle}

            className="
              ml-2
              text-[#C9A84C]
              hover:underline
            "
          >

            {
              isLogin
                ? "Sign Up"
                : "Sign In"
            }

          </button>

        </div>

      </div>

    </div>
  )
}

export default AuthModel