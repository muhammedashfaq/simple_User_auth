// import React from 'react'
import { Routes, Route } from "react-router-dom";
import { ProtectedRoutesAdmin, ProtectedRoutesUser } from "./ProtectedRoutes";
import { PublicRoutesAdmin, PublicRoutesUser } from "./PublicRoutes";
import { RouteObjects } from "./RouteObjests";
import Register from '../Pages/user/UserRegister'
import Login from '../Pages/user/UserLogin'
import Home from '../Pages/user/Home'
import AdminHome from "../Pages/admin/AdminHome";
import AdminLogin from '../Pages/admin/AdminLogin'


import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";



const AppRoutes = () => {
  const { loading } = useSelector((state) => state.alerts);

  return (
    <div>
      
      {loading && (
        <div className="flex justify-center items-center bg-slate-950 opacity-60 fixed top-0 left-0 w-full h-full z-50 space-x-3">
          <div className="w-4 h-4 rounded-full  animate-pulse dark:bg-white"></div>
          <div className="w-4 h-4 rounded-full  animate-pulse dark:bg-white"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-white"></div>
        </div>
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
      <Routes>
        {/* User */}
        <Route path={RouteObjects.Register} element={<PublicRoutesUser><Register /></PublicRoutesUser>} />
        <Route path={RouteObjects.Login} element={<PublicRoutesUser><Login /></PublicRoutesUser>} />
        {/* Admin */}
        <Route path={RouteObjects.AdminLogin} element={<PublicRoutesAdmin> <AdminLogin /></PublicRoutesAdmin>} />
        {/* User */}
               

        <Route path={RouteObjects.Home} element={<ProtectedRoutesUser> <Home /></ProtectedRoutesUser>} />
       
        {/* Admin */}
        <Route path={RouteObjects.AdminHome} element={<ProtectedRoutesAdmin><AdminHome /></ProtectedRoutesAdmin>} />
      </Routes>
    </div>
  )
}


export default AppRoutes