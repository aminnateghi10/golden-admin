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
    name: yup.string().required('نام کاربری الزامی است.'),
    domain_id: yup.number().required('آدرس دامین الزامی است.'),
    config: yup.string().required('آدرس کانفیگ الزامی است.'),
});

const EditCostForm = withFormik<EditCostFormProps, CreateCostFormInterface>({
// @ts-ignore
    mapPropsToValues: props => ({
        // @ts-ignore
        name: props.data?.name,
        // @ts-ignore
        domain_id: props.data?.domain.domain,
        // @ts-ignore
        config: props.data.config,
    }),
    validationSchema: EditCostFormValidationSchema,
    handleSubmit: async (values) => {
        let res = await CallApi().post('/configs',values)
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
