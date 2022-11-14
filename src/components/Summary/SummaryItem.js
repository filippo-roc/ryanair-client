const SummaryItem = function ({ flight, styles }) {
    const timeOptions = {
        hour: "numeric",
        minute: "numeric"
    }
    const departureTime = new Intl.DateTimeFormat("it-IT", timeOptions).format(new Date(flight.departureDate));
    const destinationTime = new Intl.DateTimeFormat("it-IT", timeOptions).format(new Date(flight.destinationDate));

    const { departureAirport } = flight;
    const { destinationAirport } = flight
    const flightNumber = flight._id.slice(-5).toUpperCase();
    const iconClass = `${styles["summary-flight-effect__icon"]}`;
    const { duration } = flight;


    
    return (
        <div className={styles["summary-flight"]}>
            <div className={styles["summary-flight__block"]}>
                <div className={`${styles["time-and-place"]} ${styles["summary-flight__block__item"]}`}>
                    <p className={styles["time-and-place__time"]} >{departureTime}</p>
                    <p className={styles["time-and-place__place"]}>{departureAirport}</p>
                </div>
                <div className={styles["summary-flight__block__item"]}>
                    <div className={styles["summary-flight-effect"]}>
                        <span className={styles["summary-flight-effect__effect"]}></span>
                        <ion-icon class={iconClass} name="airplane"></ion-icon>
                        <span className={styles["summary-flight-effect__effect"]}></span>
                    </div>
                    <p>Durata {duration}</p>
                </div>

                <div className={`${styles["time-and-place"]} ${styles["summary-flight__block__item"]}`}>
                    <p className={styles["time-and-place__time"]}>{destinationTime}</p>
                    <p className={styles["time-and-place__place"]}>{destinationAirport}</p>
                </div>
            </div>
            <div className={styles["summary-flight__block"]}>
                <div>
                    <p className={styles["summary-flight-information-title"]}>Tipo Volo</p>
                    <p>Diretto</p>
                </div>
                <div>
                    <p className={styles["summary-flight-information-title"]}>N. Volo</p>
                    <p>{flightNumber}</p>
                </div>
            </div>

        </div>
    )
}
export default SummaryItem