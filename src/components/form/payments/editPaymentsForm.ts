import * as yup from 'yup'
import { FormikProps, withFormik} from "formik";

import {CreatePaymentsFormInterface, PaymentsDataInterface} from "../../contracts/userInterface";
import InnerCreatePaymentsForm from "../../costs/innerCreatePaymentsForm";
import CallApi from "../../../helpers/callApi";
import {toast} from "react-toastify";

interface EditPaymentsFormProps {
    data:PaymentsDataInterface
}

let editPaymentsFormValidationSchema = yup.object().shape({
    date:yup.string().required(),
    amount:yup.number().required(),
    paid_user_id:yup.string().required(),
    payer_user_id:yup.string().required(),
    description:yup.string(),
});

const EditPaymentsForm = withFormik<EditPaymentsFormProps, CreatePaymentsFormInterface>({
    mapPropsToValues: props => ({
        amount:props.data.amount,
        date:props.data.created_at_jalali,
        description:props.data.description,
        paid_user_id:props.data.paid.id,
        payer_user_id:props.data.payer.id,
    }),
    validationSchema: editPaymentsFormValidationSchema,
    handleSubmit: async (values,{props}) => {
        let res = await CallApi().post(`/payments/${props.data.id}`, {...values , _method:'put'})
        toast.success(res.data.message.message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }
})((formProps:FormikProps<any>)=>InnerCreatePaymentsForm(formProps))

export default EditPaymentsForm;