import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { SWRConfig } from "swr";

import useAxios from "../api/api";
import PrivateRoute from "./PrivateRoute";

//routes.jsx에서 만든 배열을 통해 url 구현
import { publicRoutes, privateRoutes } from "./routes";

import Main from "../pages/Landing";

export default function Router() {
  const axios = useAxios();

  return (
    <SWRConfig
      value={{
        fetcher(url, params) {
          return axios({
            method: "GET",
            url,
            params,
          }).then((res) => res.data);
        },
      }}
    >
      <BrowserRouter>
        <Switch>
          {/* 로그인후 첫 화면 */}
          <PrivateRoute exact={true} path={`/main`} component={Main} />

          {publicRoutes.map(({ exact, path, component, ...otherProps }) => (
            //공용 페이지
            <Route
              key={`public-route-${path}`}
              exact={exact}
              path={path}
              component={component}
              {...otherProps}
            />
          ))}
          {privateRoutes.map(({ exact, path, component, children }) =>
            children ? (
              //하단 메뉴
              children.map((child) => {
                return (
                  <PrivateRoute
                    key={`private-route-${path}`}
                    exact={child.exact}
                    path={`${path}${child.path}`}
                    component={child.component}
                  />
                );
              })
            ) : (
              //상단 메뉴
              <PrivateRoute
                key={`private-route-${path}`}
                exact={exact}
                path={path}
                component={component}
              />
            )
          )}
        </Switch>
      </BrowserRouter>
    </SWRConfig>
  );
}
