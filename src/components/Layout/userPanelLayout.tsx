import React, {useState} from "react";
import {Outlet, Navigate  } from "react-router-dom"

import PageLoader from "../user-panel/pageLoader";
import Header from "../user-panel/header";
import Sidebar from "../user-panel/sidebar";
import Footer from "../user-panel/footer";
import useAuth from "../../helpers/useAuth";
import {setUser} from "../../store/user";
import {useDispatch} from "react-redux";

const UserPanelLayout = () => {
    const [show, setShow] = useState<boolean>(true)
    const {user, error, loading} = useAuth('userPanel');
    const dispatch= useDispatch();

    if (loading) return <PageLoader/>
    if (error) return <Navigate to='/auth/login' />
    if (user)dispatch(setUser(user?.data?.result))
    if (user) return (
        <div>
            <div id="page-container"
                 className={`${show ? "sidebar-o sidebar-r side-scroll page-header-modern main-content-boxed side-trans-enabled sidebar-o-xs"
                     : 'sidebar-r side-scroll page-header-modern main-content-boxed side-trans-enabled'}`}>
                <Sidebar sidebarShow={setShow}/>
                <Header sidebarShow={setShow} statusSidebarShow={show}/>
                <main id='main-container'>
                    {/*Show pages*/}
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </div>
    );

    return <></>;
}

export default UserPanelLayout;
