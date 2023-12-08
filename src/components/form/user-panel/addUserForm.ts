import * as yup from 'yup'
import {withFormik} from "formik";

import {AddUserFormInterface} from "../../contracts/userInterface";
import InnerAddUser from "../../costs/innerAddUser";
import CallApi from "../../../helpers/callApi";
import {toast} from "react-toastify";

interface AddUserFormProps {
}

let addUserFormValidationSchema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required().max(10).min(6),
    password_confirmation: yup.string().required().oneOf([yup.ref('password')], 'Passwords must match'),
});

const AddUserForm = withFormik<AddUserFormProps, AddUserFormInterface>({
    mapPropsToValues: props => ({
        name: '',
        username: '',
        password: '',
        password_confirmation: ''
    }),
    validationSchema: addUserFormValidationSchema,
    handleSubmit: async (values) => {
        try {
            let res = await CallApi().post('users', values)
            toast.success('با موفیت اضافه شد', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (err) {
            console.log(err)
        }
    }
})(InnerAddUser)

export default AddUserForm;