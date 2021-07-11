import { useState } from "react";
import styles from "./order.module.scss";
import OrderListIterm from "./order-list-item";
import { useEffect } from "react";
import axios from "axios";

function Order() {
  const [orderType, setOrderType] = useState("Incomplete");
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    async function getMeOrders() {
      try {
        const resData = await axios({
          url: "/api/user/myOrders",
          method: "POST",
          data: {},
        });
        console.log("Get me order resData: ", resData);
        setOrdersList(resData.data.data);
      } catch (er) {
        console.log("Get error from http://localhost:3000/login", er);
      }
    }

    getMeOrders();
  }, []);

  function handleTitleItemClick(title) {
    setOrderType(title);
  }

  const titles = ["Incomplete", "Unpaid", "Completed", "Cancelled"];

  const STATUS_MAP = { Incomplete: 1, Unpaid: 2, Completed: 3, Cancelled: 4 };
  const orderSeletor = ordersList.filter((item) => {
    return item.status === STATUS_MAP[orderType];
  });
  return (
    <>
      <div className={styles["me-layout-right-title"]}>
        <ul className="right-title-ul">
          {titles.map((title, index) => {
            return (
              <li
                className={
                  orderType === title
                    ? "right-title-ul-li clicked"
                    : "right-title-ul-li"
                }
                key={index}
                onClick={() => handleTitleItemClick(title)}
              >
                {title}
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles["me-layout-right-content"]}>
        {orderSeletor.map((item, index) => {
          return <OrderListIterm itemData={item} key={index}/>;
        })}
      </div>
    </>
  );
}

export default Order;
