import React from "react";
import {Navigate, Outlet} from "react-router-dom";

import useAuth from "../../helpers/useAuth";
import PageLoader from "../user-panel/pageLoader";


const UserAuthLayout = () => {
    const {user, error, loading} =  useAuth('auth');

    if (user) return <Navigate to='/' />
    if (error) return <Outlet/>
    return <PageLoader/>
}

export default UserAuthLayout;
