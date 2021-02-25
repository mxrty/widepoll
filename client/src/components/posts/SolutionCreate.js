import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Input, Button, Space, Alert } from "antd";
import * as Yup from "yup";

import { createSolution } from "../../actions";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  body: Yup.string().required(),
});

const SolutionCreate = (props) => {
  return (
    <div>
      <h3>Create a new solution for issue BASLASDASDA</h3>
      <Formik
        initialValues={{
          title: "",
          body: "",
        }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          props.createSolution({ ...data, issueId: props.match.params.postId });
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting, handleChange, errors, touched }) => (
          <Form>
            <Space size="8" direction="vertical" style={{ width: "60%" }}>
              <label>Title:</label>
              <Field
                name="title"
                as={Input}
                placeholder="Post title"
                autoComplete="off"
              />
              {errors.title && touched.title ? (
                <Alert message={errors.title} type="error" showIcon />
              ) : null}
              <label>Post body:</label>
              <Field
                name="body"
                as={Input}
                placeholder="Post body"
                autoComplete="off"
              />
              {errors.body && touched.body ? (
                <Alert message={errors.body} type="error" showIcon />
              ) : null}

              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Create Solution
              </Button>
              <br />
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Space>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, { createSolution })(SolutionCreate);
