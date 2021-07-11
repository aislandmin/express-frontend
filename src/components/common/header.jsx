import styles from "./header.module.scss";
import { Link, withRouter } from "react-router-dom";
// import { getSessionUserIno } from "./local-storage";
// import { useState, useEffect } from "react";

function Header(props) {
  const currentPath = props.match.path;

  let element = (
    <ul
      className={
        currentPath !== "/" ? "express-navigation white" : "express-navigation"
      }
    >
      {currentPath === "/" && (
        <li className="express-navi-item">
          <Link to="/" className="express-navi-item-link">
            HOME
          </Link>
        </li>
      )}
      <li className="express-navi-item">
        <Link to="/place-order" className="express-navi-item-link">
          PLACE ORDER
        </Link>
      </li>
      <li className="express-navi-item">
        <Link to="/business" className="express-navi-item-link">
          BUSINESS
        </Link>
      </li>
      <li className="express-navi-item">
        <Link to="/help" className="express-navi-item-link">
          HELP
        </Link>
      </li>
      {currentPath !== "/" && (
        <li className="express-navi-item">
          {props.curUsername === null ? (
            <div className="express-navi-item-link">LOGIN</div>
          ) : (
            <Link to="/me/order" className="express-navi-item-link">
              {props.curUsername}
            </Link>
          )}
        </li>
      )}
    </ul>
  );

  return (
    <div className={styles["express-header-container"]}>
      <div className="express-header">
        <div className="express-header-left">
          <div
            className="express-logo"
            style={{ backgroundImage: 'url("/logo.png")' }}
          ></div>
          <h2
            className={
              currentPath !== "/"
                ? "express-logo-text white"
                : "express-logo-text"
            }
          >
            M.Y Flash Express
          </h2>
        </div>
        <div className="express-header-right">{element}</div>
      </div>
    </div>
  );
}

export default withRouter(Header);
