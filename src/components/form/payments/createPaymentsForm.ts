import * as yup from 'yup'
import {FormikProps, withFormik} from "formik";

import {CreatePaymentsFormInterface, UserInterface} from "../../contracts/userInterface";
import InnerCreatePaymentsForm from "../../costs/innerCreatePaymentsForm";
import CallApi from "../../../helpers/callApi";
import {toast} from "react-toastify";

interface CreatePaymentsFormProps {
    user?: UserInterface
}

let createPaymentsFormValidationSchema = yup.object().shape({
    date: yup.string().required(),
    amount: yup.number().required(),
    paid_user_id: yup.string().required(),
    payer_user_id: yup.string().required(),
    description: yup.string(),
});

const CreatePaymentsForm = withFormik<CreatePaymentsFormProps, CreatePaymentsFormInterface>({
    mapPropsToValues: props => ({
        amount: undefined,
        date: '',
        description: '',
        paid_user_id: '',
        payer_user_id: props.user ? props.user.id : ''
    }),
    validationSchema: createPaymentsFormValidationSchema,
    handleSubmit: async (values) => {
        console.log(values)
        try {
            let res = await CallApi().post('/payments', values)
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
        } catch (err: any) {
            console.log(err.data.errors)
        }

    }
})((formProps: FormikProps<any>) => InnerCreatePaymentsForm(formProps))

export default CreatePaymentsForm;