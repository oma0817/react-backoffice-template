import React from "react";
import { ConfigProvider } from "antd";
import koKR from "antd/es/locale/ko_KR";
import "./App.less";

import Router from "./routes/Router";
import PersistentRecoil from "./components/PersistentRecoil";
import { SWRConfig } from "swr";
import api from "./api/api";

function App() {
  const swrConfig = {
    fetcher(url, params) {
      api.get(url, { params }).then((res) => {
        return res.data?.data || res.data;
      });
    },
  };

  return (
    <PersistentRecoil>
      <SWRConfig value={swrConfig}>
        <ConfigProvider locale={koKR}>
          <Router />
        </ConfigProvider>
      </SWRConfig>
    </PersistentRecoil>
  );
}

export default App;
