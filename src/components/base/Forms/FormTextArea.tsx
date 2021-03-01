import React from 'react';
import { useFormikContext } from 'formik';
import ErrorText from './ErrorText';

const FormTextArea: React.FC<
    | {
          name: string;
          onBlur?: Function;
          label?: string;
      }
    | any
> = ({ name, onBlur, label, ...otherProps }) => {
    const { setFieldValue, errors, touched, setFieldTouched } = useFormikContext() as any;
    return (
        <div className="form-group">
            {label && <label className="form-group-label">{label}</label>}
            <textarea
                rows={5}
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

export default FormTextArea;
