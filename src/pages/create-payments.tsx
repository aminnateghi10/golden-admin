import CreatePaymentsForm from "../components/form/payments/createPaymentsForm";
import {useSelector} from "react-redux";

import {RootState} from "../store/index";

const CreatePayments = () => {

    const user = useSelector((state: RootState) => state.user.user)

    return (
        <div className="content">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="block">
                        <div className="block-header block-header-default">
                            <h3 className="block-title">ثبت پرداختی جدید</h3>
                        </div>
                        <div className="block-content">
                            <div className="row">
                                <div className="col-md-12">
                                    <CreatePaymentsForm user={user}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePayments;