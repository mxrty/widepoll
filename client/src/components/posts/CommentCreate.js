import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Input, Button, Space, Alert } from "antd";
import * as Yup from "yup";

import { createComment } from "../../actions";

const validationSchema = Yup.object({
  comment: Yup.string().required(),
});

const CommentCreate = (props) => {
  if (props.isSignedIn)
    return (
      <div>
        <Formik
          initialValues={{
            comment: "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            props.createComment(
              {
                ...data,
                commentType: props.commentType,
                parentId: props.parentId ? props.parentId : 0,
              },
              props.postId
            );
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting, errors, touched }) => (
            <Form>
              <Space size="8" direction="vertical" style={{ width: "60%" }}>
                <Field
                  name="comment"
                  as={Input}
                  placeholder="Comment"
                  autoComplete="off"
                />
                {errors.comment && touched.comment ? (
                  <Alert message={errors.comment} type="error" showIcon />
                ) : null}
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Submit
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

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { createComment })(CommentCreate);
