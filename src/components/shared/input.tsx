import {ErrorMessage, Field} from "formik";
import {FC} from "react";

interface InputProps {
    name: string,
    label?: string,
    type?: string,
    inputClassName?: string,
    labelClassName?: string,
    errorClassName?: string,
    as?: string,
    placeholder?: string,
    rows?:number|string,
}

const Input: FC<InputProps> = ({name, label, type = 'text', inputClassName, labelClassName, errorClassName, as,placeholder,rows}) => {
    return (
        <>
            {
                label ? <label htmlFor={name} className={labelClassName}>{label}</label> : null
            }
            <Field as={as} name={name} id={name} type={type} className={inputClassName} placeholder={placeholder} rows={rows}/>
            <ErrorMessage className={errorClassName} name={name}/>
        </>
    )
}

export default Input;