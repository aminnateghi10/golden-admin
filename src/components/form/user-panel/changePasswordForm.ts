import * as yup from 'yup'
import {withFormik} from "formik";

import callApi from "../../../helpers/callApi";
import InnerChangePassword from "../../user-panel/innerChangePassword";
import {ChangePasswordFormInterface} from "../../contracts/userInterface";
import {toast} from "react-toastify";

interface ChangePasswordFormProps {
}

let changePasswordFormValidationSchema = yup.object().shape({
    prev_password: yup.string().required('گذرواژه قبلی الزامی است.'),
    password: yup.string().required('گذرواژه الزامی است.'),
    password_confirmation: yup.string().required('تکرار گذرواژه الزامی است.').oneOf([yup.ref('password'), null], 'گذرواژه ها مطابقت ندارند'),
});

const ChangePasswordForm = withFormik<ChangePasswordFormProps, ChangePasswordFormInterface>({

    mapPropsToValues: props => ({
        prev_password: '',
        password: '',
        password_confirmation: '',
    }),
    validationSchema: changePasswordFormValidationSchema,
    handleSubmit: async (values) => {
        console.log(values)
        try {
            let res = await callApi().post('/change-password', values);
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
            console.log(err.data)
        }
    }
})(InnerChangePassword)

export default ChangePasswordForm;
