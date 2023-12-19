import { useState } from "react";
import callApi from "../../../helpers/callApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate()
    const [domain , setDomain] = useState();

    const createDomain = async(e)=>{
        e.preventDefault();
        try {
            let res =  await callApi().post('domains',{domain});
            toast.success('با موفقیت ثبت شد', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            navigate('/domains')
        }catch (err){
            console.log(err);
        }
    }

    return (
        <form id="cost-create-form" onSubmit={createDomain}>
        <input type="hidden" name="_token" />
        <div className="row">
            <div className="form-group col-6">
                <label>نام دامین</label>
                <input value={domain} onChange={(e)=>setDomain(e.target.value)} name='title' className='form-control js-autocomplete'/>
            </div>
        </div> 
        <div className="form-group row">
            <div className="col-12 text-center">
                <button type="submit" className="btn btn-alt-success">
                    <i className="fa fa-plus mr-5" /> افزودن
                </button>
            </div>
        </div>
    </form>
    );
};

export default Create;
