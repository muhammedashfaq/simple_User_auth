import { Routes, Route } from "react-router-dom";
import { ProtectedRoutesUser } from "./ProtectedRoutes";
import { PublicRoutesUser } from "./PublicRoutes";
import { RouteObjects } from "./RouteObjests";
import Register from "../pages/Register/Register";
import Login from "../Pages/LoginPage/Login";
import Home from "../Pages/Home/HomePage";

import { Toaster } from "react-hot-toast";

const AppRoutes = () => {
  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        <Route
          path={RouteObjects.Register}
          element={
            <PublicRoutesUser>
              <Register />
            </PublicRoutesUser>
          }
        />
        <Route
          path={RouteObjects.Login}
          element={
            <PublicRoutesUser>
              <Login />
            </PublicRoutesUser>
          }
        />

        <Route
          path={RouteObjects.Home}
          element={
            <ProtectedRoutesUser>
              {" "}
              <Home />
            </ProtectedRoutesUser>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
