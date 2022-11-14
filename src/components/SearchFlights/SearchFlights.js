import { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import DateInputBlock from "./DateInputBlock";
import PassengerInputBlock from "./PassengerInputBlock";
import "./SearchFlights.css"
import Input from "../Input/Input";
const SearchFLights = function () {
    //hooks
    const history = useHistory();

    const [departureValue, setDepartureValue] = useState("");
    const [departureIsValid, setDepartureIsValid] = useState("");
    const [departureDateValue, setDepartureDateValue] = useState("");
    const [departureDateIsValid, setDepartureDateIsValid] = useState("");

    const [destinationValue, setDestinationValue] = useState("");
    const [destinationIsValid, setDestinationIsValid] = useState("");
    const [returnDateValue, setReturnDateValue] = useState("");
    const [returnDateIsValid, setReturnDateIsValid] = useState("");

    const adultsRef = useRef();
    const childrenRef = useRef();
    const babiesRef = useRef();

    const [formIsValid, setFormIsValid] = useState(false);

    const [airportList, setAirportList] = useState([]);
    // fetch the airport list
    const fetchAirportList = useCallback(async function () {
        try {
            const response = await fetch(`${process.env.REACT_APP_APY_URL}flights/flights-list`);
            const data = await response.json();
            setAirportList(data);
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        fetchAirportList()
    }, [fetchAirportList]);

    // check the validity of the input
    const checkAirportInputValue = function (airportInputValue) {
        //check the value
        return (airportList.some(value => value === airportInputValue))
    }

    // form validity
    useEffect(() => {
        if (departureIsValid && destinationIsValid && departureDateIsValid && returnDateIsValid) setFormIsValid(true)
        else setFormIsValid(false)
    }, [departureIsValid, destinationIsValid, departureDateIsValid, returnDateIsValid, setFormIsValid])

    // function that manages the search
    const searchHandler = function (e) {
        e.preventDefault();
        if (!formIsValid) return
        const adultsValue = adultsRef.current.value;
        const childrenValue = childrenRef.current.value;
        const babiesValue = babiesRef.current.value;
        history.push(`home/flights/select?departure=${departureValue}&destination=${destinationValue}&departure-date=${departureDateValue}&return-date=${returnDateValue}&adults=${adultsValue}&children=${childrenValue}&babies=${babiesValue}`)
    };



    return (
        <form className={"search-flights"} onSubmit={searchHandler}>
            <div className={"search-flights__container-blocks"}>
                <ion-icon class={"search-flights__icon"} name="business"></ion-icon>
                <div className="search-flights__block">
                    <Input
                        checkValue={checkAirportInputValue}
                        inputName="departure"
                        type="text"
                        inputClassName={"search-flights__block__input"}
                        inputClassNameError={"search-flights__block__input search-flights__block__input--invalid"}
                        label="Da"
                        placeholder="Partenza"
                        labelClass={"search-flights__block__label"}
                        messageClassName={"search-flights__block__error-message"}
                        errorMessage="L'aeroporto inserito non è disponibile"
                        inputIsValid={departureIsValid}
                        setInputIsValid={setDepartureIsValid}
                        inputValue={departureValue}
                        setInputValue={setDepartureValue}
                        firstCapitalLetter={true}
                    />
                </div>
                <div className="search-flights__block">
                    <Input
                        checkValue={checkAirportInputValue}
                        inputName="destination"
                        type="text"
                        inputClassName={"search-flights__block__input"}
                        inputClassNameError={"search-flights__block__input search-flights__block__input--invalid"}
                        label="A"
                        placeholder="Destinazione"
                        labelClass={"search-flights__block__label"}
                        messageClassName={"search-flights__block__error-message"}
                        errorMessage="L'aeroporto inserito non è disponibile"
                        inputValue={destinationValue}
                        setInputValue={setDestinationValue}
                        inputIsValid={destinationIsValid}
                        setInputIsValid={setDestinationIsValid}
                        firstCapitalLetter={true}
                    />
                </div>

            </div>

            <div className={"search-flights__container-blocks"}>
                <ion-icon class={"search-flights__icon"} name="calendar"></ion-icon>
                <DateInputBlock
                    name="departureDate"
                    placeholder="Scegli una data"
                    label="Data partenza"
                    required={true}
                    dateInputValue={departureDateValue}
                    setDateInputValue={setDepartureDateValue}
                    setDateIsValid={setDepartureDateIsValid}
                />
                <DateInputBlock
                    name="returnDate"
                    placeholder="Scegli una data"
                    label="Data ritorno"
                    required={false}
                    dateInputValue={returnDateValue}
                    setDateInputValue={setReturnDateValue}
                    setDateIsValid={setReturnDateIsValid}
                />

            </div>
            <div className={"search-flights__container-blocks search-flights__container-blocks--passengers"}>
                <ion-icon class={"search-flights__icon search-flights__icon--passengers"} name="people"></ion-icon>
                <PassengerInputBlock
                    label={"Adulti"}
                    defaultValue={1}
                    adults={true}
                    name={"adults"}
                    ref={adultsRef}
                />
                <PassengerInputBlock
                    label={"Bambini"}
                    defaultValue={0}
                    adults={false}
                    children={"children"}
                    ref={childrenRef}
                />
                <PassengerInputBlock
                    label={"Neonati"}
                    defaultValue={0}
                    adults={false}
                    ref={babiesRef}
                    name={"babies"}

                />
            </div>
            <button disabled={!formIsValid} className={"search-flights__block__btn"} type="submit">Cerca</button>
        </form>
    )
}
export default SearchFLights;