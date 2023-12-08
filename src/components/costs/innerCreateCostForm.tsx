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
                    <Input name='title' label='عنوان' inputClassName='form-control js-autocomplete'/>
                </div>
                <div className="form-group col-6">
                    <Input name='amount' type='number' label='مبلغ' inputClassName='form-control js-autocomplete'/>
                    <small className="form-text text-success amount-helper">{formProps.values.amount ? `${moneyFormat(formProps.values.amount)}  تومان` : ''}</small>
                </div>
                <div className="form-group col-6">
                    <label>خرج کننده</label>
                    <Field className='form-control' component="select" name="user_id" >
                        {
                            usersList?.map(item=>(
                                <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                        }
                    </Field>
                    <ErrorMessage name='user_id'/>
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
                    <label>کاربران</label>
                    <Field multiple={true} className='form-control' component="select" name="users_id" >
                        {
                            usersList?.map(item=>(
                                <option key={item.id}  value={item.id}>{item.name}</option>
                            ))
                        }
                    </Field>
                    <ErrorMessage name='users_id'/>
                </div>
                <div className="form-group col-12">
                    <Input name='description' label='توضیحات' as='textarea' rows='5' inputClassName='form-control' />
                </div>
            </div>
            <div className="form-group row">
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-alt-success">
                        <i className="fa fa-plus mr-5" /> ثبت هزینه
                    </button>
                </div>
            </div>
        </Form>
    );
};

export default InnerCreateCostForm;