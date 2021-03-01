import React from "react";
import { useFormikContext } from "formik";
import ErrorText from "./ErrorText";
import Select from "react-select";

const Picker: React.FC<
  | {
      items: { label: string; value: any }[];
      onBlur?: Function;
      name: string;
    }
  | any
> = ({ name, onBlur, items, placeholder, label, ...otherProps }) => {
  const {
    setFieldValue,
    errors,
    touched,
    values,
    setFieldTouched,
  } = useFormikContext() as any;
  return (
    <div className="form-group">
      {label && <label className="form-group-label">{label}</label>}
      <Select
        value={values[name]}
        placeholder={placeholder}
        onChange={(item: any) => setFieldValue(name, item)}
        name="notifyUserIds"
        options={items}
        className="basic-multi-select"
        classNamePrefix="select"
        cacheOptions
        onBlur={() => {
          if (onBlur) onBlur();
          setFieldTouched(name);
        }}
        defaultOptions
        {...otherProps}
      />
      <ErrorText visible={touched[name]} error={errors[name]} />
    </div>
  );
};

export default Picker;
