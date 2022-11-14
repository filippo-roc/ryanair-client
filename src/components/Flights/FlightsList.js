import styles from "./FlightsList.module.css";
import { useState, useEffect, useCallback } from "react";

import FlightItem from "./FlightItem";
import Spinner from "../UI/Spinner";

const FlightsList = function (props) {
    //controlla se `e un volo di andata o di ritorno
    const { forReturn } = props;

    const { chosenFlight } = props;
    const { setChosenFlight } = props;


    const { departure } = props;
    const { destination } = props;
    const { departureDate } = props;

    const { setChosenFlightDoesNotExist } = props



    // stati che gestiranno il caricamento dei voli
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    // funzione che si occupera` di impostare l'id del volo scelto
    const addFlight = function (flight) {
        setChosenFlight((prevState) => {
            if (prevState?._id === flight._id) return null
            return flight;
        });
    };


    // funzione che preleva i dati dei voli dall'api
    const fetchFlights = useCallback(async function () {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.REACT_APP_APY_URL}flights?departure=${departure}&destination=${destination}&departure-date=${departureDate}`);
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            //controllo che l'api abbia restituito almeno un volo
            if (data.length === 0) setChosenFlightDoesNotExist(true)
            setIsLoading(false);
            setFlights(data);
        } catch (error) {
            setIsLoading(false)
            setError(true)
            console.log(error);
        } // eslint-disable-next-line
    }, [departure, destination, departureDate]);

    useEffect(() => fetchFlights(), [fetchFlights]);




    // imposto il contenuto principale della pagina
    let content;
    if (isLoading) {
        content = <div className='spinner-container'> <Spinner className='spinner' /></div>
    }
    else if (error) {
        content = <div>Ops qualcosa `e andato storto...</div>
    }
    else if (flights.length > 0 && chosenFlight) {
        content = flights.filter(flight => flight._id === chosenFlight._id).map((flight, i) => {
            return (
                <FlightItem
                    key={flight._id}
                    id={flight._id}
                    departure={flight.departureAirport}
                    departureDate={flight.departureDate}
                    destination={flight.destinationAirport}
                    destinationDate={flight.destinationDate}
                    flightNumber = {flight._id.slice(-5).toUpperCase()}
                    price={flight.price}
                    typeOfFlight={flight.typeOfFlight}
                    duration={flight.duration}
                    addFlight={addFlight}
                    activeClass={styles["flight-list__item--active"]}
                    forReturn={forReturn}
                    flight = {flight}
                />
            )
        });
    }
    else if (flights.length > 0) {
        content = flights.map((flight, i) => {
            return (
                <FlightItem
                    key={flight._id}
                    id={flight._id}
                    departure={flight.departureAirport}
                    departureDate={flight.departureDate}
                    destination={flight.destinationAirport}
                    destinationDate={flight.destinationDate}
                    duration={flight.duration}
                    flightNumber = {flight._id.slice(-5).toUpperCase()}
                    price={flight.price}
                    typeOfFlight={flight.typeOfFlight}
                    addFlight={addFlight}
                    forReturn={forReturn}
                    flight = {flight}
                />
            )
        });
    }
    return (
        <ul className={styles["flights-list"]}>
            {content}
        </ul>
    )
}
export default FlightsList;