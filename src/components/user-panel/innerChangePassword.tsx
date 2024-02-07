import React from 'react';
import Input from "../shared/input";
import {Form} from "formik";

const InnerChangePassword = () => {
    return (
        <Form>
            <div className="row">
                <div className="form-group col-6">
                    <Input name='prev_password' errorClassName="text-danger" type='password' inputClassName='form-control valid'
                           label='گذرواژه قبلی'/>
                </div>
                <div className="form-group col-6">
                    <Input name='password' errorClassName="text-danger" type='password' inputClassName='form-control valid'
                           label='گذرواژه جدید'/>
                </div>
                <div className="form-group col-6">
                    <Input name='password_confirmation' type='password' errorClassName="text-danger" inputClassName='form-control valid'
                           label='تکرار گذرواژه جدید'/>
                </div>
            </div>
            <div className="form-group row">
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-alt-success">ویرایش گذرواژه</button>
                </div>
            </div>
        </Form>
    );
};

export default InnerChangePassword;
