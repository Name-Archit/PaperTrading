import { useEffect, useState } from "react"

const BalanceBar = () => {

  /*
  |--------------------------------------------------------------------------
  | Balance State
  |--------------------------------------------------------------------------
  */

  const [balance,
    setBalance] =
      useState(0)

  /*
  |--------------------------------------------------------------------------
  | Fetch Logged In User
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const fetchUser =
      async () => {

        try {

          /*
          |--------------------------------------------------------------------------
          | Get Token
          |--------------------------------------------------------------------------
          */

          const token =
            localStorage.getItem(
              "token"
            )

          if (!token) return

          /*
          |--------------------------------------------------------------------------
          | API Request
          |--------------------------------------------------------------------------
          */

          const response =
            await fetch(
              "http://localhost:5000/api/auth/me",
              {
                method: "GET",

                headers: {
                  Authorization:
                    `Bearer ${token}`
                }
              }
            )

          const data =
            await response.json()

          /*
          |--------------------------------------------------------------------------
          | Update Balance
          |--------------------------------------------------------------------------
          */

          if (data.success) {

            setBalance(
              data.user.balance
            )
          }

        } catch (err) {

          console.log(err)
        }
      }

    fetchUser()

  }, [])

  return (

    <section className="
      container-custom
      pt-24 pb-8
    ">

      <div className="
        premium-border
        bg-[#111111]
        sharp-border
        h-20 px-8
        flex items-center
        justify-between
      ">

        {/* LEFT SIDE */}

        <div>

          <p className="
            text-xs uppercase
            tracking-[0.3em]
            text-[#C9A84C]/60
            mb-1
          ">
            Paper Money
          </p>

          <h2 className="
            text-2xl
            font-serif
            text-[#C9A84C]
            tracking-wider
          ">
            Trading Balance
          </h2>

        </div>

        {/* RIGHT SIDE */}

        <div className="text-right">

          <p className="
            text-xs uppercase
            tracking-[0.3em]
            text-[#C9A84C]/60
            mb-1
          ">
            Available Funds
          </p>

          <h2 className="
            text-3xl
            font-mono
            text-[#C9A84C]
          ">
            $
            {balance.toLocaleString()}
          </h2>

        </div>

      </div>

    </section>
  )
}

export default BalanceBar