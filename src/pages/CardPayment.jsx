/* eslint-disable react/prop-types */
import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CardPayment = ({setPaymentTrigger, setPaymentSuccess, handlePlaceOrder}) => {
  const [selectedCard, setSelectedCard] = useState("credit");

  const handlePaymentTrigger = () => {
    setPaymentTrigger(false);
    setPaymentSuccess(true);
    handlePlaceOrder();
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container p-4 shadow rounded bg-white" style={{ maxWidth: "550px" }}>
        <h5 className="mb-3">Pay with</h5>
        <div className="btn-group mb-3 w-100" role="group">
          <button
            type="button"
            className={`btn ${selectedCard === "credit" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSelectedCard("credit")}
          >
            Credit card
          </button>
          <button
            type="button"
            className={`btn ${selectedCard === "debit" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSelectedCard("debit")}
          >
            Debit card
          </button>
        </div>

        <form>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Card number" />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" placeholder="Card holder" />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input type="text" className="form-control" placeholder="Expiration date" />
            </div>
            <div className="col-md-6 mb-3">
              <input type="text" className="form-control" placeholder="CVV" />
            </div>
          </div>
          <div className="form-check mb-3">
            <input type="checkbox" className="form-check-input" id="saveCard" />
            <label className="form-check-label" htmlFor="saveCard">
              Save my card for future reservation
            </label>
          </div>

          <p className="text-muted small">
            By selecting the button below, I agree to the{" "}
            <a href="#" className="text-decoration-none">Property Rules</a>,{" "}
            <a href="#" className="text-decoration-none">Terms and Conditions</a>,{" "}
            <a href="#" className="text-decoration-none">Privacy Policy</a> and{" "}
            <a href="#" className="text-decoration-none">COVID-19 Safety Requirements</a>.
          </p>

          <button type="submit" className="btn btn-primary w-100"
            onClick={handlePaymentTrigger}>
            Confirm and pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardPayment;
