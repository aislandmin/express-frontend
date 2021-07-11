import Header from "../common/header";
import Footer from "../common/footer";
import { connect } from "react-redux";
import { updateUsername } from "../../redux/reducer";
import LoginWindow from "../common/login-window";
import { getSessionUserIno } from "../common/local-storage";
import { useEffect } from "react";
import styles from "./place-order.module.scss";
import GoogleMapReact from "google-map-react";
import { useState } from "react";

function PlaceOrder(props) {
  console.log("rendering: placeorder");
  const [isOrderOrInput, setisOrderOrInput] = useState("order");
  const [isItemTypeShow, setIsItemTypeShow] = useState(true);
  const [isItemWeightShow, setIsItemWeightShow] = useState(true);
  const [itemTypeOption, setItemTypeOption] = useState("documents");
  const [itemWeightOption, setItemWeightOption] = useState("3-5kg");
  const sessionUsername = getSessionUserIno();
  const defaultProps = {
    center: { lat: 43.6532, lng: -79.3832 },
    zoom: 11,
  };

  function handleBtnOrderClick(e) {
    setisOrderOrInput("input");
    return null;
  }

  function handleBtnSubmitClick(e) {
    return null;
  }

  function handleArrowClick(e) {
    if (e.target.id === "item-type-arrow") {
      setIsItemTypeShow(!isItemTypeShow);
    } else if (e.target.id === "item-weight-arrow") {
      setIsItemWeightShow(!isItemWeightShow);
    }
  }

  function handleItemTypeClick(e) {
    console.log(e.target.innerHTML);
    setItemTypeOption(e.target.innerHTML);
  }

  function handleItemWeightClick(e) {
    console.log(e.target.innerHTML);
    setItemWeightOption(e.target.innerHTML);
  }

  // const AnyReactComponent = ({ text }) => (
  //   <div
  //     style={{
  //       color: "white",
  //       background: "grey",
  //       padding: "15px 10px",
  //       display: "inline-flex",
  //       textAlign: "center",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       borderRadius: "100%",
  //       transform: "translate(-50%, -50%)",
  //     }}
  //   >
  //     {text}
  //   </div>
  // );

  useEffect(() => {
    props.updateUsername(sessionUsername);
  }, [sessionUsername]);

  const orderNowElement = (
    <div className="place-order-right-ordernow">
      <div className="delivery-options">
        <h3>Delivery Options</h3>
        <ul>
          <li>
            <input
              type="radio"
              id="flash"
              name="flash"
              value="Flash"
              defaultChecked
            />
            <label htmlFor="flash">Flash</label>
          </li>
          <li>
            <input
              type="radio"
              id="same-day"
              name="same-day"
              value="Same-day"
            />
            <label htmlFor="same-day">Same-day</label>
          </li>
          <li>
            <input
              type="radio"
              id="customized"
              name="customized"
              value="Customized"
            />
            <label htmlFor="customized">Customized</label>
          </li>
        </ul>
      </div>
      <div className="pickup">
        <h3>Pick Up</h3>
        <div className="pickup-address-show">
          <div className="pickup-marker"></div>
          <span>255 Front Street West,Toronto,ON,Ca</span>
        </div>
      </div>
      <div className="delivery">
        <h3>Delivery</h3>
        <div className="delivery-address-show">
          <div className="delivery-marker"></div>
          <span>35 Hollywood Avenue,North York,ON,CA</span>
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
          <div>$0.60</div>
        </div>
        <ul className="tips-options">
          <li className="tips-options-item">No Tips</li>
          <li className="tips-options-item">10%</li>
          <li className="tips-options-item">15%</li>
          <li className="tips-options-item">20%</li>
        </ul>
      </div>
      <div className="total-price">
        <div className="total-price-title">
          <div className="title">Total Price</div>
          <div className="text">detail</div>
        </div>
        <div className="item-fee">
          <div>Booking Fee</div>
          <div>$2.00</div>
        </div>
        <div className="item-fee">
          <div>Base Fare</div>
          <div>$1.00</div>
        </div>
        <div className="item-fee">
          <div>Additional Fee</div>
          <div>$3.00</div>
        </div>
        <div className="item-fee">
          <div>Tax(HST)</div>
          <div>$0.78</div>
        </div>
        <div className="item-fee">
          <div>Tip</div>
          <div>$0.60</div>
        </div>
        <div className="total">$7.38</div>
      </div>
      <button className="submit-button" onClick={handleBtnSubmitClick}>
        Submit
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
            <span className="low-item-right">LAI JIANG</span>
          </div>
          <div className="item-contact-phone">
            <div className="low-item-left">
              <span>Phone</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <div className="low-item-right">6472120608</div>
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
        <div className="input-card-title">Delivery</div>
        <div className="input-card-content">
          <div className="item-contact-name">
            <div className="low-item-left">
              <span>Contact Name</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <span className="low-item-right">LAI JIANG</span>
          </div>
          <div className="item-contact-phone">
            <div className="low-item-left">
              <span>Phone</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <div className="low-item-right">6472120608</div>
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
              className="low-item-right"
              id="item-type-arrow" 
              onClick={handleArrowClick}
            >
              &#10095;
            </div>
          </div>
          {isItemTypeShow && (
            <div className="item-type-content">
              <div
                onClick={handleItemTypeClick}
                className={itemTypeOption === "food" ? "checked" : ""}
              >
                food
              </div>
              <div
                onClick={handleItemTypeClick}
                className={itemTypeOption === "documents" ? "checked" : ""}
              >
                documents
              </div>
              <div
                onClick={handleItemTypeClick}
                className={itemTypeOption === "flower" ? "checked" : ""}
              >
                flower
              </div>
            </div>
          )}
          <div className="item-weight">
            <div className="low-item-left">
              <span>Weight</span>
              <span style={{ color: "red" }}>*</span>
            </div>
            <div
              className="low-item-right"
              id="item-weight-arrow"
              onClick={handleArrowClick}
            >
              &#10095;
            </div>
          </div>
          {isItemWeightShow && (
            <div className="item-weight-content">
              <div
                onClick={handleItemWeightClick}
                className={itemWeightOption === "0-3kg" ? "checked" : ""}
              >
                0-3kg
              </div>
              <div
                onClick={handleItemWeightClick}
                className={itemWeightOption === "3-5kg" ? "checked" : ""}
              >
                3-5kg
              </div>
              <div
                onClick={handleItemWeightClick}
                className={itemWeightOption === "5+kg" ? "checked" : ""}
              >
                5+kg
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="remarks-card">
        <div className="input-card-title">REMARKS</div>
        <div className="input-card-content">Take Care</div>
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
            isOrderOrInput === "input" ? "rgb(230, 228, 228)" : "white",
        }}
      >
        <div className="place-order-content">
          <div className="place-order-left">
            <div
              className={
                isOrderOrInput === "input"
                  ? "place-order-map short"
                  : "place-order-map"
              }
            >
              <GoogleMapReact
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
              >
                {/* <AnyReactComponent
                lat={defaultProps.center.lat}
                lng={defaultProps.center.lng}
                text={"Toronto"}
              /> */}
              </GoogleMapReact>
            </div>
            {isOrderOrInput === "input" && inputBelowMapElement}
          </div>
          <div className="place-order-right">
            {isOrderOrInput === "order" ? orderNowElement : inputSubmitElement}
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
