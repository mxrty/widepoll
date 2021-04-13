import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card } from "antd";

import { fetchDomain } from "../../actions";

const DomainBlurb = (props) => {
  useEffect(() => {
    props.fetchDomain(props.domainName);
  }, []);

  return (
    <Card type="inner" title={props.domainName}>
      {props.domain ? <p>{props.domain.description}</p> : null}
      <small>1 person currently browsing this domain.</small>
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { domain: state.domains[ownProps.domainName] };
};

export default connect(mapStateToProps, { fetchDomain })(DomainBlurb);
