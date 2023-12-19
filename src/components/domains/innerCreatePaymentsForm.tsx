import React, {useEffect, useState} from 'react';
import {Form, Field, FormikProps, ErrorMessage} from "formik";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";
import {dateFormat} from "../shared/dateFormat";
import callApi from "../../helpers/callApi";
import {UsersInterface} from "../contracts/userInterface";
import Input from "../shared/input";
import {moneyFormat} from "../shared/moneyFormat";

const InnerCreatePaymentsForm = (formProps: FormikProps<any>) => {
    useEffect(() => {
        callApi().get('/users').then(res => setUsers(res.data.result.data))
    }, [])
    const [users, setUsers] = useState<UsersInterface[]>();
    return (
        <div>
            <Form id="payment-create-form">
                <input type="hidden" name="_token"
                       defaultValue="Ra4jDK01HGITKTvGdNFRPVEEYWhzi4UEeZioK7wP"/>
                <div className="row">
                    <div className="form-group col-6">
                        <Input name='amount' inputClassName='form-control amount-input' label="مبلغ" type='number'/>
                        <small className="form-text text-success amount-helper">{formProps.values.amount ? `${moneyFormat(formProps.values.amount)}  تومان` : ''}</small>
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="date">تاریخ</label>
                        <DatePicker
                            containerClassName='d-block'
                            inputClass="form-control"
                            name='date'
                            digits={dateFormat}
                            onChange={(e: DateObject) => formProps.setFieldValue('date', e.toString())}
                            calendar={persian}
                            format="YYYY-MM-DD"
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                        />
                        <ErrorMessage name='date'/>
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="payer_user_id">پرداخت کننده</label>
                        <Field className='form-control' name="payer_user_id" as="select">
                            {
                                users?.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            }
                        </Field>
                        <ErrorMessage name='payer_user_id'/>
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="paid_user_id">دریافت کننده</label>
                        <Field className='form-control' name="paid_user_id" as="select">
                            {
                                users?.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            }
                        </Field>
                        <ErrorMessage name='paid_user_id'/>
                    </div>
                    <div className="form-group col-12">
                        <Input name='description' as='textarea' rows={5} inputClassName='form-control amount-input' label="توضیحات" type='number'/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-alt-success">
                            <i className="fa fa-plus mr-5"/> ثبت پرداختی
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default InnerCreatePaymentsForm;