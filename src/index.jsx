import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./App";
import { RecoilRoot } from "recoil";

import "antd/dist/antd.css";
import "./styles/reset.css";

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("root")
);

serviceWorker.unregister();
