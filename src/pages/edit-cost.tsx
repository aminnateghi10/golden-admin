import React, {useEffect, useState} from 'react';

import EditCostForm from "../components/form/costs/editCostForm";
import {useNavigate, useParams} from "react-router-dom";
import callApi from "../helpers/callApi";

const EditCost = () => {
    let proms = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
        callApi().get(`/configs/${proms.id}`).then(res => setData(res.data.result))
    },[])
    const [data , setData] = useState();
    return (
        <div className="content">
            {
                data ?
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <div className="block">
                                <div className="block-header block-header-default">
                                    <h3 className="block-title">ویرایش هزینه </h3>
                                </div>
                                <div className="block-content">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <EditCostForm navigate={navigate} data={data}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :null
            }
        </div>
    );
};

export default EditCost;
