import React from 'react';
import { FormikContextType, useFormikContext } from 'formik';
import ErrorText from './ErrorText';

const FormField: React.FC<
    | {
          name: string;
          onBlur?: Function;
          label?: string;
      }
    | any
> = ({ name, onBlur, label, ...otherProps }) => {
    const { setFieldValue, values, errors, touched, setFieldTouched } = useFormikContext() as
        | FormikContextType<any>
        | any;
    return (
        <div className="form-group">
            {label && <label className="form-group-label">{label}</label>}
            <input
                value={values[name]}
                className="form-control"
                {...otherProps}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue(name, e.target.value)}
                onBlur={() => {
                    if (onBlur) onBlur();
                    setFieldTouched(name);
                }}
            />
            <ErrorText visible={touched[name]} error={errors[name]} />
        </div>
    );
};

export default FormField;
