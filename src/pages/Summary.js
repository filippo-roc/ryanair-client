import styles from "./Summary.module.css";
import Overlay from "../components/UI/Overlay";
import Message from "../components/UI/Message";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import SummaryContent from "../components/Summary/summaryContent";

// FIXME
// OVERLAY DEVE SCOMPARIRE IN CASO DI ERRORE 
const Summary = function () {
  const passengers = useSelector((state) => state.booking.passengers);
  const booking = useSelector((state) => state.booking);
  const auth = useSelector((state) => state.auth);
  const history = useHistory();

  const [sentMessage, setSentMessage] = useState("");
  const [bookingError, setBookingError] = useState(false);

  // booking confirmation
  const submitHandler = async function (e) {
    try {
      e.preventDefault();

      const { user } = auth;

      if (!user) {
        throw new Error("Per completare la prenotazione effettua il login")
      }

      const bodyContent = {
        owner: user._id,
        departureFlight: booking.departureFlight._id,
        passengers: passengers
      };

      //add returnFlight if there is
      if (booking.returnFlight) {
        bodyContent.returnFlight = booking.returnFlight._id
      }


      const response = await fetch(`${process.env.REACT_APP_APY_URL}booking`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${user.token}`
        },
        body: JSON.stringify(bodyContent), // body data type must match "Content-Type" header
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message)
      }

      window.localStorage.removeItem('booking');

      setBookingError(false);
      setSentMessage("prenotazione completata");

    } catch (err) {
      setBookingError(true)
      setSentMessage(err.message);
    }
  };

  // overlay handler
  const onClickHanlder = function () {
    if (bookingError) {
      return setSentMessage("")
    }
    history.replace("/");
  };

  //total price
  let price = booking.departureFlight.price * passengers.length;
  if (booking.returnFlight) {
    price += booking.returnFlight.price * passengers.length;
  }

  passengers.forEach((passenger) => {
    if (passenger.bags.twoSmallBag) price += 12.5;
    if (passenger.bags.tenKgBaggage) price += 15;
    if (passenger.bags.twentyKgBaggage) price += 30;
  });

  const currencyOptions = {
    style: "currency",
    currency: "EUR",
  };

  const formattedPrice = new Intl.NumberFormat("it-IT", currencyOptions).format(
    price
  );



  const errorClass = bookingError ? `${styles["summary-error-message"]}` : ""
  return (
    <React.Fragment>
      {sentMessage && (
        <React.Fragment>
          <Overlay onClick={onClickHanlder} />
          <Message message={sentMessage} className={bookingError ? errorClass : ""} />
        </React.Fragment>
      )}
      <main className={styles["summary"]}>
        <h1 className={styles["summary-title"]}>Riepilogo prenotazione</h1>

        <SummaryContent
          booking={booking}
          styles={styles} />

        <div className={styles["summary-total"]}>
          Totale:{" "}
          <span className={styles["summary-total__amount"]}>
            {formattedPrice}
          </span>
        </div>
        <form onSubmit={submitHandler}>
          <button type="submit" className={styles["summary-btn"]}>
            Conferma
          </button>
        </form>
      </main>
    </React.Fragment>
  );
};
export default Summary;
