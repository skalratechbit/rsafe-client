import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = ({ user }: any) => {
  const arrayString = localStorage.getItem('userToken');
  let userExist:any = {};
  userExist = arrayString && arrayString !== "undefined"? JSON.parse(arrayString):"";
  
  return userExist ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;