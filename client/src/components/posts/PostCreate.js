import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Input, Button, Radio, Space, Alert } from "antd";
import * as Yup from "yup";

import { createPost } from "../../actions";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  body: Yup.string(),
});

class PostCreate extends React.Component {
  render() {
    return (
      <div>
        <h3>Create a post</h3>
        <Formik
          initialValues={{
            title: "",
            body: "",
            postType: "DISCUSSION",
            domain: this.props.match.params.domain,
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            this.props.createPost(data);
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
                <label>Post type:</label>
                <Radio.Group
                  value={values.postType}
                  name="postType"
                  onChange={handleChange}
                  buttonStyle="solid"
                >
                  <Radio.Button value="DISCUSSION">Discussion</Radio.Button>
                  <Radio.Button value="ISSUE">Issue</Radio.Button>
                </Radio.Group>
                <br />
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Create Post
                </Button>
              </Space>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect(null, { createPost })(PostCreate);
