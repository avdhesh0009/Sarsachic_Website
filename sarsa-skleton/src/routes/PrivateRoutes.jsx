import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { WebContext } from "../providers/WebProvider";

const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const {user, loading} = useContext(WebContext)



    if(loading){
        return <progress></progress>
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;