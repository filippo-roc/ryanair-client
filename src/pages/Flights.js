import styles from "./Flights.module.css";
import FlightsList from "../components/Flights/FlightsList";
import FlightSummary from "../components/Flights/FlightSummary";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import ACTIONS from "../store/actions/booking";
const Flights = function () {

    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();


    // states that control the chosen departure and return flight
    const [chosenDepartureFlight, setChosenDepartureFlight] = useState(null);
    const [chosenReturnFlight, setChosenReturnFlight] = useState(null);

    //states to be set if one of the flights does not exist
    const [chosenDepartureFlightDoesNotExist, setChosenDepartureFlightDoesNotExist] = useState(false);
    const [chosenReturnFlightDoesNotExist, setChosenReturnFlightDoesNotExist] = useState(false);



    // State that checks the validity of the form
    const [flightsIsValid, setFlightsIsValid] = useState(false);

    // get queryparams
    const queryParams = new URLSearchParams(location.search);
    const [departure] = useState(queryParams.get('departure'));
    const [destination] = useState(queryParams.get("destination"));
    const [departureDate] = useState(new Date(queryParams.get("departure-date")));
    const [returnDate] = useState(queryParams.get("return-date") && new Date(queryParams.get("return-date")));


    const bookFlight = function () {
        dispatch({ type: ACTIONS.SET_DEPARTURE_FLIGHT, value: chosenDepartureFlight });
        if (!chosenReturnFlightDoesNotExist && chosenReturnFlight) {
            dispatch({ type: ACTIONS.SET_RETURN_FLIGHT, value: chosenReturnFlight });
        }
        history.push(`${"/home/flights/passengers"}${location.search}`)
    }



    // check that flights have been chosen and set validity accordingly
    useEffect(() => {
        if (returnDate) {
            if (chosenDepartureFlight && chosenReturnFlight) setFlightsIsValid(true)
            else if (chosenDepartureFlight && chosenReturnFlightDoesNotExist) setFlightsIsValid(true)
            else if (chosenReturnFlight && chosenDepartureFlightDoesNotExist) setFlightsIsValid(true)
            else setFlightsIsValid(false)
        }
        else {
            if (chosenDepartureFlight) setFlightsIsValid(true)
            else setFlightsIsValid(false)
        }
    }, [setFlightsIsValid, chosenDepartureFlight, chosenReturnFlight, returnDate, chosenDepartureFlightDoesNotExist, chosenReturnFlightDoesNotExist])


    return (
        <main className={styles["flights"]}>

            <FlightSummary departure={departure} destination={destination} date={departureDate} forReturn={false} />

            {!chosenDepartureFlightDoesNotExist ? <FlightsList
                departure={departure}
                destination={destination}
                departureDate={departureDate}
                forReturn={false}
                chosenFlight={chosenDepartureFlight}
                setChosenFlight={setChosenDepartureFlight}
                setChosenFlightDoesNotExist={setChosenDepartureFlightDoesNotExist} /> :
                <div className={styles["flights__error-block"]}>Non esiste un volo con i parametri inseriti</div>}

            {returnDate &&
                <React.Fragment>
                    <FlightSummary departure={destination} destination={departure} forReturn={true} date={returnDate} />
                    {!chosenReturnFlightDoesNotExist ? <FlightsList
                        departure={destination}
                        destination={departure}
                        departureDate={returnDate}
                        forReturn={true}
                        chosenFlight={chosenReturnFlight}
                        setChosenFlight={setChosenReturnFlight}
                        setChosenFlightDoesNotExist={setChosenReturnFlightDoesNotExist}
                    /> :
                        <div className={styles["flights__error-block"]}>Non esiste un volo con i parametri inseriti</div>}
                </React.Fragment>}

            <button disabled={!flightsIsValid} className={styles["flights__btn"]} onClick={bookFlight}>Continua</button>

        </main>
    )
}
export default Flights;