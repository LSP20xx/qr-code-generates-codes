import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import UniqueCode from "./UniqueCode";

function MainRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/unique-code" component={UniqueCode} />
      </Switch>
    </Router>
  );
}

export default MainRouter;
