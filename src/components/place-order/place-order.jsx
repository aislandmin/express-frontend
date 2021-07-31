import Header from "../common/header";
import Footer from "../common/footer";
import { connect } from "react-redux";
import { updateUsername } from "../../redux/reducer";
import LoginWindow from "../common/login-window";
import { getSessionUserIno } from "../common/local-storage";
import { useEffect } from "react";
import styles from "./place-order.module.scss";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import axios from "axios";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { useRef } from "react";

const google = window.google;

function PlaceOrder(props) {
  console.log("rendering: placeorder");
  const history = useHistory();
  const [isPayDone, setIsPayDone] = useState(false);
  let [directionsService, setDirectionsService] = useState(null);
  let [directionsDisplay, setDirectionsDisplay] = useState(null);
  const [isOrderOrInputOrPay, setisOrderOrInputOrPay] = useState("order"); //order input pay
  const [isItemTypeShow, setIsItemTypeShow] = useState(true);
  const [isItemWeightShow, setIsItemWeightShow] = useState(true);
  const [itemTypeOption, setItemTypeOption] = useState("Documents");
  const [itemWeightOption, setItemWeightOption] = useState("3-5kg");
  const [pickup, setPickup] = useState(null);
  const [delivery, setDelivery] = useState(null);
  const [type, setType] = useState("Flash");
  const [bookingFee, setBookingFee] = useState(0);
  const [baseFare, setBaseFare] = useState(0);
  const [additionalFee, setAdditionalFee] = useState(1); //底价1
  const [taxHst, setTaxHst] = useState(0);
  const [tip, setTip] = useState(0.6);
  const [totalFee, setTotalFee] = useState(0);
  const [pickupInfoSet, setPickupInfoSet] = useState(null);
  const [deliveryInfoSet, setDeliveryInfoSet] = useState(null);
  const [pickupCustomer, setPickupCustomer] = useState("Lai Jiang");
  const [pickupPhone, setPickupPhone] = useState("6472120608");
  const [deliveryCustomer, setDeliveryCustomer] = useState("Lai Jiang");
  const [deliveryPhone, setDeliveryPhone] = useState("6472120608");
  const [remark, setRemark] = useState("Take Care");
  const sessionUsername = getSessionUserIno();
  const itemTypes = ["Food", "Documents", "Flower"];
  const itemWeights = ["0-3kg", "3-5kg", "5+kg"];
  const tipTypes = ["No Tips", "10%", "15%", "20%"];
  const tipTypeToRate = { "No Tips": 0, "10%": 0.1, "15%": 0.15, "20%": 0.2 };
  const [tipTypeChecked, setTipTypeChecked] = useState("10%");
  const mapRef = useRef(null);

  async function handleBtnOrderClick() {
    if (pickup === null || delivery === null) {
      message.warning("Please input addresses");
      return;
    }

    try {
      const resData = await axios({
        url: "/api/calculate",
        method: "POST",
        data: {
          type,
          pickup: pickupInfoSet, //{ pickupInfoSet.pLat, pickupInfoSet.pLng },
          delivery: deliveryInfoSet, //{ deliveryInfoSet.dLat, deliveryInfoSet.dLng },
        },
      });

      if (resData.data.code === 200) {
        setisOrderOrInputOrPay("input");
        const tmpBookingFee = resData.data.data.booking_fee;
        const tmpBaseFare = resData.data.data.base_fare;
        const tmpTaxHst = (tmpBookingFee + tmpBaseFare + additionalFee) * 0.13;
        setBookingFee(tmpBookingFee);
        setBaseFare(tmpBaseFare);
        setTaxHst(tmpTaxHst); //tax rate = 0.13
        setTotalFee(
          tmpBookingFee + tmpBaseFare + additionalFee + tip + tmpTaxHst
        );
      } else {
        message.warning("Someting wrong!");
      }
    } catch (er) {
      console.log("Get error from http://localhost:3000/login", er);
    }
  }

  function handleBtnPayClick() {
    message.info("successfully pay!");
    history.push("/me/order");
  }

  async function handleBtnSubmitClick() {
    try {
      const resData = await axios({
        url: "/api/order/create",
        method: "POST",
        data: {
          money: totalFee,
          tips: tip,
          username: props.username,
          pickup: pickupInfoSet,
          delivery: deliveryInfoSet,
          remark,
          pickup_customer: pickupCustomer,
          pickup_phone: pickupPhone,
          delivery_customer: deliveryCustomer,
          delivery_phone: deliveryPhone,
        },
      });
      console.log("handleBtnSubmitClick, code： ", resData.data.code);

      if (resData.data.code === 200) {
        setisOrderOrInputOrPay("pay");
        setIsPayDone(true);
      } else {
        message.warning(resData.data.msg);
      }
    } catch (er) {
      console.log("Get error from http://localhost:3000/login", er);
    }
  }

  function handleTipTypeClick(tipType) {
    setTipTypeChecked(tipType);
    const tmpTotalFeeExceptTip = bookingFee + baseFare + additionalFee + taxHst;
    const tmpTip = tmpTotalFeeExceptTip * tipTypeToRate[tipType];
    setTip(tmpTip);
    setTotalFee(tmpTotalFeeExceptTip + tmpTip);
  }

  function handleTypeArrowClick(e) {
    setIsItemTypeShow(!isItemTypeShow);
  }

  function handleWeightArrowClick(e) {
    setIsItemWeightShow(!isItemWeightShow);
  }

  function handleItemTypeClick(itemType) {
    setItemTypeOption(itemType);
    let tmpTaxHst = 0,
      tmpAdditionFee = 0;

    if (itemWeightOption === itemWeights[2]) {
      if (itemType === itemTypes[0] || itemType === itemTypes[1]) {
        //food or document 5+kg
        tmpAdditionFee = 3.2;
      } else if (itemType === itemTypes[2]) {
        //flower 5+kg
        tmpAdditionFee = 4.58;
      }
    } else {
      tmpAdditionFee = 1;
    }

    setAdditionalFee(tmpAdditionFee);
    tmpTaxHst = (bookingFee + baseFare + tmpAdditionFee) * 0.13;
    setTaxHst(tmpTaxHst);
    setTotalFee(bookingFee + baseFare + tmpAdditionFee + tmpTaxHst + tip);
  }

  function handleItemWeightClick(itemWeight) {
    setItemWeightOption(itemWeight);
    let tmpTaxHst = 0,
      tmpAdditionFee = 0;

    if (itemWeight === itemWeights[2]) {
      if (itemTypeOption === itemTypes[0] || itemTypeOption === itemTypes[1]) {
        //food or document 5+kg
        tmpAdditionFee = 3.2;
      } else if (itemTypeOption === itemTypes[2]) {
        //flower 5+kg
        tmpAdditionFee = 4.58;
      }
    } else {
      tmpAdditionFee = 1;
    }

    setAdditionalFee(tmpAdditionFee);
    tmpTaxHst = (bookingFee + baseFare + tmpAdditionFee) * 0.13;
    setTaxHst(tmpTaxHst);
    setTotalFee(bookingFee + baseFare + tmpAdditionFee + tmpTaxHst + tip);
  }

  function handleRadioChange(event) {
    setType(event.target.value);
  }

  function handleOrderInputChange(e) {
    console.log(
      "e.target.name: " + e.target.name + "e.target.value: " + e.target.value
    );
    if (e.target.name === "pickup_customer") {
      setPickupCustomer(e.target.value);
    } else if (e.target.name === "delivery_customer") {
      setDeliveryCustomer(e.target.value);
    } else if (e.target.name === "pickup_phone") {
      setPickupPhone(e.target.value);
    } else if (e.target.name === "delivery_phone") {
      setDeliveryPhone(e.target.value);
    } else if (e.target.name === "remark") {
      setRemark(e.target.value);
    }
  }

  useEffect(() => {
    const pointA = new google.maps.LatLng(43.65107, -79.347015);
    const myOptions = {
      zoom: 10,
      center: pointA,
      fullscreenControl: false,
      zoomControl: false,
      streetViewControl: false,
      disableDefaultUI: true,
      styles: [
        {
          featureType: "landscape.man_made",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "landscape.natural",
          stylers: [
            {
              color: "#e2e2e2",
            },
          ],
        },
        {
          featureType: "poi.business",
          elementType: "labels.icon",
          stylers: [
            {
              color: "#b3b3b3",
            },
          ],
        },
        {
          featureType: "poi.business",
          elementType: "labels.text",
          stylers: [
            {
              color: "#8080c0",
            },
          ],
        },
        {
          featureType: "poi.business",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#ffffff",
            },
          ],
        },
        {
          featureType: "poi.park",
          stylers: [
            {
              color: "#c5ecbe",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text",
          stylers: [
            {
              color: "#008000",
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#ffffff",
            },
          ],
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "road.highway",
          stylers: [
            {
              color: "#bec6ed",
            },
          ],
        },
        {
          featureType: "road.local",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "transit",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
      ],
    };
    const tmpMap = new google.maps.Map(mapRef.current, myOptions);
    setDirectionsDisplay(
      new google.maps.DirectionsRenderer({
        map: tmpMap,
      })
    );
    setDirectionsService(new google.maps.DirectionsService());
  }, []);

  useEffect(() => {
    async function getTwoPointsFromMap() {
      // console.log("getTwoPointsFromMap");
      const pickResults = await geocodeByAddress(pickup.label);
      const { lat: pLat, lng: pLng } = await getLatLng(pickResults[0]);
      const deliveryResults = await geocodeByAddress(delivery.label);
      const { lat: dLat, lng: dLng } = await getLatLng(deliveryResults[0]);
      setPickupInfoSet({ pLat, pLng, pAddress: pickup.label });
      setDeliveryInfoSet({ dLat, dLng, dAddress: delivery.label });

      const pointA = new google.maps.LatLng(pLat, pLng);
      const pointB = new google.maps.LatLng(dLat, dLng);

      directionsService.route(
        {
          origin: pointA,
          destination: pointB,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        function (response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        }
      );
    }

    if (pickup && delivery) {
      // const { pointA, pointB } = getTwoPointsFromMap();

      getTwoPointsFromMap();
    }
  }, [pickup, delivery]);

  useEffect(() => {
    props.updateUsername(sessionUsername);
  }, [props, sessionUsername]);

  const orderNowElement = (
    <div className="place-order-right-ordernow">
      <div className="delivery-options">
        <h3>Delivery Options</h3>
        <div className="radio-group" onChange={handleRadioChange}>
          <input
            type="radio"
            id="flash"
            name="type"
            value="Flash"
            defaultChecked
          />
          <span> Flash</span>
          <br />
          <input type="radio" id="same-day" name="type" value="Same-day" />
          <span> Same-day</span>
          <br />
          <input type="radio" id="customized" name="type" value="Customized" />
          <span> Customized</span>
        </div>
      </div>
      <div className="pickup">
        <h3>Pick Up</h3>
        <div className="pickup-address-show">
          <div className="pickup-marker"></div>
          <div className="pickup-google-map-autocomplete">
            <GooglePlacesAutocomplete
              autocompletionRequest={{
                componentRestrictions: { country: ["ca"] },
              }}
              selectProps={{
                value: pickup,
                onChange: setPickup,
              }}
            />
          </div>
        </div>
      </div>
      <div className="delivery">
        <h3>DELIVERY</h3>
        <div className="delivery-address-show">
          <div className="delivery-marker"></div>
          <div className="delivery-google-map-autocomplete">
            <GooglePlacesAutocomplete
              autocompletionRequest={{
                componentRestrictions: { country: ["ca"] },
              }}
              selectProps={{
                value: delivery,
                onChange: setDelivery,
              }}
            />
          </div>
        </div>
      </div>
      <button className="order-button" onClick={handleBtnOrderClick}>
        Order Now
      </button>
    </div>
  );

  const inputSubmitElement = (
    <div className="place-order-right-inputsubmit">
      <div className="tips">
        <div className="tips-title">
          <div>Tips</div>
          <div>{"$" + tip.toFixed(2)}</div>
        </div>
        <ul className="tips-options">
          {tipTypes.map((item, index) => {
            return (
              <li
                onClick={() => handleTipTypeClick(item)}
                key={index}
                className={
                  tipTypeChecked === item
                    ? "tips-options-item checked"
                    : "tips-options-item"
                }
              >
                {item}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="total-price">
        <div className="total-price-title">
          <div className="title">Total Price</div>
          <div className="text">detail</div>
        </div>
        <div className="item-fee">
          <div>Booking Fee</div>
          <div>{"$" + bookingFee.toFixed(2)}</div>
        </div>
        <div className="item-fee">
          <div>Base Fare</div>
          <div>{"$" + baseFare.toFixed(2)}</div>
        </div>
        <div className="item-fee">
          <div>Additional Fee</div>
          <div>{"$" + additionalFee.toFixed(2)}</div>
        </div>
        <div className="item-fee">
          <div>Tax(HST)</div>
          <div>{"$" + taxHst.toFixed(2)}</div>
        </div>
        <div className="item-fee">
          <div>Tip</div>
          <div>{"$" + tip.toFixed(2)}</div>
        </div>
        <div className="total">{"$" + totalFee.toFixed(2)}</div>
      </div>
      <button className="submit-button" onClick={handleBtnSubmitClick}>
        Submit
      </button>
    </div>
  );

  const inputPayElement = (
    <div className="place-order-right-inputpay">
      <div className="total-price">
        <div className="total-price-title">
          <div className="title">Total Price</div>
          <div className="text">detail</div>
        </div>
        <div className="item-fee">
          <div>Booking Fee</div>
          <div>{"$" + bookingFee.toFixed(2)}</div>
        </div>
        <div className="item-fee">
          <div>Base Fare</div>
          <div>{"$" + baseFare.toFixed(2)}</div>
        </div>
        <div className="item-fee">
          <div>Additional Fee</div>
          <div>{"$" + additionalFee.toFixed(2)}</div>
        </div>
        <div className="item-fee">
          <div>Tax(HST)</div>
          <div>{"$" + taxHst.toFixed(2)}</div>
        </div>
        <div className="item-fee">
          <div>Tip</div>
          <div>{"$" + tip.toFixed(2)}</div>
        </div>
        <div className="total">{"$" + totalFee.toFixed(2)}</div>
      </div>

      <div className="use-points">
        <div className="use-points-title">
          <div className="title">Use Points</div>
          <div className="text">Available Points: 0</div>
        </div>
        <div className="points-input-redeem">
          <input
            className="redeem-input"
            type="text"
            placeholder="Enter Amount"
          />
          <button className="redeem-button">Redeem</button>
        </div>
        <div className="or-partingline">
          <span>OR</span>
        </div>
        <div className="use-points-title">
          <div className="title">Use Coupons</div>
          <div className="text">No Coupons</div>
        </div>
      </div>

      <div className="payment-method">
        <div className="payment-method-title">Payment Method</div>
        <div className="payment-method-item">
          <div className="item-left">
            <img className="item-icon" alt="" src="/balance_icon.png" />
            <div className="item-text">
              <div className="item-text-first">My Balance</div>
              <div className="item-text-second">Current Balance: $0</div>
            </div>
          </div>
          <img className="item-right" alt="" src="/paymethodcheck_icon.png" />
        </div>
        <div className="payment-method-item">
          <div className="item-left">
            <img className="item-icon" alt="" src="/bankcard_icon.png" />
            <div className="item-text">Credit / Debit Card</div>
          </div>
          <img className="item-right" alt="" src="/paymethodnocheck_icon.png" />
        </div>
        <div className="payment-method-item">
          <div className="item-left">
            <img className="item-icon" alt="" src="/paypal_icon.png" />
            <div className="item-text">Paypal</div>
          </div>
          <img className="item-check" alt="" src="/paymethodnocheck_icon.png" />
        </div>
      </div>

      <button className="pay-button" onClick={handleBtnPayClick}>
        Pay
      </button>
    </div>
  );

  const inputBelowMapElement = (
    <div className="place-order-input">
      <div className="pickup-card">
        <div className="input-card-title">PICKUP</div>
        <div className="input-card-content">
          <div className="item-contact-name">
            <div className="low-item-left">
              <span>Contact Name</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              name="pickup_customer"
              defaultValue="LAI JIANG"
              className="low-item-right"
              onChange={handleOrderInputChange}
            />
          </div>
          <div className="item-contact-phone">
            <div className="low-item-left">
              <span>Phone</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              name="pickup_phone"
              defaultValue="6472120608"
              className="low-item-right"
              onChange={handleOrderInputChange}
            />
          </div>
          <div className="item-contact-unit">
            <div className="low-item-left">Unit</div>
            <div className="low-item-right">unit infomation</div>
          </div>
          <div className="item-contact-buzzer">
            <div className="low-item-left">Buzzer</div>
            <div className="low-item-right">buzzer infomation</div>
          </div>
        </div>
      </div>
      <div className="delivery-card">
        <div className="input-card-title">DELIVERY</div>
        <div className="input-card-content">
          <div className="item-contact-name">
            <div className="low-item-left">
              <span>Contact Name</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              name="delivery_customer"
              defaultValue="LAI JIANG"
              className="low-item-right"
              onChange={handleOrderInputChange}
            />
          </div>
          <div className="item-contact-phone">
            <div className="low-item-left">
              <span>Phone</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <input
              type="text"
              name="delivery_phone"
              defaultValue="6472120608"
              className="low-item-right"
              onChange={handleOrderInputChange}
            />
          </div>
          <div className="item-contact-unit">
            <div className="low-item-left">Unit</div>
            <div className="low-item-right">unit infomation</div>
          </div>
          <div className="item-contact-buzzer">
            <div className="low-item-left">Buzzer</div>
            <div className="low-item-right">buzzer infomation</div>
          </div>
        </div>
      </div>
      <div className="item-info-card">
        <div className="input-card-title">ITEM INFO</div>
        <div className="input-card-content">
          <div className="item-type">
            <div className="low-item-left">
              <span>Type</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <div
              // className="low-item-right"
              className={
                isItemTypeShow ? "low-item-right arrow-down" : "low-item-right"
              }
              // id={isItemTypeShow ? "item-type-arrow arrow-down" : "item-type-arrow"}
              onClick={handleTypeArrowClick}
            >
              &#10095;
            </div>
          </div>
          {isItemTypeShow && (
            <div className="item-type-content">
              {itemTypes.map((item, index) => {
                return (
                  <div
                    onClick={() => handleItemTypeClick(item)}
                    key={index}
                    className={itemTypeOption === item ? "checked" : ""}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
          <div className="item-weight">
            <div className="low-item-left">
              <span>Weight</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <div
              // className="low-item-right"
              // id="item-weight-arrow"
              className={
                isItemWeightShow
                  ? "low-item-right arrow-down"
                  : "low-item-right"
              }
              onClick={handleWeightArrowClick}
            >
              &#10095;
            </div>
          </div>
          {isItemWeightShow && (
            <div className="item-weight-content">
              {itemWeights.map((item, index) => {
                return (
                  <div
                    onClick={() => handleItemWeightClick(item)}
                    key={index}
                    className={itemWeightOption === item ? "checked" : ""}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <div className="remarks-card">
        <div className="input-card-title">REMARKS</div>
        <div className="input-card-content">
          <textarea
            name="remark"
            rows="3"
            defaultValue="Take Care"
            className="input-card-content-textarea"
            onChange={handleOrderInputChange}
          />
        </div>
        {/* <input
          type="text"
          name="remark"
          rows="3"
          defaultValue="Take Care"
          className="input-card-content"
          onChange={handleOrderInputChange}
        /> */}
      </div>
    </div>
  );

  return (
    <>
      <Header curUsername={props.username} />
      {props.username === null && (
        <LoginWindow setCurUsername={props.updateUsername} />
      )}
      <div
        className={styles["place-order-content-container"]}
        style={{
          backgroundColor:
            isOrderOrInputOrPay !== "order" ? "rgb(230, 228, 228)" : "white",
        }}
      >
        <div className="place-order-content">
          <div
            className={isPayDone ? "place-order-left gray" : "place-order-left"}
          >
            {isPayDone && <div className="place-order-left-mask"></div>}
            <div
              ref={mapRef}
              className={
                isOrderOrInputOrPay === "input" || isOrderOrInputOrPay === "pay"
                  ? "place-order-map short"
                  : "place-order-map"
              }
            ></div>
            {(isOrderOrInputOrPay === "input" ||
              isOrderOrInputOrPay === "pay") &&
              inputBelowMapElement}
          </div>
          <div className="place-order-right">
            {isOrderOrInputOrPay === "order"
              ? orderNowElement
              : isOrderOrInputOrPay === "input"
              ? inputSubmitElement
              : inputPayElement}
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
)(PlaceOrder);
