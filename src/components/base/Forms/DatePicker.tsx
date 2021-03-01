import React from "react";
import { FormikContextType, useFormikContext } from "formik";
import ErrorText from "./ErrorText";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker: React.FC<
  | {
      name: string;
      onBlur?(): void;
      label?: string;
      className?: string;
      dependencyField?: string;
      dependencyFieldValue?: string[];
    }
  | any
> = ({
  name,
  onBlur,
  label,
  className,
  dependencyField,
  dependencyFieldValue,
  ...otherProps
}) => {
  const {
    setFieldValue,
    values,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext() as FormikContextType<any> | any;

  if (
    dependencyField &&
    dependencyFieldValue.indexOf(values[dependencyField]?.value) === -1
  )
    return null;

  return (
    <div className={`form-group ${className}`}>
      {label && (
        <div>
          <label className="form-group-label">{label}</label>
        </div>
      )}
      <ReactDatePicker
        selected={values[name]}
        className="form-control form-input-lg"
        style={{ boxShadow: "none" }}
        wrapperClassName="form-control border border-secondary form-input-lg"
        onChange={(date: any) => setFieldValue(name, date)}
        onBlur={() => {
          if (onBlur) onBlur();
          setFieldTouched(name);
        }}
        {...otherProps}
      />
      <ErrorText visible={touched[name]} error={errors[name]} />
    </div>
  );
};

export default DatePicker;
