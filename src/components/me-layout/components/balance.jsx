import styles from "./balance.module.scss";

function Balance() {
  return (
    <div className={styles["me-layout-balance-right-content"]}>
      <div className="balance-card">
        <div className="balance-card-title">Balance: $120</div>
        <div className="balance-card-recharge">
          <div className="balance-card-recharge-title">
            Recharge Amount $ 12.00
          </div>
          <div className="balance-card-recharge-content">
            <div className="balance-card-recharge-content-text">
              <div>
                <img alt="" src="/bankcard_icon.png" />
                <span>Credit / Debit</span>
                <img alt="" src="/paymethodcheck_icon.png" />
              </div>
              <div>
                <img alt="" src="/paypal_icon.png" />
                <span>Paypal</span>
                <img alt="" src="/paymethodnocheck_icon.png" />
              </div>
            </div>
            <button
              type="button"
              className="balance-card-recharge-content-button"
            >
              Load
            </button>
          </div>
        </div>
      </div>
      <div className="history-card">
        <div className="history-item-left">Expenditure History</div>
        <div className="history-item-right">Recharge History</div>
      </div>
      <div className="me-layout-right-content">
        <div className="right-item-empty-img">
          <img alt="" src="/list-empty.png"></img>
        </div>
      </div>
    </div>
  );
}

export default Balance;
