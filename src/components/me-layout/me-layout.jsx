import Header from "../common/header";
import Footer from "../common/footer";
import { Switch, Route, withRouter } from "react-router-dom";
import Order from "./components/order";
import Balance from "./components/balance";
import Coupons from "./components/coupons";
import Points from "./components/points";
import OrderDetail from "./components/order-detail";
import { connect } from "react-redux";
import { updateUsername } from "../../redux/reducer";
import styles from "./me-layout.module.scss";
import {
  getSessionUserIno,
  removeSessionUserIno,
} from "../common/local-storage";
import LoginWindow from "../common/login-window";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function MeLayout(props) {
  const pathType = props.match.params.type;
  console.log("enter MeLayout, type: ", pathType);
  const history = useHistory();
  let sessionUsername = getSessionUserIno();

  useEffect(() => {
    props.updateUsername(sessionUsername);
  }, [sessionUsername]);

  function handleLogoutClick() {
    removeSessionUserIno();
    sessionUsername = getSessionUserIno();
    props.updateUsername(sessionUsername);
    history.push("/");
  }

  function handleMenuClick(path) {
    sessionUsername = getSessionUserIno();
    props.updateUsername(sessionUsername);
    if (sessionUsername === null) {
      history.push("/");
    } else {
      history.push(path);
    }
  }

  return (
    <>
      <Header curUsername={props.username} />
      {sessionUsername === null && (
        <LoginWindow setCurUsername={props.updateUsername} />
      )}
      <div className={styles["me-layout-container"]}>
        <div className={styles["me-layout"]}>
          <div className="me-layout-left">
            <div
              className="me-layout-left-title"
              onClick={() => {
                handleMenuClick("/me/order");
              }}
            >
              <h3
                className={
                  pathType === "order"
                    ? "me-layout-left-title-text clicked"
                    : "me-layout-left-title-text"
                }
              >
                My Orders
              </h3>
            </div>
            <h3 className="me-layout-left-title-text">My Account</h3>
            <ul className="me-layout-my-account-ul">
              <li
                className={
                  pathType === "balance"
                    ? "me-layout-my-account-ul-li clicked"
                    : "me-layout-my-account-ul-li"
                }
                onClick={() => {
                  handleMenuClick("/me/balance");
                }}
              >
                <img alt="" src="/list-icon1.png" />
                <div className="me-layout-left-subtitle">Balance</div>
              </li>
              <li
                className={
                  pathType === "coupons"
                    ? "me-layout-my-account-ul-li clicked"
                    : "me-layout-my-account-ul-li"
                }
                onClick={() => {
                  handleMenuClick("/me/coupons");
                }}
              >
                <img alt="" src="/list-icon2.png" />
                <div className="me-layout-left-subtitle">Coupons</div>
              </li>
              <li
                className={
                  pathType === "points"
                    ? "me-layout-my-account-ul-li clicked"
                    : "me-layout-my-account-ul-li"
                }
                onClick={() => {
                  handleMenuClick("/me/points");
                }}
              >
                <img alt="" src="/list-icon3.png" />
                <div className="me-layout-left-subtitle">Points</div>
              </li>
            </ul>
            <h3 className="me-layout-left-title-text">Settings</h3>
            <div
              className="me-layout-left-settings"
              onClick={handleLogoutClick}
            >
              <img alt="" src="/list-icon4.png" />
              <div className="me-layout-left-logout">Log Out</div>
            </div>
          </div>
          <div className={styles["me-layout-right"]}>
            <Switch>
              <Route path="/me/order">
                <Order />
              </Route>
              <Route path="/me/balance">
                <Balance />
              </Route>
              <Route path="/me/coupons">
                <Coupons />
              </Route>
              <Route path="/me/points">
                <Points />
              </Route>
              <Route path="/me/detail">
                <OrderDetail />
              </Route>
              <Route path="/me/">
                <Order />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default connect(
  (state) => {
    const { username } = state;
    return { username };
  },
  { updateUsername }
)(withRouter(MeLayout));
