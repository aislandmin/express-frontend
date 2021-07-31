import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function OrderNow(){
    return (
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
}