import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Input, Button, Alert } from "antd";
import * as Yup from "yup";

import { createComment } from "../../actions";

const validationSchema = Yup.object({
  comment: Yup.string().required(),
});

const CommentCreate = (props) => {
  if (props.isSignedIn) {
    return (
      <div style={{ backgroundColor: "lightgrey", padding: "12px" }}>
        <Formik
          initialValues={{
            comment: "",
          }}
          onSubmit={(data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            props.createComment(
              {
                ...data,
                commentType: props.commentType,
                parentId: props.parentId ? props.parentId : 0,
              },
              props.postId
            );
            resetForm({});
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting, errors, touched }) => (
            <Form>
              <Field
                name="comment"
                value={values.comment || ""}
                as={Input.TextArea}
                placeholder="Reply"
                autoComplete="off"
              />
              {errors.comment && touched.comment ? (
                <Alert
                  message={errors.comment}
                  type="error"
                  showIcon
                  data-testid="commentError"
                />
              ) : null}
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { createComment })(CommentCreate);
