import { Navigate, Route, Routes } from "react-router-dom"
import { useAppContext } from "./context/AppContext"
import Layout from "./layouts/Layout"
import AddHotel from "./pages/AddHotel"
import EditHotel from "./pages/EditHotel"
import Login from "./pages/Login"
import MyHotels from "./pages/MyHotels"
import Register from "./pages/Register"
import Search from "./pages/Search"

function App() {
  const { isLoggedIn } = useAppContext()
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <p>Home</p>
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <Search />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      {isLoggedIn && (
        <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
      <Route></Route>
    </Routes>
  )
}

export default App
