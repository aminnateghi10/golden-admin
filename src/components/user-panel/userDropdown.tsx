import React, {useEffect, useRef, useState} from "react";
import {logoutToken} from "../../helpers/auth";
import {Link, useNavigate, useLocation} from "react-router-dom";
import callApi from "../../helpers/callApi";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const UserDropdown = () => {
    let navigator = useNavigate();
    let location = useLocation();
    const dropdownRef = useRef(null);
    const  user = useSelector((store:RootState)=> store.user.user);

    const [show, setShow] = useState<boolean>(false)
    let logOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        callApi().get('/logout').then(res => {
            logoutToken();
            navigator('/auth/login');
        })
    }
    useEffect(() => {
        setShow(false);
    }, [location]);

    const handleOutsideClick = (e: MouseEvent) => {
        // Check if the click is outside the dropdown
        // @ts-ignore
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
            setShow(false);
        }
    };

    useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener("click", handleOutsideClick);

        // Detach the event listener when the component is unmounted
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);


    return (
        <div className={`btn-group ${show ? 'show' : ''}`} ref={dropdownRef}>
            <button type="button" onClick={(e) => setShow(!show)} className="btn btn-rounded btn-dual-secondary"
                    id="page-header-user-dropdown">{user?.name}<i className="fa fa-angle-down mr-5"/>
            </button>
            <div className={`dropdown-menu text-right min-width-150 ${show ? 'show' : ''}`}
                 aria-labelledby="page-header-user-dropdown">
                <Link to='/' className="dropdown-item"><i className="si si-user ml-5"/>لیست کاربران</Link>
                <Link to='change-password' className="dropdown-item"><i className="si si-pencil ml-5"/>تغییر
                    گذرواژه</Link>
                <div className="dropdown-divider"/>
                <button onClick={logOutHandler} className="dropdown-item"><i className="si si-logout ml-5"/>خروج
                </button>
            </div>
        </div>
    )
}

export default UserDropdown;
