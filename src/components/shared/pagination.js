import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Cutting} from "../../helpers/cutting";

const Pagination = ({data}) => {
    return (
        <nav>
            <ul className="pagination">
                <li className="page-item disabled" aria-disabled="true" aria-label="« قبلی">
                    <Link className="page-link" to={{
                        pathname: `/payments`,
                        // @ts-ignore
                        search: data?.links?.prev ? Cutting(data?.links?.prev, 'page=') : ''
                    }} rel="next" aria-label="بعدی »">‹</Link>
                </li>
                {
                    data?.meta.links.map((item, index) => {
                        // @ts-ignore
                            return index != 0 && index + 1 != data?.meta.links.length &&
                                <li className={`page-item ${item.active ? 'active' : ''}`}
                                    key={index}>
                                    <NavLink to={{
                                        pathname: `/payments`,
                                        search: item.url ? Cutting(item.url, '?') : ''
                                    }} className="page-link">{item.label}</NavLink>
                                </li>
                        }
                    )
                }
                <li className="page-item">
                    <Link className="page-link" to={{
                        pathname: `/payments`,
                        search: data?.links?.next ? Cutting(data?.links?.next, 'page=') : ''
                    }}>›</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
