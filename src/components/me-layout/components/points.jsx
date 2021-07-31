import styles from "./points.module.scss";

function Points() {
  return (
    <div className={styles["me-layout-points-right-content"]}>
      <div className="points-card">
        <div className="points-card-title">Current Points</div>
        <div className="points-card-points">120</div>
      </div>
    </div>
  );
}

export default Points;
