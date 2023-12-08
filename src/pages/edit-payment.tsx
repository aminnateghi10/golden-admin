import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import callApi from "../helpers/callApi";
import {PaymentsDataInterface} from "../components/contracts/userInterface";
import EditPaymentsForm from "../components/form/payments/editPaymentsForm";

const EditPayment = () => {
    const location = useLocation()

    useEffect(() => {
        callApi().get(`/payments/${location.search.slice(1)}`).then(res => setData(res.data.result))
    }, [])

    const [data, setData] = useState<PaymentsDataInterface>();
    console.log(data , '11112222')
    return (
        <div className="content">
            {
                data && (
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="block">
                                <div className="block-header block-header-default">
                                    <h3 className="block-title">ثبت پرداختی جدید</h3>
                                </div>
                                <div className="block-content">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <EditPaymentsForm data={data}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default EditPayment;