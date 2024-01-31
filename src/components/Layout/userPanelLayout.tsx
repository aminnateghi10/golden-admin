import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {Outlet, Navigate, useLocation } from "react-router-dom"

import {setUser} from "../../store/user";
import Header from "../user-panel/header";
import Footer from "../user-panel/footer";
import Sidebar from "../user-panel/sidebar";
import useAuth from "../../helpers/useAuth";
import PageLoader from "../user-panel/pageLoader";

const UserPanelLayout = () => {

    let innerWidth=window.innerWidth;
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const [show, setShow] = useState<boolean>(false);
    const {user, error, loading} = useAuth('userPanel');


    useEffect(() => {
        if (innerWidth < 992) {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [innerWidth])

    useEffect(() => {
        if (innerWidth < 992) {
            setShow(false)
        } else {
            setShow(true)
        }
    }, [pathname])

    if (loading) return <PageLoader/>
    if (error) return <Navigate to='/auth/login'/>
    if (user) dispatch(setUser(user?.data?.result))
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
