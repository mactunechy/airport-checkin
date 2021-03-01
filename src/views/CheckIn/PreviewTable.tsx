import { FormikContextType, useFormikContext } from "formik";
import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { startCase } from "lodash";
import countryList from "react-select-country-list";
import moment from "moment";

const PreviewTable = () => {
  const { values } = useFormikContext() as any;
  const nationalityOptions = useMemo(() => countryList().getData(), []);
  const parseOptionLabel = (value: string) => {
    return (
      nationalityOptions.find((option: any) => option.value == value)?.label ||
      value
    );
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Property</th>
          <th>Information</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(values).map((key: string, idx: number) => {
          const value: any = values[key];
          return (
            <tr key={"preview" + idx}>
              <td>{idx + 1}</td>
              <td>{startCase(key)}</td>
              <td>
                {/Date$/.test(key)
                  ? moment(value).calendar()
                  : typeof value === "string"
                  ? value
                  : parseOptionLabel(values[key]?.value)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default PreviewTable;
