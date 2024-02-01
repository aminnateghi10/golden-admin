import * as yup from 'yup'
import {FormikProps, withFormik} from "formik";

import {CreateCostFormInterface, UserInterface} from "../../contracts/userInterface";
import InnerCreateCostForm from "../../costs/innerCreateCostForm";
import CallApi from "../../../helpers/callApi";
import {toast} from "react-toastify";

interface CreateCostFormProps {
    user?: UserInterface,
    navigate:any
}

let createCostFormValidationSchema = yup.object().shape({
    name: yup.string().required('نام کاربری الزامی است.'),
    domain_id: yup.number().required('آدرس دامین الزامی است.'),
    config: yup.string().required('آدرس کانفیگ الزامی است.'),
});

const CreateCostForm = withFormik<CreateCostFormProps, CreateCostFormInterface>({
    // @ts-ignore
    mapPropsToValues: props => ({
        name: '',
        domain_id: undefined,
        config: '',
    }),
    validationSchema: createCostFormValidationSchema,
    handleSubmit: async (values, {props}) => {
        try {
            let res = await CallApi().post('/configs', values);
            toast.success(".با موفقیت اضافه شد", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            props.navigate('/');
        }catch ({data}){
            // @ts-ignore
            data?.errors?.name?.map((item) =>{
                toast.success(item, {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
        }

    }
})((formProps: FormikProps<any>) => InnerCreateCostForm(formProps))

export default CreateCostForm;
