import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/home";
import Help from "./components/help/help";
import Business from "./components/business/business";
import PlaceOrder from "./components/place-order/place-order";
import Terms from "./components/terms/terms";
import Privacy from "./components/privacy/privacy";
import { Provider } from "react-redux";
import store from "./redux/store";
import MeLayout from "./components/me-layout/me-layout";


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/place-order">
            <PlaceOrder />
          </Route>
          <Route path="/me/:type">
            <MeLayout />
          </Route>
          <Route path="/business">
            <Business />
          </Route>
          <Route path="/help">
            <Help />
          </Route>
          <Route path="/terms">
            <Terms />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
