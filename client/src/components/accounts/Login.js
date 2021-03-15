import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Input, Button, Space, Alert } from "antd";
import * as Yup from "yup";

import { signIn } from "../../actions";

const validationSchema = Yup.object({
  email: Yup.string(),
  password: Yup.string(),
});

const Login = (props) => {
  console.log(`isSignedIn: ${props.isSignedIn}`);

  if (!props.isSignedIn) {
    return (
      <div>
        <h3>Login</h3>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            props.signIn(data);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting, handleChange, errors, touched }) => (
            <Form>
              <Space size="8" direction="vertical" style={{ width: "60%" }}>
                <label>Email</label>
                <Field name="email" as={Input} placeholder="Email" />
                {errors.email && touched.email ? (
                  <Alert message={errors.email} type="error" showIcon />
                ) : null}
                <label>Password</label>
                <Field name="password" as={Input} placeholder="Password" />
                {errors.password && touched.password ? (
                  <Alert message={errors.password} type="error" showIcon />
                ) : null}
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Sign In
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

export default connect(mapStateToProps, { signIn })(Login);
