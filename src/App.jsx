import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import UniqueCode from "./UniqueCode";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/unique-code" component={UniqueCode} />
      </Switch>
    </Router>
  );
}

export default App;
