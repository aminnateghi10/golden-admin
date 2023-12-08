
import * as yup from 'yup'
import {withFormik} from "formik";

import InnerLoginForm from "../../auth/innerLoginForm";
import {LoginFormValuesInterface} from "../../contracts/auth/indexInterface";
import callApi from "../../../helpers/callApi";
import {loginToken} from "../../../helpers/auth";

interface LoginFormProps {
    navigate: any,
}

let loginFormValidationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required()
});

const LoginForm = withFormik<LoginFormProps, LoginFormValuesInterface>({


    mapPropsToValues: props => ({
        username: '',
        password: ''
    }),
    validationSchema: loginFormValidationSchema,
    handleSubmit: async (values, {props}) => {

        let {username, password} = values;
        try {
            let res = await callApi().post('/login', {
                username,
                password,
            });
            loginToken(res.data.result.token);
            props.navigate('/')
        } catch (err :any) {
            console.log(err.data)
        }
    }
})(InnerLoginForm)


export default LoginForm;
