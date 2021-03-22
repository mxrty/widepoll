import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, Button } from "antd";

import PostFeed from "../posts/PostFeed";
import DomainBlurb from "../domains/DomainBlurb";
import { becomeRep } from "../../actions";

const DomainHome = (props) => {
  const renderCreate = () => {
    if (props.isSignedIn) {
      return (
        <Link to={`/d/${props.match.params.domain}/posts/new`}>
          <Button>Create Post</Button>
        </Link>
      );
    }
  };

  const renderRep = () => {
    if (
      props.isSignedIn &&
      !props.domainsRepresented.some(
        (domain) => domain.domain === props.match.params.domain
      )
    ) {
      return (
        <Button
          type="primary"
          danger
          onClick={() => {
            props.becomeRep(props.match.params.domain);
          }}
        >
          Become a representative
        </Button>
      );
    }
  };

  return (
    <Row>
      <Col span={18} style={{ padding: "5px" }}>
        <PostFeed domainName={props.match.params.domain} />
      </Col>
      <Col span={6} style={{ padding: "5px" }}>
        {renderCreate()}
        {renderRep()}
        <DomainBlurb domainName={props.match.params.domain} />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    isRep: state.auth.isRep,
    domainsRepresented: state.auth.domainsRepresented,
  };
};

export default connect(mapStateToProps, { becomeRep })(DomainHome);
