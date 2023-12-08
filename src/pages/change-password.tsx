import React from 'react';
import ChangePasswordForm from "../components/form/user-panel/changePasswordForm";

const ChangePassword = () => {
    return (
        <div className="content">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="block">
                        <div className="block-header block-header-default">
                            <h3 className="block-title">تغییر گذرواژه</h3>
                        </div>
                        <div className="block-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <ChangePasswordForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;