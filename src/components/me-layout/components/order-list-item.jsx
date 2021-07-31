import { useHistory } from "react-router-dom";
import {getOrderType, getOrderStatus} from "../order-functions";

export default function OrderListItem(props) {
  const itemData = props.itemData;
  const history = useHistory();

  function handleOrderClick(id) {
    console.log("handleOrderClick.......", `/me/detail?id=${id}`);
    history.push(`/me/detail?id=${id}`);
  }

  return (
    <div className="me-layout-item-content">
      <ul
        className="right-item-ul"
        onClick={() => handleOrderClick(itemData.id)}
      >
        <li className="right-item-ul-li">{getOrderType(itemData.type)}</li>
        <li className="right-item-ul-li">{"$" + itemData.money}</li>
        <li className="right-item-ul-li">{itemData.create_time}</li>
        <li className="right-item-ul-li">
          {getOrderStatus(itemData.status, itemData.order_status)}
        </li>
      </ul>
    </div>
  );
}
