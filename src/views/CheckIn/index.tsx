import React, { useContext, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Modal, Table } from "react-bootstrap";
import countryList from "react-select-country-list";
import PreviewTable from "./PreviewTable";

import {
  AppForm,
  AppFormField,
  AppPicker,
  AppSubmitButton,
  AddressPicker,
  DatePicker,
} from "../../components/base/Forms";
import { appContext, userType } from "../../contexts";
import { useApi } from "../../hooks/useApi";
import { checkIn } from "../../services/flights";

const checkInSchema = Yup.object({
  flightNumber: Yup.string().required().label("Flight number"),
  lastName: Yup.string().required().label("Last name"),
  firstName: Yup.string().required().label("Last name"),
  phone: Yup.string().required().label("Phone"),
  email: Yup.string().email().required().label("Email Address"),
  nationality: Yup.object()
    .required()
    .label("Nationality ")
    .typeError("Nationality is a required field"),
});

const CheckIn = () => {
  const { loading, request } = useApi<userType>(checkIn);
  const [previewModal, setPreviewModal] = useState<boolean>(false);
  const history = useHistory();
  const { setUser, user } = useContext(appContext);
  const nationalityOptions = useMemo(() => countryList().getData(), []);

  const handleSubmit = async (values: userType, { resetForm }: any) => {
    //preview details
    if (!previewModal) return setPreviewModal(true);
    const response = await request({ data: values });
    console.log("Response", response);
    if (response.ok) {
      resetForm();
      history.push("/done");
    }
  };

  const handlePreviewModalOpen = () => setPreviewModal(true);
  const handlePreviewModalClose = () => setPreviewModal(false);

  return (
    <div className=" container ">
      <div className="row my-5 justify-content-center">
        <div className="col-md-8">
          <div className="card ">
            <div className="card-header ">
              <h4 className="card-title">
                Cosi-group | <small className="text-secondary">Check-in</small>
              </h4>
            </div>

            <div className="card-body">
              {user?.lastName && <h4> Hi {user.lastName}</h4>}
              {/* {error && <p className="text-danger">{error}</p>} */}
              <AppForm
                initialValues={{
                  flightNumber: "",
                  lastName: "",
                  nationality: "",
                  firstName: "",
                  email: "",
                }}
                handleSubmit={handleSubmit}
                validationSchema={checkInSchema}
              >
                <div className="row">
                  <div className="col-md-6">
                    <AppFormField
                      label="First name"
                      name="firstName"
                      placeholder="please enter your first name"
                    />
                  </div>
                  <div className="col-md-6">
                    <AppFormField
                      label="Last name"
                      name="lastName"
                      placeholder="please enter your last name"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <AppFormField
                      label="Email Address"
                      name="email"
                      placeholder="please enter your email address"
                    />
                  </div>
                  <div className="col-md-6">
                    <AppFormField
                      label="Phone number "
                      name="phone"
                      placeholder="please enter phone number "
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <AppFormField
                      label="Flight #"
                      name="flightNumber"
                      placeholder="please enter your flight number"
                    />
                  </div>
                  <div className="col-md-6">
                    <AppPicker
                      name="nationality"
                      items={nationalityOptions}
                      label="Nationality"
                    />
                  </div>
                </div>

                <div className="row">
                  <AddressPicker
                    name="passportLocationOfIssue"
                    placeholder="Where was your passport issued"
                    label="Passport location of issue"
                    className="col-md-4"
                    dependencyField="nationality"
                    dependencyFieldValue={["GR"]}
                  />

                  <DatePicker
                    name="passportExpiryDate"
                    label="Passport expiry date"
                    placeholder="When does your passport expire?"
                    className="col-md-4"
                    dependencyField="nationality"
                    dependencyFieldValue={["AT", "GR"]}
                  />
                  <DatePicker
                    name="passportDateOfIssue"
                    label="Passport date of issue"
                    placeholder="when was you passport issued"
                    className="col-md-4"
                    dependencyField="nationality"
                    dependencyFieldValue={["GR"]}
                  />
                </div>

                <AddressPicker
                  name="residance"
                  placeholder="Where do you live?"
                  label="Residence"
                  dependencyField="nationality"
                  dependencyFieldValue={["ES", "AT", "FR", "BE"]}
                />
                <div className="row">
                  <AddressPicker
                    name="birthPlace"
                    placeholder="your place of birth"
                    label="Place of birth"
                    className="col-md-6"
                    dependencyField="nationality"
                    dependencyFieldValue={["FR"]}
                  />

                  <DatePicker
                    name="birthDate"
                    label="Date of birth"
                    placeholder="When were you born"
                    className="col-md-6"
                    dependencyField="nationality"
                    dependencyFieldValue={["BE", "FR"]}
                  />
                </div>

                <AppSubmitButton
                  title="Preview"
                  className="btn btn-dark"
                  loading={loading}
                />

                <Modal
                  size="lg"
                  backdrop="static"
                  show={previewModal}
                  onHide={handlePreviewModalClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Please review your information</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <PreviewTable />
                    <Modal.Footer>
                      <AppSubmitButton
                        title="Submit"
                        className="btn btn-dark"
                        loading={loading}
                      />
                    </Modal.Footer>
                  </Modal.Body>
                </Modal>
              </AppForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
