import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

function App() {
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
            <p>Search</p>
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
      <Route></Route>
      <Route></Route>
    </Routes>
  );
}

export default App;
