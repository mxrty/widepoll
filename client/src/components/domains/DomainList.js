import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Space } from "antd";
import { fetchDomains } from "../../actions";

const DomainList = (props) => {
  useEffect(() => {
    props.fetchDomains();
  }, []);

  const renderDomains = () => {
    if (props.domains) {
      return Object.entries(props.domains).map(([key, value]) => {
        return (
          <Link key={key} to={`/d/${value.domain_name}`}>
            {`/d/${value.domain_name}`}
          </Link>
        );
      });
    }
  };

  return (
    <Card type="inner" title="Domains">
      <Space direction="vertical">{renderDomains()}</Space>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return { domains: state.domains };
};

export default connect(mapStateToProps, { fetchDomains })(DomainList);
