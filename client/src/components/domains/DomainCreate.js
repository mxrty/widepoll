import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Input, Button, Space, Alert } from "antd";
import * as Yup from "yup";

import { createDomain } from "../../actions";

const validationSchema = Yup.object({
  domainName: Yup.string().required(),
  description: Yup.string(),
});

const DomainCreate = (props) => {
  if (props.isSignedIn) {
    return (
      <div>
        <h3>Create a new domain</h3>
        <Formik
          initialValues={{
            domainName: "",
            description: "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            props.createDomain(data);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting, errors, touched }) => (
            <Form>
              <Space size="8" direction="vertical" style={{ width: "60%" }}>
                <label>Domain Name:</label>
                <Field
                  name="domainName"
                  as={Input}
                  placeholder="Domain name"
                  autoComplete="off"
                />
                {errors.domainName && touched.domainName ? (
                  <Alert message={errors.domainName} type="error" showIcon />
                ) : null}
                <label>Domain description:</label>
                <Field
                  name="description"
                  as={Input}
                  placeholder="Domain description"
                  autoComplete="off"
                />
                {errors.description && touched.description ? (
                  <Alert message={errors.description} type="error" showIcon />
                ) : null}
                <br />
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Create Domain
                </Button>
              </Space>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    return <div>You must be signed in to create a domain</div>;
  }
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { createDomain })(DomainCreate);
