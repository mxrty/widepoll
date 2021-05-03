import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, FieldArray } from "formik";
import { Input, Button, Space, Alert, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import * as Yup from "yup";

import { createPoll } from "../../actions";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string(),
  pollOptions: Yup.array()
    .compact((option) => option.body === "")
    .required(),
});

const PollCreate = (props) => {
  if (props.isSignedIn) {
    return (
      <div>
        <h3>Create a new poll</h3>
        <Formik
          initialValues={{
            title: "",
            description: "",
            pollOptions: [{ body: "Option 1" }, { body: "Option 2" }],
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            props.createPoll(data);
            setSubmitting(false);
          }}
          validationSchema={validationSchema}
        >
          {({ values, isSubmitting, errors, touched }) => (
            <Form>
              <Space size="8" direction="vertical" style={{ width: "60%" }}>
                <label>Poll title:</label>
                <Field
                  name="title"
                  as={Input}
                  placeholder="Title"
                  autoComplete="off"
                />
                {errors.title && touched.title ? (
                  <Alert
                    message={errors.title}
                    type="error"
                    showIcon
                    data-testid="titleError"
                  />
                ) : null}
                <label>Poll description:</label>
                <Field
                  name="description"
                  as={Input}
                  placeholder="Description"
                  autoComplete="off"
                />
                {errors.description && touched.description ? (
                  <Alert message={errors.description} type="error" showIcon />
                ) : null}
                <FieldArray name="pollOptions">
                  {(arrayHelpers) => (
                    <div>
                      <h3>Options:</h3>
                      {values.pollOptions.map((option, index) => {
                        return (
                          <Row>
                            <Col flex="auto">
                              <Field
                                name={`pollOptions.${index}.body`}
                                index={index}
                                key={index}
                                as={Input}
                                placeholder="Option"
                                autoComplete="off"
                              />
                            </Col>
                            <Col>
                              <Button
                                type="primary"
                                danger
                                onClick={() => {
                                  if (values.pollOptions.length > 2) {
                                    arrayHelpers.remove(index);
                                  }
                                }}
                              >
                                <DeleteOutlined />
                              </Button>
                            </Col>
                          </Row>
                        );
                      })}
                      <Button
                        onClick={() => {
                          arrayHelpers.push({ body: "" });
                        }}
                      >
                        Add poll option
                      </Button>
                    </div>
                  )}
                </FieldArray>
                {errors.pollOptions && touched.pollOptions ? (
                  <Alert
                    message={errors.pollOptions}
                    type="error"
                    showIcon
                    data-testid="pollOptionError"
                  />
                ) : null}
                <br />
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Create Poll
                </Button>
              </Space>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    return <div>You must be signed in to create a poll</div>;
  }
};

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { createPoll })(PollCreate);
