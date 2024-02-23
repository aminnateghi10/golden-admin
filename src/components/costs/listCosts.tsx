import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import ItemCosts from "./itemCosts";
import { Cutting } from "../../helpers/cutting";
import { RootState } from "../../store";
import callApi from "../../helpers/callApi";
import { setCosts } from "../../store/costs";

const ListCosts = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let location = useLocation();

    const [search, setSearch] = useState('');
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

    const user = useSelector((store: RootState) => store.user.user);
    let costs = useSelector((state: RootState) => state.costs.costs);

    const searchData = (text:string) => {
        setSearch(text);
        // Clear previous timeout if exists
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        // Set a new timeout to wait for 3 seconds before triggering the search
        const timeout = setTimeout(() => {
            callApi().get(`/configs?query=${text}`).then(res => dispatch(setCosts(res.data.result)));
        }, 1000); // 3000 milliseconds = 3 seconds
        setSearchTimeout(timeout);
    };

    useEffect(() => {
        const fetchDataAndDispatch = () => {
            callApi().get(`/configs${location?.search}`).then(res => dispatch(setCosts(res.data.result)));
        }

        fetchDataAndDispatch();
    }, [location?.search]);

    return (
        <div>
            <div className="row js-appear-enabled animated fadeIn" data-toggle="appear">
                {/* Row #3 */}
                <div className="col-md-12">
                    <div className="block block-rounded block-bordered">
                        <div className="block-header block-header-default border-b justify-content-between">
                            <h3 className="block-title">لیست کاربران</h3>
                            <div>
                                <input className="px-1" onChange={(e) => searchData(e.target.value)} placeholder="جستجوی کاربر" />
                            </div>
                        </div>
                        <div className="block-content">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                    <tr>
                                        <th />
                                        <th>#</th>
                                        <th>نام کاربر</th>
                                        {/*@ts-ignore*/}
                                        {user?.is_admin && <th>مدیر اضافه کننده</th>}
                                        <th>تاریخ</th>
                                        <th>توکن</th>
                                        <th className="text-center">عملیات</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        costs?.data?.map((item) => (
                                            <ItemCosts key={item.id} data={item} />
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item disabled" aria-disabled="true" aria-label="« قبلی">
                                        <Link className="page-link" to={{
                                            pathname: `/`,
                                            search: costs?.links?.prev ? Cutting(costs?.links?.prev, 'page=') : ''
                                        }} rel="next" aria-label="بعدی »">‹</Link>
                                    </li>
                                    {
                                        costs?.meta.links.map((item, index) => {
                                                return index != 0 && index + 1 != costs?.meta.links.length &&
                                                    <li className={`page-item ${item.active ? 'active' : ''}`}
                                                        key={index}>
                                                        <NavLink to={{
                                                            pathname: `/`,
                                                            search: item.url ? Cutting(item.url, '?') : ''
                                                        }} className="page-link">{item.label}</NavLink>
                                                    </li>
                                            }
                                        )
                                    }
                                    <li className="page-item">
                                        <Link className="page-link" to={{
                                            pathname: `/`,
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
