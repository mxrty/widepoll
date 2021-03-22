import React from "react";
import { Card } from "antd";

const DomainBlurb = (props) => {
  return (
    <Card type="inner" title={props.domainName}>
      <p>This is a short description of the domain to show visitors.</p>
      <small>42 people currently browsing this domain.</small>
    </Card>
  );
};

export default DomainBlurb;
