import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import React from "React";
import Dashboard from "./components/global/global";
import AppRouter from "./routes";
export default function App() {
  return (
    <>
      {/* <Dashboard /> */}
      <AppRouter />
    </>
  );
}
