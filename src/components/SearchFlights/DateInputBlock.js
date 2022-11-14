import { useEffect, useState, useCallback } from "react";

const LimitData = function () {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    const todayPlusAYear = (yyyy + 1) + '-' + mm + '-' + dd;
    return [today, todayPlusAYear];
}

const DateInputBlock = function (props) {
    const { name } = props;
    const { placeholder } = props;
    const { label } = props;
    const { dateInputValue } = props;
    const { setDateInputValue } = props;
    const { setDateIsValid } = props;
    const { required } = props;

    const [today, todayPlusAYear] = LimitData();
    const [dateInputHasError, setDateInputHasError] = useState(false);


    const dateInputValueChangeHandler = function (e) {
        setDateInputValue(e.target.value)
    }

    const DateInputValidator = useCallback(function () {
        if (dateInputValue.length < 1) return;
        if (dateInputValue >= today && dateInputValue <= todayPlusAYear) setDateInputHasError(false)
        else setDateInputHasError(true);
    }, [dateInputValue, todayPlusAYear, today, setDateInputHasError]);

    useEffect(() => {
        DateInputValidator();
    }, [DateInputValidator]);


    useEffect(() => {
        if (dateInputHasError === false && dateInputValue.length > 0) {
            setDateIsValid(true)
        }
        else if (!required && dateInputValue.length === 0) {
            setDateIsValid(true);
        }
        else {
            setDateIsValid(false)
        }
    }, [dateInputHasError, dateInputValue, setDateIsValid, required])

    // minimo e massimo per il valore data

    return (
        <div className={"search-flights__block"}>
            <label htmlFor={name} className={"search-flights__block__label"}>{label}</label>
            <input required={required} value={dateInputValue} onChange={dateInputValueChangeHandler} name={name} type="date" min={today} max={todayPlusAYear} className={`search-flights__block__input ${dateInputHasError ? "search-flights__block__btn--invalid" : ""}`} placeholder={placeholder} />
            <p className="search-flights__block__error-message" >{dateInputHasError && "La data inserita non è valida"}</p>
        </div>
    )
}
export default DateInputBlock;