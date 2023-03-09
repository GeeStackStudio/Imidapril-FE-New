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
import { useBoolean } from "react-hanger";
import { useMount } from "ahooks";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useMount(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (event.matches) {
          console.log("dark mode");
          setIsDarkMode(true);
        } else {
          console.log("light mode");
          setIsDarkMode(false);
        }
      });
  });
  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
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
