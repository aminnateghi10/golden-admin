import * as yup from 'yup'
import {FormikProps, withFormik} from "formik";

import {CreateCostFormInterface, UserInterface} from "../../contracts/userInterface";
import InnerCreateCostForm from "../../costs/innerCreateCostForm";
import CallApi from "../../../helpers/callApi";
import {toast} from "react-toastify";

interface CreateCostFormProps {
    user?: UserInterface
}

let createCostFormValidationSchema = yup.object().shape({
    date: yup.string().required(),
    amount: yup.number().required(),
    title: yup.string().required(),
    description: yup.string(),
    user_id: yup.number().required(),
    users_id: yup.array().required(),
});

const CreateCostForm = withFormik<CreateCostFormProps, CreateCostFormInterface>({
    mapPropsToValues: props => ({
        date: '',
        amount: undefined,
        title: '',
        description: '',
        user_id: props?.user?.id,
        users_id: [],
    }),
    validationSchema: createCostFormValidationSchema,
    handleSubmit: async (values) => {
        console.log(values)
        let res = await CallApi().post('/costs', values)
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
})((formProps: FormikProps<any>) => InnerCreateCostForm(formProps))

export default CreateCostForm;
