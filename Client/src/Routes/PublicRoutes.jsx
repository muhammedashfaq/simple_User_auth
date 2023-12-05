import { Navigate } from "react-router-dom";
import { RouteObjects } from "./RouteObjests";

export const PublicRoutesUser = (props) => {
  if (localStorage.getItem("token")) {
    return <Navigate to={RouteObjects.Home} />;
  } else {
    return props.children;
  }
};
