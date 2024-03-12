import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"
import LogoutButton from "./LogoutButton"

const Header = () => {
  const { isLoggedIn } = useAppContext()
  return (
    <div className="bg-blue-800 px-3 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">Holiyay</Link>
        </span>
        <span className="flex space-x-2 ">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center rounded-lg px-3 font-bold text-white hover:bg-blue-600"
                to="/my-bookings"
              >
                Bookings
              </Link>
              <Link
                className="flex items-center rounded-lg px-3 font-bold text-white hover:bg-blue-600"
                to="/my-hotels"
              >
                Hotels
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              to={"/login"}
              className="flex items-center rounded-lg bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
            >
              Login
            </Link>
          )}
        </span>
      </div>
    </div>
  )
}

export default Header
