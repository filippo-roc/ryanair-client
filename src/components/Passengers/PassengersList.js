import PassengerItem from "./PassengerItem";
import styles from "./PassengersList.module.css";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import { useDispatch } from "react-redux";
import bookingACTIONS from "../../store/actions/booking";

const ACTIONS = {
    PUSH_PASSENGER: "push-passenger",
    SET_PASSENGER_ATTRIBUTE : "set-passenger-attribute"
}

const passengerReducer = function (prevState, action) {
    switch (action.type) {
        case ACTIONS.PUSH_PASSENGER: {
            return [...prevState, action.value];
        }
        case ACTIONS.SET_PASSENGER_ATTRIBUTE: {
            let newState = JSON.parse(JSON.stringify(prevState));
            newState[action.value.index][action.value.attribute.name] = action.value.attribute.value;
            return [...newState];
        }
        default : return prevState
    }

}

const PassengersList = function () {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [allFormsAreValid, setAllFormsAreValid] = useState(false);

    // quest'oggetto raccogliera` i dati di tutti i passeggeri
    const [passengers, passengersDispatch] = useReducer(passengerReducer, []);


    const createPassengerBlocks = function () {
        const queryParams = new URLSearchParams(location.search);
        for (let i = 0; i < Number(queryParams.get("adults")); i++) {
            passengersDispatch({
                type: ACTIONS.PUSH_PASSENGER,
                value: {
                    firstname: "",
                    lastname: "",
                    type: "adulto",
                    title: "",
                    isValid: false,
                    bags : []
                }
            });
        }

        for (let i = 0; i < Number(queryParams.get("children")); i++) {
            passengersDispatch({
                type: ACTIONS.PUSH_PASSENGER,
                value: {
                    firstname: "",
                    lastname: "",
                    type: "bambino",
                    title: "",
                    isValid: false,
                    bags : []
                }
            });

        };

        for (let i = 0; i < Number(queryParams.get("babies")); i++) {
            passengersDispatch({
                type: ACTIONS.PUSH_PASSENGER,
                value: {
                    firstname: "",
                    lastname: "",
                    type: "neonato",
                    title: "",
                    isValid: false,
                    bags : []
                }
            });
        };
    }
    const submitHandler = function (e) {
        e.preventDefault();
        // rimuovo la proprieta` is valid che `e utile solo in questa parte del progetto
        passengers.forEach(pas => delete pas.isValid);

        dispatch({type : bookingACTIONS.SET_PASSENGERS, value : passengers});
        history.push(`${"/home/flights/bags"}${location.search}`)
    };

    // questa funzione deve essere usata solo al primo render
    useEffect(() => {
        createPassengerBlocks();
        // eslint-disable-next-line
    }, [])


    // controlla che tutti i passeggeri siano validi, imposta l'intero form di conseguenza
    useEffect(() => {
        if (passengers.some((passenger => passenger.isValid === false))) {
            setAllFormsAreValid(false)
        }
        else {
            setAllFormsAreValid(true)
        }
    }, [passengers, setAllFormsAreValid]);


    return (
        <ul className={styles["passengers-list"]}>
            {
                passengers.map(((passenger, i) => <PassengerItem
                    key={i}
                    number={i + 1}
                    passengersDispatch={passengersDispatch}
                    ACTIONS={ACTIONS}
                    index={i}
                    type={passenger.type} />))
            }
            <button disabled={!allFormsAreValid} onClick={submitHandler} className={styles["passengers-list__btn"]} type="submit">Continua</button>
        </ul>
    )
}
export default PassengersList;