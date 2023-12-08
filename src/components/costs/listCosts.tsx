import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, NavLink, useLocation} from "react-router-dom";

import ItemCosts from "./itemCosts";
import {Cutting} from "../../helpers/cutting";
import {RootState} from "../../store";
import callApi from "../../helpers/callApi";
import {setCosts} from "../../store/costs";

const ListCosts = () => {
    const dispatch = useDispatch()
    let location = useLocation();

    let costs = useSelector((state: RootState) => state.costs.costs)

    useEffect(() => {
        callApi().get(`/costs${location?.search}`).then(res => dispatch(setCosts(res.data.result)))
    }, [location?.search])
    return (
        <div>
            <div className="row js-appear-enabled animated fadeIn" data-toggle="appear">
                {/* Row #3 */}
                <div className="col-md-12">
                    <div className="block block-rounded block-bordered">
                        <div className="block-header block-header-default border-b">
                            <h3 className="block-title">لیست هزینه ها</h3>
                        </div>
                        <div className="block-content">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th/>
                                        <th>#</th>
                                        <th>عنوان هزینه</th>
                                        <th className="text-center">مبلغ</th>
                                        <th>هزینه کننده</th>
                                        <th>تاریخ</th>
                                        <th className="text-center">سهم شما (تومان)</th>
                                        <th className="text-center">عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        costs?.data?.map((item) => (
                                            <ItemCosts key={item.id} data={item}/>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item disabled" aria-disabled="true" aria-label="« قبلی">
                                        <Link className="page-link" to={{
                                            pathname: `/costs`,
                                            search: costs?.links?.prev ? Cutting(costs?.links?.prev, 'page=') : ''
                                        }} rel="next" aria-label="بعدی »">‹</Link>
                                    </li>
                                    {
                                        costs?.meta.links.map((item, index) => {
                                                return index != 0 && index + 1 != costs?.meta.links.length &&
                                                    <li className={`page-item ${item.active ? 'active' : ''}`}
                                                        key={index}>
                                                        <NavLink to={{
                                                            pathname: `/costs`,
                                                            search: item.url ? Cutting(item.url, '?') : ''
                                                        }} className="page-link">{item.label}</NavLink>
                                                    </li>
                                            }
                                        )
                                    }
                                    <li className="page-item">
                                        <Link className="page-link" to={{
                                            pathname: `/costs`,
                                            search: costs?.links?.next ? Cutting(costs?.links?.next, 'page=') : ''
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