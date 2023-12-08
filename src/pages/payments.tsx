import React, {useEffect, useState} from 'react';
import callApi from "../helpers/callApi";
import {PagePaymentsInterface} from "../components/contracts/userInterface";
import ItemPayments from "../components/payments/itemPayments";
import {toast} from "react-toastify";
import {Link, NavLink} from "react-router-dom";
import {Cutting} from "../helpers/cutting";
import Pagination from "../components/shared/pagination";


const Payments = () => {

    const [data, setData] = useState<PagePaymentsInterface>()

    useEffect(() => {
        callApi().get('/payments').then(res => setData(res.data.result))
    }, [])

    const deleteData = async (id: number) => {
        let res = await callApi().delete(`payments/${id}`);
        console.log(res)
        try {
            toast.success(res.data.message.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            callApi().get('/payments').then(res => setData(res.data.result))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="content">
            <div className="row js-appear-enabled animated fadeIn" data-toggle="appear">
                {/* Row #3 */}
                <div className="col-md-12">
                    <div className="block block-rounded block-bordered">
                        <div className="block-header block-header-default border-b">
                            <h3 className="block-title">لیست پرداختی ها</h3>
                        </div>
                        <div className="block-content">
                            <div className="table-responsive">
                                <table className="table table-borderless table-striped">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>پرداخت کننده</th>
                                        <th>دریافت کننده</th>
                                        <th className="text-center">مبلغ</th>
                                        <th>تاریخ</th>
                                        <th className="text-center">عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data?.data.map(item => (
                                            <ItemPayments key={item.id} deleteData={deleteData} data={item}/>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <Pagination data={data}/>
                        </div>
                    </div>
                </div>
                {/* END Row #3 */}
            </div>
        </div>
    );
};

export default Payments;
