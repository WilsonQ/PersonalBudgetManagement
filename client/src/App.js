import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import Dashboard from "./views/Dashboard";
export default function App() {
  const browserHistory = createBrowserHistory();
  return (
    <>
      <Router history={browserHistory}>
        <Dashboard />
      </Router>
    </>
  );
}
