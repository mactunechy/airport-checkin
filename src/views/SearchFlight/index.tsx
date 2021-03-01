import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { appContext, userType } from "../../contexts";
import {
  AppForm,
  AppFormField,
  AppSubmitButton,
} from "../../components/base/Forms";
import { searchFlight } from "../../services/flights";
import { useApi } from "../../hooks/useApi";

const searchSchema = Yup.object({
  flightNumber: Yup.string().required().label("Flignt number"),
  lastName: Yup.string().required().label("Last name"),
});

const SearchFlight: React.FC = () => {
  const { loading, request } = useApi<userType>(searchFlight);
  const history = useHistory();
  const { setUser } = useContext(appContext);

  const handleSubmit = async (values: userType) => {
    const response = await request({ data: values });
    console.log("Response", response);
    if (response.ok) {
      setUser(response.data);
      history.push("/checkin");
    }
  };
  return (
    <div className=" search-flight">
      <div className="row mt-5 align-items-center justify-content-center">
        <div className="col-md-4">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">
                Cosi-group | <small className="text-secondary">Airport</small>
              </h4>
            </div>

            <div className="card-body">
              {/* {error && <p className="text-danger">{error}</p>} */}
              <AppForm
                initialValues={{ flightNumber: "", lastName: "" }}
                handleSubmit={handleSubmit}
                validationSchema={searchSchema}
              >
                <AppFormField
                  label="Flight #"
                  name="flightNumber"
                  placeholder="please enter your flight number"
                />
                <AppFormField
                  label="Last name"
                  name="lastName"
                  placeholder="please enter your last name"
                />
                <AppSubmitButton
                  title="Search Flight"
                  className="btn btn-dark"
                  loading={loading}
                />
              </AppForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFlight;
