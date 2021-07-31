import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styles from "./order-detail.module.scss";

import {
  getOrderStatus,
  getOrderType,
  urlToObj,
  milisecondsToDataformat,
} from "../order-functions";

function OrderDetail() {
  const location = useLocation();
  const [orderDetail, setOrderDetail] = useState(null);
  const urlParamsObj = urlToObj(location.search);
  // const { orderId: id } = urlParamsObj;
  const { id } = urlParamsObj;

  useEffect(() => {
    async function getMeOrderDetail(id) {
      try {
        const resData = await axios({
          url: "/api/order/detail",
          method: "POST",
          data: { id },
        });
        console.log("Get me order detail resData: ", resData.data.data);
        setOrderDetail(resData.data.data);
      } catch (er) {
        console.log("Get error from http://localhost:3000/login", er);
      }
    }

    getMeOrderDetail(id);
  }, [id]);

  let orderStatus = "",
    password = 0,
    pickupAddress = "",
    sendAddress = "",
    orderType = "",
    orderID = 0,
    orderDate = "",
    pickupTime = "",
    deliveryTime = "",
    itemType = "",
    points = "",
    paymentMethod = "",
    orderCost = 0,
    bookingFee = 0,
    baseFare = 0,
    distanceSurcharge = 0,
    additionalFee = 0,
    taxHst = 0,
    tips = 0,
    pointsDiscount = 0;

  if (orderDetail !== null) {
    console.log(
      "orderStatus status order_status:",
      orderDetail.status,
      orderDetail.order_status
    );
    orderStatus = getOrderStatus(orderDetail.status, orderDetail.order_status);
    password = orderDetail.confirm_password;
    pickupAddress = orderDetail.pickup_address;
    sendAddress = orderDetail.send_address;
    orderType = getOrderType(parseInt(orderDetail.cate_id));
    orderID = orderDetail.id;
    orderDate = milisecondsToDataformat(orderDetail.finish_time); //Format("yyyy-MM-dd hh:mm");
    pickupTime = "2021-07-01 11:00";
    deliveryTime = "2021-07-01 13:15";
    itemType = orderDetail.item_type;
    points = "points added";
    paymentMethod = "Ali-Pay";
    bookingFee = orderDetail.booking_fee;
    baseFare = orderDetail.base_fare;
    distanceSurcharge = orderDetail.distance_surcharge;
    additionalFee = orderDetail.additional_charge;
    taxHst = orderDetail.tax;
    tips = orderDetail.tip;
    pointsDiscount = orderDetail.point_discount;
    orderCost =
      bookingFee +
      baseFare +
      distanceSurcharge +
      additionalFee +
      taxHst +
      tips +
      pointsDiscount;
  }
  return (
    orderDetail !== null && (
      <div className={styles["order-detail-container"]}>
        <div className="order-status">
          <span className="order-item-title">Order Status</span>
          <span className="order-item-value">{orderStatus}</span>
        </div>
        <div className="password">
          <span className="order-item-title">Password</span>
          <div className="order-item-value">
            <span className="order-password-value-text">{password}</span>
            <button className="order-password-value-copy">Copy</button>
          </div>
        </div>
        <div className="pickup-address">
          <div className="order-item-title">
            <img alt="" src="/address1.png" />
          </div>
          <span className="order-item-value">{pickupAddress}</span>
        </div>
        <div className="send-address">
          <div className="order-item-title">
            <img alt="" src="/address2.png" />
          </div>
          <span className="order-item-value">{sendAddress}</span>
        </div>
        <div className="order-type">
          <span className="order-item-title">Order Type</span>
          <span className="order-item-value">{orderType}</span>
        </div>
        <div className="order-id">
          <span className="order-item-title">Order ID</span>
          <span className="order-item-value">{orderID}</span>
        </div>
        <div className="order-date">
          <span className="order-item-title">Order Date</span>
          <span className="order-item-value">{orderDate}</span>
        </div>
        <div className="pickup-time">
          <span className="order-item-title">Pickup Time</span>
          <span className="order-item-value">{pickupTime}</span>
        </div>
        <div className="delivery-time">
          <span className="order-item-title">Delivery Time</span>
          <span className="order-item-value">{deliveryTime}</span>
        </div>
        <div className="item-type">
          <span className="order-item-title">Item Type</span>
          <span className="order-item-value">{itemType}</span>
        </div>
        <div className="points">
          <span className="order-item-title">Points</span>
          <span className="order-item-value">{points}</span>
        </div>
        <div className="order-cost">
          <span className="order-item-title">Order Cost</span>
          <span className="order-item-value">{"$" + orderCost.toFixed(2)}</span>
        </div>
        <div className="booking-fee">
          <span className="order-item-title">Booking Fee</span>
          <span className="order-item-value">
            {"$" + bookingFee.toFixed(2)}
          </span>
        </div>
        <div className="base-fare">
          <span className="order-item-title">Base Fare</span>
          <span className="order-item-value">{"$" + baseFare.toFixed(2)}</span>
        </div>
        <div className="distance-surcharge">
          <span className="order-item-title">Distance Surcharge</span>
          <span className="order-item-value">
            {"$" + distanceSurcharge.toFixed(2)}
          </span>
        </div>
        <div className="additional-fee">
          <span className="order-item-title">Additional Fee</span>
          <span className="order-item-value">
            {"$" + additionalFee.toFixed(2)}
          </span>
        </div>
        <div className="additional-fee">
          <span className="order-item-title">Additional Fee</span>
          <span className="order-item-value">
            {"$" + additionalFee.toFixed(2)}
          </span>
        </div>
        <div className="tax-hst">
          <span className="order-item-title">Tax(HST)</span>
          <span className="order-item-value">{"$" + taxHst.toFixed(2)}</span>
        </div>
        <div className="tips">
          <span className="order-item-title">Tips</span>
          <span className="order-item-value">{"$" + tips.toFixed(2)}</span>
        </div>
        <div className="points-discount">
          <span className="order-item-title">Points Discount</span>
          <span className="order-item-value">
            {"$" + pointsDiscount.toFixed(2)}
          </span>
        </div>
        <div className="payment-method">
          <span className="order-item-title">Payment Method</span>
          <span className="order-item-value">{"$" + paymentMethod}</span>
        </div>
      </div>
    )
  );
}

export default OrderDetail;
