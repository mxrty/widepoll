import React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Input, Button, Space, Alert } from "antd";
import * as Yup from "yup";

import { editDomain, fetchDomain, deleteDomain } from "../../actions";
import history from "../../history";

const validationSchema = Yup.object({
  description: Yup.string(),
});

class DomainEdit extends React.Component {
  componentDidMount() {
    this.props.fetchDomain(this.props.match.params.domain);
  }

  renderForm = () => {
    if (this.props.domain) {
      return (
        <div>
          <h3>Edit domain</h3>
          <Formik
            initialValues={{
              description: this.props.domain.description,
            }}
            onSubmit={(data, { setSubmitting }) => {
              setSubmitting(true);
              this.props.editDomain(this.props.domain.domain_name, data);
              setSubmitting(false);
            }}
            validationSchema={validationSchema}
          >
            {({ values, isSubmitting, errors, touched }) => (
              <Form>
                <Space size="8" direction="vertical" style={{ width: "60%" }}>
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
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    Update Domain
                  </Button>
                  <br />
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      this.props.deleteDomain(this.props.domain.domain_name);
                      history.push("/");
                    }}
                  >
                    Delete
                  </Button>
                  <br />
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </Space>
              </Form>
            )}
          </Formik>
        </div>
      );
    }
    return "No domain to edit";
  };

  render() {
    if (this.props.isSignedIn) {
      return this.renderForm();
    } else {
      return <div>You must be signed in to edit a domain</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    domain: state.domains[ownProps.match.params.domain],
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps, {
  editDomain,
  fetchDomain,
  deleteDomain,
})(DomainEdit);
