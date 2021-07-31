import styles from "./coupons.module.scss";

function Coupons() {
  const titles = ["Available Coupons", "", "", ""];
  return (
    <div className={styles["me-layout-coupons-right-content"]}>
      <div className="me-layout-right-title">
        <ul className="right-title-ul">
          {titles.map((title, index) => {
            return (
              <li className="right-title-ul-li" key={index}>
                {title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="me-layout-right-content">
        <div className="right-item-empty-img">
          <img alt="" src="/list-empty.png"></img>
        </div>
      </div>
    </div>
  );
}

export default Coupons;
