import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

import {RootState} from "../store";
import CreateCostForm from "../components/form/costs/createCostForm";

const CreateCosts = () => {
    const navigate = useNavigate();
    const  user = useSelector((store:RootState )=> store.user.user);

    return (
    <div className="content">
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <div className="block">
                    <div className="block-header block-header-default">
                        <h3 className="block-title">افزودن کاربر جدید</h3>
                    </div>
                    <div className="block-content">
                        <div className="row">
                            <div className="col-md-12">
                                <CreateCostForm user={user} navigate={navigate}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
};

export default CreateCosts;
