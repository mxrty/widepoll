import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Input, Button, Space, Alert } from "antd";
import * as Yup from "yup";

import { register } from "../../actions";

const validationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string().required(),
});

const Register = (props) => {
  if (!props.isSignedIn) {
    return (
      <div>
        <h3>Register</h3>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            props.register(data);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting, errors, touched }) => (
            <Form>
              <Space size="8" direction="vertical" style={{ width: "60%" }}>
                <label>Name</label>
                <Field
                  name="name"
                  as={Input}
                  placeholder="Firstname Lastname"
                />
                {errors.name && touched.name ? (
                  <Alert
                    message={errors.name}
                    type="error"
                    showIcon
                    data-testid="nameError"
                  />
                ) : null}
                <label>Email</label>
                <Field name="email" as={Input} placeholder="Email" />
                {errors.email && touched.email ? (
                  <Alert
                    message={errors.email}
                    type="error"
                    showIcon
                    data-testid="emailError"
                  />
                ) : null}
                <label>Password</label>
                <Field name="password" as={Input} placeholder="Password" />
                {errors.password && touched.password ? (
                  <Alert
                    message={errors.password}
                    type="error"
                    showIcon
                    data-testid="passwordError"
                  />
                ) : null}
                <label>Confirm password</label>
                <Field
                  name="confirmPassword"
                  as={Input}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <Alert
                    message={errors.confirmPassword}
                    type="error"
                    showIcon
                    data-testid="confirmPasswordError"
                  />
                ) : null}
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Register
                </Button>
                <br />
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Space>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    return <div>Already logged in.</div>;
  }
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { register })(Register);
