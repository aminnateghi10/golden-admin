import React from 'react';
import {Form} from "formik";
import Input from "../shared/input";
import {ErrorMessage, Field} from "formik";
import DatePicker, {DateObject} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa";

const InnerSearch = (formProps:any) => {
    const digits = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"]
    return (
        <Form>
            <div className="row">
                <div className="col-md-3">
                    <div className="custom-control custom-checkbox custom-control-inline mb-5">
                        <div role="group" aria-labelledby="checkbox-group">
                            <div className="custom-control-inline">
                            <label>
                                <Field className='mx-1' type="checkbox" name="filter_search" value="my_costs" />
                                هزینه های من
                            </label>
                            </div>

                            <div className="custom-control-inline">
                                <label>
                                    <Field className='mx-1' type="checkbox" name="filter_search" value="my_buys" />
                                    خرید های من
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="from_date">از تاریخ</label>
                        <div className="col-lg-9">
                            <DatePicker
                                name='from_date'
                                digits={digits}
                                inputClass='form-control'
                                onChange={(e :DateObject)=> formProps.setFieldValue('from_date',e.toString())}
                                calendar={persian}
                                format="YYYY-MM-DD"
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                            />
                            <ErrorMessage name='from_date'/>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-group row">
                        <label className="col-md-3 col-form-label" htmlFor="from_date">از تاریخ</label>
                        <div className="col-lg-9">
                            <DatePicker
                                inputClass='form-control'
                                name='to_date'
                                digits={digits}
                                onChange={(e :DateObject)=> formProps.setFieldValue('to_date',e.toString())}
                                calendar={persian}
                                format="YYYY-MM-DD"
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                            />
                            <ErrorMessage name='to_date'/>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="d-flex">
                        <Input label='جستجو' name="search" inputClassName='form-control mx-3'/>
                    </div>
                </div>
                <div className="col-md-2">
                    <div className="form-group">
                        <button type='submit' className="btn btn-alt-success">فیلتر کردن</button>
                    </div>
                </div>
            </div>
        </Form>
    );
};

export default InnerSearch;