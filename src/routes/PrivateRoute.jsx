import React from "react";
import { Route } from "react-router-dom";

import ServiceWrapper from "../components/ServiceWrapper";

const PrivateRoute = ({ component: Component, children, ...rest }) => {
  //회원 페이지 제제 => 리다이렉트 등이 사용할때 이용

  return (
    <Route
      {...rest}
      render={(props) => (
        <ServiceWrapper>{<Component {...props} />}</ServiceWrapper>
      )}
    />
  );
};

export default PrivateRoute;
