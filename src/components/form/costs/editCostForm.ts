import * as yup from 'yup'
import { FormikProps, withFormik} from "formik";
import {toast} from "react-toastify";

import {CostsInterface, CreateCostFormInterface} from "../../contracts/userInterface";
import InnerEditCostForm from "../../costs/innerEditCostForm";
import CallApi from "../../../helpers/callApi";

interface EditCostFormProps {
    data : CostsInterface
}

let EditCostFormValidationSchema = yup.object().shape({
    date:yup.string().required(),
    amount:yup.number().required(),
    title:yup.string().required(),
    description:yup.string(),
    user_id:yup.number().required(),
    users_id:yup.array().required(),
});

const EditCostForm = withFormik<EditCostFormProps, CreateCostFormInterface>({
    mapPropsToValues: props => ({
        date:props.data.created_at_jalali,
        amount:+props.data.amount,
        title:props.data.title,
        description:props.data.description,
        user_id:props.data.user.id,
        users_id:props.data.users.map( item => item.id)
    }),
    validationSchema: EditCostFormValidationSchema,
    handleSubmit: async (values) => {
        console.log(values)
        let res = await CallApi().post('/costs',values)
        toast.success(res.data.message, {
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
})((formProps:FormikProps<any>)=>InnerEditCostForm(formProps))

export default EditCostForm