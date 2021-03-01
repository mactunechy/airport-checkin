import React from "react";
import { Formik } from "formik";

const Form: React.FC<{
  initialValues: any;
  handleSubmit: Function;
  validationSchema: any;
}> = ({ initialValues, handleSubmit, validationSchema, children }) => {
  return (
    <div className="form">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit as any}
      >
        {() => children}
      </Formik>
    </div>
  );
};

export default Form;
