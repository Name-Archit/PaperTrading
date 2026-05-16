import { NavLink } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

import AuthModel from "./AuthModel"

const Navbar = () => {

  /*
  |--------------------------------------------------------------------------
  | Auth Model State
  |--------------------------------------------------------------------------
  */

  const [isModelOpen,
    setIsModelOpen] =
      useState(false)

  /*
  |--------------------------------------------------------------------------
  | Logged In User
  |--------------------------------------------------------------------------
  */

  const [user,
    setUser] =
      useState(null)

  /*
  |--------------------------------------------------------------------------
  | Dropdown State
  |--------------------------------------------------------------------------
  */

  const [showDropdown,
    setShowDropdown] =
      useState(false)

  const dropdownRef =
    useRef(null)

  /*
  |--------------------------------------------------------------------------
  | Load User
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const storedUser =
      localStorage.getItem("user")

    if (storedUser) {

      setUser(
        JSON.parse(storedUser)
      )
    }

  }, [isModelOpen])

  /*
  |--------------------------------------------------------------------------
  | Close Dropdown Outside Click
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const handleClickOutside =
      (event) => {

        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(
            event.target
          )
        ) {

          setShowDropdown(false)
        }
      }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    )

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      )
    }

  }, [])

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

const handleLogout = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  setUser(null);

  setShowDropdown(false);

  /*
  |--------------------------------------------------------------------------
  | Refresh Entire App
  |--------------------------------------------------------------------------
  */

  window.location.reload();
}

  return (

    <>

      <nav className="
        fixed top-0 w-full z-50
        bg-neutral-950/90
        backdrop-blur-md
        border-b border-[#C9A84C]/30
        flex justify-between items-center
        px-6 md:px-8 h-14
      ">

        {/* LOGO */}

        <div className="
          text-xl font-bold
          tracking-widest
          text-[#C9A84C]
          uppercase
          font-serif
        ">
          Arc + Nir
        </div>

        {/* NAV LINKS */}

        <div className="
          hidden md:flex gap-8
        ">

          <NavLink
            className="
              text-[#C9A84C]
              border-b border-[#C9A84C]
              pb-1 font-serif
              tracking-widest
              uppercase text-xs
            "
            to="/"
          >
            Dashboard
          </NavLink>

          <NavLink
            className="
              text-[#C9A84C]/60
              font-serif tracking-widest
              uppercase text-xs
              hover:text-[#C9A84C]
            "
            to="/paper-trading"
          >
            Paper Trade
          </NavLink>

          <NavLink
            className="
              text-[#C9A84C]/60
              font-serif tracking-widest
              uppercase text-xs
              hover:text-[#C9A84C]
            "
            to="/analytics"
          >
            Analytics
          </NavLink>

        </div>

        {/* RIGHT SECTION */}

        {!user ? (

          <button

            onClick={() =>
              setIsModelOpen(true)
            }

            className="
              font-serif tracking-widest
              uppercase text-xs
              text-[#C9A84C]
              border border-[#C9A84C]/50
              px-6 py-2
              hover:bg-[#C9A84C]
              hover:text-neutral-950
              transition-all
            "
          >
            Access Terminal
          </button>

        ) : (

          <div
            ref={dropdownRef}
            className="relative"
          >

            {/* PROFILE BUTTON */}

            <button

              onClick={() =>
                setShowDropdown(
                  !showDropdown
                )
              }

              className="
                w-11 h-11
                rounded-full
                border border-[#C9A84C]/30
                flex items-center justify-center
                text-[#C9A84C]
                hover:bg-[#C9A84C]/10
                transition-all
              "
            >

              {/* HUMAN ICON */}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="
                  M12 12
                  c2.761 0 5-2.239 5-5
                  S14.761 2 12 2
                  7 4.239 7 7
                  s2.239 5 5 5zm0 2
                  c-3.314 0-10 1.657-10 5
                  v3h20v-3
                  c0-3.343-6.686-5-10-5z
                " />
              </svg>

            </button>

            {/* DROPDOWN */}

            {showDropdown && (

              <div className="
                absolute right-0 mt-3
                w-52
                bg-neutral-950
                border border-[#C9A84C]/20
                rounded-2xl
                overflow-hidden
                shadow-2xl
                backdrop-blur-md
              ">

                {/* USER INFO */}

                <div className="
                  px-4 py-3
                  border-b border-[#C9A84C]/10
                ">

                  <p className="
                    text-[#C9A84C]
                    text-sm font-semibold
                  ">
                    {user.username}
                  </p>

                  <p className="
                    text-[#C9A84C]/50
                    text-xs mt-1
                  ">
                    {user.email}
                  </p>

                </div>

                {/* SIGN OUT */}

                <button

                  onClick={handleLogout}

                  className="
                    w-full
                    text-left
                    px-4 py-3
                    text-sm
                    text-red-400
                    hover:bg-red-500/10
                    transition-all
                  "
                >
                  Sign Out
                </button>

              </div>
            )}

          </div>
        )}

      </nav>

      {/* AUTH MODEL */}

      <AuthModel
        isOpen={isModelOpen}
        onClose={() =>
          setIsModelOpen(false)
        }
      />

    </>
  )
}

export default Navbar