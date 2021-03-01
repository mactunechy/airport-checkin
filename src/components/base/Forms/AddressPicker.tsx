import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { FormikContextType, useFormikContext } from "formik";
import ErrorText from "./ErrorText";

const AddressPicker: React.FC<{
  placeholder: string;
  name: string;
  label?: string;
  className?: string;
  dependencyField?: string;
  dependencyFieldValue?: string[];
}> = ({
  placeholder,
  name,
  label,
  className,
  dependencyField,
  dependencyFieldValue = [],
}) => {
  const {
    setFieldValue,
    values,
    errors,
    touched,
    setFieldTouched,
  } = useFormikContext() as FormikContextType<any> | any;
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });

  const handleInput = (e: any) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }: any) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setFieldValue(name, description);
    setValue(description, false);
    clearSuggestions();
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="list-group-item hover"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  if (
    dependencyField &&
    dependencyFieldValue.indexOf(values[dependencyField]?.value) === -1
  )
    return null;

  return (
    <div className={className}>
      <label htmlFor="">{label && label}</label>
      <div className="mb-4" ref={ref}>
        <input
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder={placeholder || "Select location"}
          className="form-control"
        />

        <ErrorText visible={touched[name]} error={errors[name]} />
        {/* We can use the "status" to decide whether we should display the dropdown or not */}
        {status === "OK" && (
          <ul className="list-group">{renderSuggestions()}</ul>
        )}
      </div>
    </div>
  );
};

export default AddressPicker;
