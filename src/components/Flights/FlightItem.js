import styles from "./FlightItem.module.css"

const FlightItem = function (props) {
    // prelevo i dati
    const { departure } = props;
    const { departureDate } = props;
    const { destination } = props;
    const { destinationDate } = props;
    const { price } = props;
    const {duration} = props;
    const {flightNumber} = props;
    const {typeOfFlight} = props;
    const { addFlight } = props;
    const { activeClass } = props;
    const {forReturn} = props;
    const {flight} = props;

    // creo l'oggetto per formattare l'ora
    const timeOptions = {
        hour: "numeric",
        minute: "numeric"
    }
    // formatto l'ora
    const departureTime = new Intl.DateTimeFormat("it-IT", timeOptions).format(new Date(departureDate));
    const destinationTime = new Intl.DateTimeFormat("it-IT", timeOptions).format(new Date(destinationDate));
    // creo l'oggetto per formattere il costo
    const currencyOptions = {
        style: "currency",
        currency: "EUR"
    };
    //formatto il costo
    const formattedPrice = new Intl.NumberFormat("it-IT", currencyOptions).format(price);


    const iconClass = forReturn ? `${styles["flight-effect__icon"]} ${styles["flight-effect__icon--return"]} `: styles["flight-effect__icon"] 

    return (
        <li className={`${styles["flight"]} ${activeClass}`} onClick={() => addFlight(flight)} >
            <div className={styles["flight__block"]}>
                <div className={`${styles["time-and-place"]} ${styles["flight__block__item"]}`}>
                    <p className={styles["time-and-place__time"]} >{departureTime}</p>
                    <p className={styles["time-and-place__place"]}>{departure}</p>
                </div>
                <div className={styles["flight__block__item"]}>
                    <div className={styles["flight-effect"]}>
                        <span className={styles["flight-effect__effect"]}></span>
                        <ion-icon class={iconClass} name="airplane"></ion-icon>
                        <span className={styles["flight-effect__effect"]}></span>
                    </div>
                    <p>Durata {duration}</p>
                </div>

                <div className={`${styles["time-and-place"]} ${styles["flight__block__item"]}`}>
                    <p className={styles["time-and-place__time"]}>{destinationTime}</p>
                    <p className={styles["time-and-place__place"]}>{destination}</p>
                </div>
            </div>
            <div className={styles["flight__block"]}>
                <div>
                    <p className={styles["flight-information-title"]}>Tipo Volo</p>
                    <p>{typeOfFlight === "direct" ?"Diretto" : "Scalo" }</p>
                </div>
                <div>
                    <p className={styles["flight-information-title"]}>N. Volo</p>
                    <p>{flightNumber}</p>
                </div>
            </div>
            <div className={styles["flight__block"]}>
                <p className={styles["flight-price"]} >{formattedPrice}</p>
            </div>
            <div className={styles["flight__block"]}>
                <button className={styles["flight-btn"]}>
                    Scegli
                </button>
            </div>
        </li>
    )
}
export default FlightItem;