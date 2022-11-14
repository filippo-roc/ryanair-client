import React from "react";
import SummaryItem from "./SummaryItem";
import styles from "../../pages/Summary.module.css";

const SummaryContent = function(props){
    const {booking} = props;
    const {isBooking} = props;

    // departure date && return date
    const departureDate = booking.departureFlight.departureDate;
  
    const timeOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
  
    //departure date
    const formattedDepartureDate = new Intl.DateTimeFormat(
      "it-IT",
      timeOptions
    ).format(new Date(departureDate));
  

    //return date
    let formattedReturnDate;
    if (booking.returnFlight) {
      const returnDate = booking.returnFlight.departureDate;
  
      formattedReturnDate = new Intl.DateTimeFormat(
        "it-IT",
        timeOptions
      ).format(new Date(returnDate));
    }
  

    return(
        <div className={`${styles["summary-container"]} ${isBooking && styles["summary-container--is-booking"]}`}>
          <div className={styles["summary-flights"]}>
            <div className={styles["summary-flights__container"] }>
              <h2 className={styles["summary-flights__title"]}>Partenza</h2>
              <p className={styles["summary-flights__date"]}>
                {formattedDepartureDate}
              </p>
            </div>
            <SummaryItem flight={booking.departureFlight} styles={styles} />
            {booking.returnFlight && (
              <React.Fragment>
                <div className={styles["summary-flights__container"]}>
                  <h2 className={styles["summary-flights__title"]}>Ritorno</h2>
                  <p className={styles["summary-flights__date"]}>
                    {formattedReturnDate}
                  </p>
                </div>
                <SummaryItem flight={booking.returnFlight} styles={styles} />
              </React.Fragment>
            )}
          </div>

          <div className={styles["summary-passengers"]}>
            <h2 className={styles["summary-passengers__title"]}>
              Lista passeggeri
            </h2>
            <ul className={styles["passengers-list"]}>
              {booking.passengers.map((pas, i) => (
                <li key={i} className={styles["passenger"]}>
                  <span className={styles["passenger__type"]}>{pas.type}</span>
                  <span className={styles["passenger__name"]}>
                    {pas.firstname} {pas.lastname}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
    )
}

export default SummaryContent;