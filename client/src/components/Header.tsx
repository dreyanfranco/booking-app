import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

const Header = () => {
  const { isLoggedIn } = useAppContext()
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl font-bold tracking-tight text-white">
          <Link to="/">Holiyay</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link to="/bookings">Bookings</Link>
              <Link to="/hotels">Hotels</Link>
              <button>Sign out</button>
            </>
          ) : (
            <Link
              to={"/login"}
              className="flex items-center bg-white px-3 font-bold text-blue-600 hover:bg-gray-100"
            >
              Sign in
            </Link>
          )}
        </span>
      </div>
    </div>
  )
}

export default Header
