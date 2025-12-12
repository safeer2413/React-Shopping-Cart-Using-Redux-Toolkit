import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth || {});
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return null;
    if (!token) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
