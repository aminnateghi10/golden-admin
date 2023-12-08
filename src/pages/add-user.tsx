import React from 'react';
import AddUserForm from "../components/form/user-panel/addUserForm";

const AddUser = () => {
    return (
        <div className="content">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="block">
                        <div className="block-header block-header-default">
                            <h3 className="block-title">ثبت کاربر جدید</h3>
                        </div>
                        <div className="block-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <AddUserForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddUser;