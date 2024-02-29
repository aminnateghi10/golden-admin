import React from 'react';
import {Form} from "formik";
import Input from "../shared/input";

const InnerAddUser = () => {

    return (
        <Form id="user-create-form">
            <div className="row">
                <div className="form-group col-6">
                    <Input name='name' label='نام و نام خانوادگی' inputClassName='form-control'/>
                </div>
                <div className="form-group col-6">
                    <Input name='username' label='نام کاربری' inputClassName='form-control val'/>
                </div>
                <div className="form-group col-6">
                    <Input type='password' name='password' label='گذرواژه' inputClassName='form-control val'/>
                </div>
                <div className="form-group col-6">
                    <Input type='password' name='password_confirmation' label='تکرار گذرواژه' inputClassName='form-control'/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-alt-success">
                        <i className="fa fa-plus mr-5"/> ثبت کاربر
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default InnerAddUser;
