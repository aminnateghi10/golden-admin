import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Link, NavLink, useLocation} from "react-router-dom";

import ItemCosts from "./itemCosts";
import {Cutting} from "../../helpers/cutting";
import callApi from "../../helpers/callApi";
import {setCosts} from "../../store/costs";
import { toast } from 'react-toastify';

const ListCosts = () => {
    let location = useLocation();

    const [data, setData] = useState<{data:any[],links:any[]}>();


    useEffect(() => {
        callApi().get(`/domains`).then(res => setData(res.data.result));
    }, [location?.search])

    let deleteHandler = async (id : number) => {
        let res = await callApi().delete(`/domains/${id}`);
        try {
            // @ts-ignore
            let newData = data.data.filter((item) => item.id !== id);
            // @ts-ignore
            setData({...data,data:newData})
            toast.success(res.data.message.message, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className="row js-appear-enabled animated fadeIn" data-toggle="appear">
                {/* Row #3 */}
                <div className="col-md-12">
                    <div className="block block-rounded block-bordered">
                        <div className="block-header block-header-default border-b justify-content-between">
                            <h3 className="block-title">لیست دامین ها</h3>
                        </div>
                        <div className="block-content">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>نام دامین</th>
                                        <th className="text-center">عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data?.data?.map((item,index) => (
                                            <ItemCosts deleteHandler={deleteHandler} index={index} key={item.id} data={item}/>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item disabled" aria-disabled="true" aria-label="« قبلی">
                                        <Link className="page-link" to={{
                                            pathname: `/domains`,
                                            // @ts-ignore
                                            search: data?.links?.prev ? Cutting(data?.links?.prev, 'page=') : ''
                                        }} rel="next" aria-label="بعدی »">‹</Link>
                                    </li>
                                    {
                                        // @ts-ignore
                                        data?.meta.links.map((item, index) => {
                                            // @ts-ignore
                                                return index != 0 && index + 1 != data?.meta.links.length &&
                                                    <li className={`page-item ${item.active ? 'active' : ''}`}
                                                        key={index}>
                                                        <NavLink to={{
                                                            pathname: `/domains`,
                                                            search: item.url ? Cutting(item.url, '?') : ''
                                                        }} className="page-link">{item.label}</NavLink>
                                                    </li>
                                            }
                                        )
                                    }
                                    <li className="page-item">
                                        <Link className="page-link" to={{
                                            pathname: `/domains`,
                                            // @ts-ignore
                                            search: data?.links?.next ? Cutting(data?.links?.next, 'page=') : ''
                                        }}>›</Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* END Row #3 */}
            </div>
        </div>
    );
};

export default ListCosts;
