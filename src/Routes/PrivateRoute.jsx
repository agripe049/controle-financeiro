import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/FirebaseConfig";

const PrivateRoute = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user,setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if(loading) return <p>Carregando...</p>

    if(!user) {
        return <Navigate to="/"/>;
    }
    return children;
};

export default PrivateRoute;