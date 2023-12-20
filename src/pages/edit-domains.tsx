import  {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";

import callApi from "../helpers/callApi";

const Index = () => {
    let navigate = useNavigate();
    let proms = useParams();
    const [domain , setDomain] = useState();

    useEffect(()=>{
        callApi().get(`/domains/${proms.id}`).then(res => setDomain(res.data.result.domain))
    },[])

    const editDomain = async(e:any)=>{
        e.preventDefault();
        let res = callApi().put(`/domains/${proms.id}`,{domain});
        navigate('/domains');
    }

    return (
        <div className="content">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="block">
                        <div className="block-header block-header-default">
                            <h3 className="block-title">ویرایش دامین </h3>
                        </div>
                        <div className="block-content">
                            <div className="row">
                                <div className="col-md-12">
                                <form id="cost-create-form" onSubmit={editDomain}>
                                    <input type="hidden" name="_token" />
                                    <div className="row">
                                        <div className="form-group col-6">
                                            <label>نام دامین</label>
                                            <input value={domain} onChange={(e:any)=>setDomain(e.target.value)} name='title' className='form-control js-autocomplete'/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-12 text-center">
                                            <button type="submit" className="btn btn-alt-success">
                                                <i className="fa fa-plus mr-5" /> ویرایش دامین
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
