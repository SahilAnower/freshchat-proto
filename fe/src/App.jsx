import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import Authpage from "./pages/Authpage.jsx";
import Homepage from "./pages/Homepage.jsx";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Homepage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={authUser ? <Navigate to="/" /> : <Authpage />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
