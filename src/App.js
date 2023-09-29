import { Formik } from "formik";
import * as yup from "yup";
import { Container, Button, Col, Form, Row } from "react-bootstrap";

const schemaValidation = yup.object().shape({
  userName: yup.string().required("User Name is required"),
  email: yup.string().email().required("Email is required"),
  company: yup.string().required("Company type is required"),
  companyName: yup.string().when("company", {
    is: (val) => val === "Other",
    then: yup.string().required("Company Name type is required"),
  }),
});

const App = () => {
  const initialValue = {
    userName: "",
    email: "",
    company: "",
    companyName: "",
  };

  const checkValid = (touched, error) => {
    if (touched && !error) {
      return "is-valid";
    }
  };
  return (
    <Container className="bg-light">
      <Formik
        onSubmit={(value) => {
          console.log(value);
        }}
        initialValues={initialValue}
        validationSchema={schemaValidation}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3 mt-5 justify-content-center">
              <Form.Group as={Col} md="4">
                <Form.Label> Name</Form.Label>
                <Form.Control
                  type="text"
                  name="userName"
                  value={values.userName}
                  placeholder="Enter Your Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={checkValid(touched.userName, errors.userName)}
                  isInvalid={touched.userName && errors.userName}
                />
                <Form.Control.Feedback>Perfect</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.userName}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className={checkValid(touched.email, errors.email)}
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  value={values.email}
                  isInvalid={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback>Perfect</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3 mt-5 justify-content-center">
              <Form.Group as={Col} md="3">
                <Form.Label>Select Company type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="company"
                  value={values.company}
                  className={checkValid(touched.company, errors.company)}
                  isInvalid={touched.company && errors.company}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option>Select Type</option>
                  <option value="Service-based">Service-based</option>
                  <option value="Product Based">Product Based</option>
                  <option value="Other">Other</option>
                </Form.Select>
                <Form.Control.Feedback>Perfect</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.company}
                </Form.Control.Feedback>
              </Form.Group>
              {values.company === "Other" ? (
                <Form.Group as={Col} md="3">
                  <Form.Label>Declare Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Type"
                    name="companyName"
                    value={values.companyName}
                    className={checkValid(
                      touched.companyName,
                      errors.companyName
                    )}
                    isInvalid={touched.companyName && errors.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Control.Feedback>Perfect</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.companyName}
                  </Form.Control.Feedback>
                </Form.Group>
              ) : null}
            </Row>
            <Row className="mb-5 mt-4 justify-content-center">
              <div className="col-2 mb-3">
                <Button type="submit" style={{ width: "120px" }}>
                  Submit
                </Button>
              </div>
            </Row>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default App;
