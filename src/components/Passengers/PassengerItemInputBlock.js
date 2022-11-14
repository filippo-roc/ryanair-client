import { useState, useCallback, useEffect } from "react";

const PassengerItemInputBlock = function (props) {
    //props normali
    const { name } = props;
    const { label } = props;
    const { styles } = props;
    //props stati
    const { setPassengerInputIsValid } = props;

    //stati del componente
    const [passengerInputValue, setPassengerInputValue] = useState("")
    const [passengerInputError, setPassengerError] = useState({
        isThere: false,
        message: ""
    });

    //proprieta` per impostare le informazioni dei passeggeri
    const {passengersDispatch} = props;
    const {index} =  props;
    const {ACTIONS} = props


    const [isFocus, setIsFocus] = useState(false)

    const [isTouched, setIsTouched] = useState(false);


    //funzione di convalida
    const passengerInputValidator = useCallback(function (passengerInputValue) {
        if (passengerInputValue.length < 1) return;
        //controlla che il carattere inserito sia valido A/Z a/z
        if (!((passengerInputValue[passengerInputValue.length - 1].charCodeAt() >= 65) && (passengerInputValue[passengerInputValue.length - 1].charCodeAt() <= 90)) &&
            !((passengerInputValue[passengerInputValue.length - 1].charCodeAt() >= 97) && (passengerInputValue[passengerInputValue.length - 1].charCodeAt() <= 122))
        ) {
            // lo spazio `e valido come carattere
            if (passengerInputValue[passengerInputValue.length - 1].charCodeAt() === 32) return
            // nel caso di un carattere non valido cancello l'ultima lettera inserita
            return setPassengerInputValue((prevState) => {
                return prevState.slice(0, prevState.length - 1)
            })
        }
        if (passengerInputValue.length <= 2) {
            return setPassengerError(() => {
                return {
                    isThere: true,
                    message: "Il nome deve contenere almeno 3 caratteri"
                }
            })
        };
        setPassengerError({
            isThere: false,
            message: ""
        })

    }, [setPassengerError, setPassengerInputValue]);


    // ogni volta che il valore dell'input cambia esegui la convalida
    useEffect(() => {
        passengerInputValidator(passengerInputValue)
    }, [passengerInputValidator, passengerInputValue]);

    //funzione che gestisce il cambiamento dell'input
    const passengerInputValueChangeHandler = function (e) {
        const enteredValue = e.target.value;
        if ((enteredValue !== "") && (enteredValue[0].toUpperCase() !== enteredValue[0])) setPassengerInputValue(enteredValue[0].toUpperCase() + enteredValue.slice(1));
        else setPassengerInputValue(enteredValue);

    };


    const passengerInputIsValid = useCallback(function() {
        if (isTouched && !passengerInputError.isThere && passengerInputValue.length > 2){
         setPassengerInputIsValid(true)
         passengersDispatch({
             type : ACTIONS.SET_PASSENGER_ATTRIBUTE,
             value : {
                 index : index,
                 attribute : {
                     name : name,
                     value : passengerInputValue.replace(/\s{2,}/g, ' ').trim()
                 }
             }
         });
        }
        else setPassengerInputIsValid(false)
    },[isTouched,passengerInputError, setPassengerInputIsValid,passengerInputValue, ACTIONS, passengersDispatch,index,name]);

    //imposta la validita` dell'input
    useEffect(()=>{
        passengerInputIsValid();
    },[passengerInputIsValid])


    // classe da dare a input in base all'errore
    const inputClass = passengerInputError.isThere ? `${styles["passenger__form__block__input"]} ${styles["passenger__form__block__input--invalid"]} ` :
        styles["passenger__form__block__input"]

    return (
        <div className={styles["passenger__form__block"]}>
            <label htmlFor={name} className={styles["passenger__form__block__label"]}>{label}</label>
            <input onFocus={() => {
                setIsFocus(true)
                setIsTouched(true)
            }} onBlur={() => setIsFocus(false)} onChange={passengerInputValueChangeHandler}
                value={passengerInputValue} name={name} required={true} type="text"
                className={inputClass} ></input>
            <p className={styles["passenger__form__block__error-message"]}>{(passengerInputError.isThere && !isFocus) && passengerInputError.message}</p>
        </div>
    )
}
export default PassengerItemInputBlock;
