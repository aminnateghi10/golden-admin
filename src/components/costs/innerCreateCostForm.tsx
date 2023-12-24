import React, {useEffect, useState} from 'react';
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";
import {Form, FormikProps, Field, ErrorMessage} from "formik";

import Input from "../shared/input";
import callApi from "../../helpers/callApi";
import {UserInterface} from "../contracts/userInterface";
import {dateFormat} from "../shared/dateFormat";
import {moneyFormat} from "../shared/moneyFormat";

const InnerCreateCostForm = (formProps : FormikProps<any>) => {
    useEffect(()=>{
        callApi().get('/domains').then(res => setDomainsList(res.data.result.data))
    },[])
    const [domainsList , setDomainsList] = useState<UserInterface[]>();

    return (
        <Form id="cost-create-form">
            <input type="hidden" name="_token" />
            <div className="row">
                <div className="form-group col-6">
                    <Input name='name' label='نام کاربر' errorClassName="text-danger" inputClassName='form-control js-autocomplete'/>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="domain_id">آدرس دامین</label>
                    <Field className='form-control' name="domain_id" as="select">
                    <option value="">انتخاب کنید</option>
                        {
                            domainsList?.map(item => (
                                <option key={item.id} value={item.id}>{item.domain}</option>
                            ))
                        }
                    </Field>
                    <span className='text-danger'><ErrorMessage name='domain_id'/></span>
                </div>
                <div className="form-group col-12">
                    <Input name='config' label='آدرس کانفیگ' as='textarea' errorClassName="text-danger" rows='5' inputClassName='form-control' />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-alt-success">
                        <i className="fa fa-plus mr-5" /> افزودن
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default InnerCreateCostForm;
