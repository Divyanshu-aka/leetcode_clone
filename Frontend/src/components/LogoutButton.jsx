import React from "react";
import { useAuthStore } from "../hooks/useAuthStore";


const LogoutButton = ({ children }) => {
    const { logout } = useAuthStore()

    const onLogout = async () => {
        await logout();

    }



    return (
        <button className="btn btn-primary" onClick={onLogout}>
            {children}
        </button>
    )
}

export default LogoutButton;