import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as BaseLink,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import cx from "classnames";

import BrokerReferrals from "./BrokerReferrals";
import "./App.scss";

function Link({ children, to, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <BaseLink
      to={to}
      className={cx({
        active: match,
      })}
    >
      {children}
    </BaseLink>
  );
}

function App() {
  return (
    <div className="app">
      <div className="app-container">
        <Router>
          <nav>
            <Link to="/clientReferrals">Client referrals</Link>
            <Link to="/agentReferrals">Broker/Agent referrals</Link>
          </nav>
          <Switch>
            <Route exact path="/">
              <Redirect to="/agentReferrals" />
            </Route>
            <Route path="/clientReferrals">
              <BrokerReferrals />
            </Route>
            <Route path="/agentReferrals">
              <BrokerReferrals />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
