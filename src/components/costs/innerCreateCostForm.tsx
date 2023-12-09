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
        callApi().get('/users').then(res => setUsersList(res.data.result.data))
    },[])
    const [usersList , setUsersList] = useState<UserInterface[]>()

    return (
        <Form id="cost-create-form">
            <input type="hidden" name="_token" />
            <div className="row">
                <div className="form-group col-6">
                    <Input name='title' label='نام کاربر' inputClassName='form-control js-autocomplete'/>
                </div>
                <div className="form-group col-6">
                    <label htmlFor="date">تاریخ</label>
                    <DatePicker
                        containerClassName='d-block'
                        inputClass="form-control"
                        name='date'
                        digits={dateFormat}
                        onChange={(e :DateObject)=> formProps.setFieldValue('date',e.toString())}
                        calendar={persian}
                        format="YYYY-DD-MM"
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                    />
                    <ErrorMessage name='date'/>
                </div>
                <div className="form-group col-12">
                    <label htmlFor="payer_user_id">آدرس دامین</label>
                    <Field className='form-control' name="payer_user_id" as="select">
                        {
                            [{id:1,name:'amin.com'}]?.map(item => (
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </Field>
                    <ErrorMessage name='payer_user_id'/>
                </div>
                <div className="form-group col-12">
                    <Input name='description' label='آدرس کانفیگ' as='textarea' rows='5' inputClassName='form-control' />
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
