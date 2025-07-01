import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Outlet } from "react-router-dom";

import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";

const HomeLayoutPage = () => {

    const { isAuthenticated, logout, user } = useAuth0();

    /* This page contains the components that are used throughout the app */

    return (
        <>
            {
                isAuthenticated ? (
                    <>
                        <NavBar />
                        <Outlet />
                        <Footer />
                    </>
                ) : ( 
                    <Outlet />
                )
            }
        </>
    );
};

export default HomeLayoutPage;