import { useEffect, useState} from "react";
import styles from "./PassengerItem.module.css"
import PassengerItemInputBlock from "./PassengerItemInputBlock";
const PassengerItem = function (props) {
    const { type } = props;
    const { number } = props;

    const {index} = props
    const {ACTIONS} = props;
    const { passengersDispatch} = props;

    const [passengerFirstnameIsValid, setPassengerFirstnameIsValid] = useState(false);
    const [passengerLastnameIsValid, setPassengerLastnameIsValid] = useState(false);

    const [titleValue, setTitleValue] = useState("Sig");


    const titleChangeHandler = function(e){
        setTitleValue(e.target.value);
    }

    useEffect(()=>{
        passengersDispatch({
            type : ACTIONS.SET_PASSENGER_ATTRIBUTE,
            value : {
                index : index,
                attribute : {
                    name : "title",
                    value : titleValue
                }
            }
        });
        // eslint-disable-next-line
    },[titleValue])



    // imposto la validita` in base all'input
    useEffect(() => {
        // input validi
        if (passengerFirstnameIsValid && passengerLastnameIsValid) {
            passengersDispatch({
                type : ACTIONS.SET_PASSENGER_ATTRIBUTE,
                value : {
                    index : index,
                    attribute:{
                        name : "isValid",
                        value : true
                    }
                }
            })
        }
        // input non validi
        else {
            passengersDispatch({
                type : ACTIONS.SET_PASSENGER_ATTRIBUTE,
                value : {
                    index : index,
                    attribute:{
                        name : "isValid",
                        value : false
                    }
                }
            })
        };
    }, [passengerFirstnameIsValid, passengerLastnameIsValid,index, passengersDispatch, ACTIONS]);


    return (
        <li className={styles["passenger"]}>
            <div className={styles["passenger__summary"]}>
                <span className={styles["passenger__summary__text"]}>Passeggero {number}</span>
                <span className={styles["passenger__summary__text"]}> {type}</span>
            </div>
            <form className={styles["passenger__form"]}>
                <div className={styles["passenger__form__block"]}>
                    <label htmlFor="title" className={styles["passenger__form__block__label"]}>Titolo</label>
                    <select onChange={titleChangeHandler} value={titleValue}  type="text" name="title" className={styles["passenger__form__block__input"]}>
                        <option value="Sig">Sig</option>
                        <option value="Sig.ra" >Sig.ra</option>
                        <option value="Sig.na">Sig.na</option>
                    </select>
                    <p className={styles["passenger__form__block__error-message"]}></p>

                </div>
                <PassengerItemInputBlock
                    styles={styles}
                    label="Nome"
                    name={"firstname"}
                    passengerInputIsValid={passengerFirstnameIsValid}
                    setPassengerInputIsValid={setPassengerFirstnameIsValid}
                    passengersDispatch = {passengersDispatch}
                    ACTIONS = {ACTIONS}
                    index = {index}
                />
                <PassengerItemInputBlock
                    styles={styles}
                    label="Cognome"
                    name={"lastname"}
                    passengerInputIsValid={passengerLastnameIsValid}
                    setPassengerInputIsValid={setPassengerLastnameIsValid}
                    passengersDispatch = {passengersDispatch}
                    ACTIONS = {ACTIONS}
                    index = {index}
                />

            </form>
        </li>
    )
}
export default PassengerItem