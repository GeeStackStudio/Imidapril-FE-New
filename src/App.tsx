import React, { useState } from "react";
import "./App.css";
import "./styles/app.less";
import AxiosProvider from "./Http/AxiosProvider";
import {
  BrowserRouter,
  HashRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { onRequestFulfilled, onResponseReject } from "./utils/HttpInstance";
import { Config } from "./config";
import { ConfigProvider, message, theme } from "antd";
import { LayoutPage } from "./pages/gzzy/Layout";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <AxiosProvider
        onResponseReject={onResponseReject}
        onRequestFulfilled={onRequestFulfilled}
        axiosConfig={{
          timeout: 15 * 60 * 1000,
          baseURL: Config.basePath,
        }}
        defaultErrorHandle={(error) => message.error(error.message)}
      >
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Navigate to={"/gzzy"} />} />
            <Route index path={"/*"} element={<LayoutPage />} />
          </Routes>
        </BrowserRouter>
      </AxiosProvider>
    </ConfigProvider>
  );
}

export default App;
