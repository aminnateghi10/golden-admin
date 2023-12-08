import React from 'react';
import {Form} from "formik";
import Input from "../shared/input";

const InnerLoginForm = () => {
    return (
        <Form className="js-validation-signin">
            <input type="hidden" name="_token"/>
            <div className="block block-themed block-rounded block-shadow">
                <div className="block-header bg-gd-dusk">
                    <h3 className="block-title">لطفا وارد شوید</h3>
                </div>
                <div className="block-content">
                    <div className="form-group row">
                        <div className="col-12">
                        <Input name='username' inputClassName='form-control' label='نام کاربری'/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-12">
                        <Input name='password' inputClassName='form-control' type='password' label='گذرواژه'/>
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <div className="col-sm-12 push">
                            <button type="submit" className="btn btn-alt-primary w-100">
                                <i className="si si-login ml-10"/> ورود
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default InnerLoginForm;