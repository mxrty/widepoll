import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card } from "antd";
import { fetchDomains } from "../../actions";

const DomainList = (props) => {
  useEffect(() => {
    props.fetchDomains();
  }, []);

  const renderDomains = () => {
    if (props.domains) {
      return Object.entries(props.domains).map(([key, value]) => {
        return <Card key={key}>{value.domain_name}</Card>;
      });
    }
  };

  return (
    <Card type="inner" title="Domains">
      {renderDomains()}
    </Card>
  );
};

const mapStateToProps = (state) => {
  return { domains: state.domains };
};

export default connect(mapStateToProps, { fetchDomains })(DomainList);
