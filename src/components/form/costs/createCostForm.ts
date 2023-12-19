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
    name: yup.string().required(),
    domain_id: yup.number().required(),
    config: yup.string().required(),
});

const CreateCostForm = withFormik<CreateCostFormProps, CreateCostFormInterface>({
    mapPropsToValues: props => ({
        name: '',
        domain_id: undefined,
        config: '',
    }),
    validationSchema: createCostFormValidationSchema,
    handleSubmit: async (values) => {
        let res = await CallApi().post('/configs', values)
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
