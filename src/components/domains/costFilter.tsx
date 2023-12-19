import React from 'react';
import SearchForm from "../form/user-panel/searchForm";
import {useNavigate} from "react-router-dom";

const CostFilter = () => {
    const navigate = useNavigate()
    return (
        <div className="row">
            <div className="col-12">
                <div className="block block-bordered">
                    <div className="block-content">
                        <SearchForm navigate={navigate}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostFilter;