import * as yup from 'yup'
import {FormikProps, withFormik} from "formik";

import InnerSearch from "../../user-panel/innerSearch";
import {SearchFormInterface} from "../../contracts/userInterface";
import {NavigateFunction} from "react-router-dom";


interface SearchFormProps {
    navigate:NavigateFunction
}

let scratchFormValidationSchema = yup.object().shape({
    filter_search: yup.array(),
    search: yup.string(),
    from_date: yup.string(),
    to_date: yup.string()
});

const SearchForm = withFormik<SearchFormProps, SearchFormInterface>({
    mapPropsToValues: props => ({
        filter_search: [],
        search: '',
        from_date: '',
        to_date: ''
    }),
    validationSchema: scratchFormValidationSchema,
    handleSubmit: (values,{props}) => {
        let {search,filter_search,from_date,to_date} = values;
        props.navigate(`/costs?${search? '&search='+search :''}${from_date ? '&from_date='+from_date : ''}${to_date ? '&to_date='+to_date : ''}${filter_search ? '&' +filter_search.join('=1&') +'=1&' :''}`)
    }
})((formProps: FormikProps<any>) => InnerSearch(formProps))

export default SearchForm;