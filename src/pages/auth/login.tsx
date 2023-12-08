import React from "react";
import LoginForm from "../../components/form/auth/loginForm";
import {useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()

    return (
        <div id="page-container" className="main-content-boxed">
            {/* Main Container */}
            <main id="main-container">
                {/* Page Content */}
                <div className="bg-body-dark bg-pattern">
                    <div className="row mx-0 justify-content-center">
                        <div className="hero-static col-lg-6 col-xl-4">
                            <div className="content content-full overflow-hidden">
                                {/* Header */}
                                <div className="py-30 text-center">
                                    <h1 className="h4 font-w700 mt-30 mb-10">به داشبورد مدیریت خوش آمدید</h1>
                                </div>
                                {/* END Header */}
                                    <LoginForm navigate={navigate}/>
                                {/* END Sign In Form */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* END Page Content */}
            </main>
            {/* END Main Container */}
        </div>
    )
}


export default Login;
