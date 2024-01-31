import React, {useState} from "react";
import {logoutToken} from "../../helpers/auth";
import {Link, useNavigate} from "react-router-dom";
import callApi from "../../helpers/callApi";

const UserDropdown = () => {
    let navigator = useNavigate();
    const [show, setShow] = useState<boolean>(false)
    let logOutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        callApi().get('/logout').then(res => {
            logoutToken();
            navigator('/auth/login');
        })
    }


    return (
        <div className={`btn-group ${show ? 'show' : ''}`}>
            <button type="button" onClick={(e) => setShow(!show)} className="btn btn-rounded btn-dual-secondary"
                    id="page-header-user-dropdown">
                امین ناطقی<i className="fa fa-angle-down mr-5"/>
            </button>
            <div className={`dropdown-menu text-right min-width-150 ${show ? 'show' : ''}`}
                 aria-labelledby="page-header-user-dropdown">
                <Link to='/' className="dropdown-item"><i className="si si-user ml-5"/>لیست کاربران</Link>
                <Link to='change-password' className="dropdown-item"><i className="si si-pencil ml-5"/>تغییر گذرواژه</Link>
                <div className="dropdown-divider"/>
                <button onClick={logOutHandler} className="dropdown-item"><i className="si si-logout ml-5"/>خروج
                </button>
            </div>
        </div>
    )
}

export default UserDropdown;
