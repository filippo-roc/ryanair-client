import { useState, useEffect } from "react";

const firstLetterToUpperCase = function(value){
    if ((value[0].toUpperCase() !== value[0])) return (value[0].toUpperCase() + value.slice(1))
    return value;
}

const Input = function (props) {

    //this function will have to check check the value of the input
    const { checkValue } = props;
    const {inputName} = props;
    const {type} = props;
    const {label} = props;
    const {placeholder} = props;
    const {inputClassName} = props;
    const {inputClassNameError} = props;
    const {labelClass} = props;
    const {messageClassName} = props;
    const {errorMessage} = props;
    const {max} = props;
    const {firstCapitalLetter} = props;
     // state for validity
    const {inputIsValid} = props;
    const {setInputIsValid} = props;
    const {setFormError} = props;
    
    //state for the value
    const {inputValue} = props;
    const {setInputValue} = props;

 
    // states of input
    const [inputHasError, setInputHasError] = useState(false);
    const [inputIsFocus, setInputIsFocus] = useState(false);
    const [inputWasTouched, setInputWasTouched] = useState(false);


    const inputChangeHandler = function (e) {

        if(setFormError) setFormError(false);

        let newInputValue = e.target.value;

        if(firstCapitalLetter && newInputValue.length > 0){
             newInputValue = firstLetterToUpperCase(newInputValue);
        }
        // imposto validita` input
        if (checkValue(newInputValue)) {
            setInputIsValid(true)
        }
        else {
            setInputIsValid(false);
        }
            
        setInputValue(newInputValue)
        
    }

    // imposto l'errore nel caso in cui:
    // - la input non sia valida e l'utente abbia terminato di scrivere
    useEffect(() => {
        if (!inputIsValid && inputWasTouched && inputValue.length > 0) {
            setInputHasError(true);
        } else {
            setInputHasError(false);
        }
    }, [inputIsValid, inputIsFocus, inputWasTouched, setInputHasError, inputValue]);

    const inputClass = inputHasError ? inputClassNameError : (inputClassName);

    return (
        <>
            <label htmlFor={inputName} className={labelClass}>{label}</label>
            <input required = {true} max={max} onFocus={() => {
                setInputIsFocus(true);
                setInputWasTouched(true);
            }} onBlur={() => setInputIsFocus(false)} onChange={inputChangeHandler} value={inputValue} placeholder={placeholder} className={inputClass} name={inputName} type= {type} />
             <p className={messageClassName}>{(inputHasError && !inputIsFocus) ? errorMessage :""}</p>

        </>
    )
}
export default Input