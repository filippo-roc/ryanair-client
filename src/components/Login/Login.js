import React, { useEffect, useState } from "react";
import Overlay from "../UI/Overlay";
import Modal from "../UI/Modal";
import Input from "../Input/Input";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import authACTIONS from "../../store/actions/auth"
import CloseButton from "../UI/CloseButton";

let formErrorMessage = "";

const Login = function (props) {
    const { setModal } = props;

    const dispatch = useDispatch();

    // state of email
    const [emailIsValid, setEmailIsValid] = useState(false)
    const [emailValue, setEmailValue] = useState("");


    // state of password
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");

    // state of form
    const [formIsValid, setFormIsValid] = useState(false);
    const [formError, setFormError] = useState(false);


    const checkPasswordValue = function (enteredValue) {
        return enteredValue.length >= 8;
    }


    const checkEmailValue = function (enteredValue) {
        return (enteredValue.includes("@") && enteredValue.length >= 6)
    }

    //gestore login
    const loginHandler = async function (e) {
        try {
            e.preventDefault();

            const bodyContent = {
                email: emailValue,
                password: passwordValue
            };

            const response = await fetch(`${process.env.REACT_APP_APY_URL}users/login`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyContent) // body data type must match "Content-Type" header
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message)
            }
            const data = await response.json();
            dispatch({ type: authACTIONS.LOGIN, user: { token: data.token, ...data.user } });
            // save the user in localstorage
            localStorage.setItem('user', JSON.stringify({ token: data.token, ...data.user }));
            setModal("")
        } catch (err) {
            console.log("errore", err);
            formErrorMessage = err.message;
            setFormError(true);
        }
    }


    // se password e email sono validi il form `e valido
    useEffect(() => {
        if (passwordIsValid && emailIsValid && !formError) setFormIsValid(true);
        else setFormIsValid(false);
    }, [passwordIsValid, emailIsValid, setFormIsValid, formError])


    const signInHandler = function () {
        setModal("sign-in")
    }

    return (
        <React.Fragment>
            <Overlay setModal={setModal} />
            <Modal responsive = {true} className={styles["login"]}>

            <CloseButton  setModal = {setModal}/>
                <header className={styles["header"]}>
                    <h2 className={styles["header__text"]}><span className={styles["header__text--special"]}>Accedi </span>per continuare</h2>
                    <h4 className={styles["header__text"]}>Niente di più facile con Ryanair</h4>
                    <svg className={styles["header__icon"]} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" width="164" height="164"><g fill="#f1c931"><path d="m39.9 10.6c3.1 1 6.3 1.8 9.6 2.2h2.3l.1-.1c1.4 0 2.4-.6 3.7-.9.1 0 .5-.1.6.1.1.3 0 .5-.3.7-1.6 1.3-3.6 2.2-5.4 2.9-.6.1-1.3.4-1.9.6-2.3.7-4.9 1.1-7.3.9-4.7-.2-8.7-1.9-12.8-1.7-4.1-.2-7.9 1.3-10.1 4.4-1.1 1.6-2 3.3-2.3 5.1.1 1.7 2.5 2.3 3.4 3.7.5.8.8 1.8 1.1 2.6 1 1.8 2 3.5 3.2 5.2.7 1.1 1.8 2.1 3.2 2.7 1.7 1.2 3.2 2.8 4.2 4.4s1.6 3.3 2.4 5c.4 1 .7 2 1 3 .1.1.1.2.2.4.3.8.5 1.7.9 2.4-.1.1.1.2.1.3 0 .5.5 1.1-.1 1.4-.9-.8-1.3-1.9-1.8-2.7-1-1.8-2.2-3.4-3.4-5.1-.8-1-1.6-2-2.5-3-3.7-4.1-9.1-6.5-13-10.4-.3-.3-.6-.7-.8-1-.5-.7-.8-1.4-1.2-2.1-1.2-1.8-2.4-3.7-3.2-5.7-.2-.8-.5-1.6-.5-2.5l-.1-.3c.1-.9-2.1-1.4-.9-3.1.8-.8 3.7-1.8 4.7-3.4 0-.2.1-.5-.1-.7 0-.2-.2-.3-.3-.5-.6-.7-2.1-.1-2-1.2.2 0 0-.1.1-.2-.1-.5-.1-.8 0-1.3.3-.8.6-1.8.5-2.6.1-.3.4-.5.7-.6.6-.2 1.2-.2 1.8-.3l.1.1c1.4-.1 3.1 0 4.1 1.1.4.8.1 1.8-.1 2.7-.1.5-.6.9-.5 1.4.2.2.6.2.8.1 2.1-1.3 4-3.1 5.6-4.9 1.4-1.3 3.6-1.8 5.5-1.5 3.7.2 7 1.5 10.7 2.4z"></path><path d="m29.7 17.7c.6.7-.2 1.4-.4 2-2.3 3.5-3.1 7.4-4.7 11.1-.1.2-.3.2-.4.2-.4-.3-.4-.8-.4-1.2.3-4 1.4-7.8 3.1-11.4.4-.6 1.1-1.2 2-1.1.3 0 .6.2.8.4zm6.1 1.1c.3 1.3-.7 2.4-1.1 3.6-2.3 4.5-5 8.9-6.3 13.7-.1.2-.2.4-.3.4-.2.1-.4 0-.4-.2-.5-1.9.1-3.9.6-5.7 1.3-4 2.8-8.2 5-11.9.3-.2.3-.4.6-.4.7-.1 1.5-.1 1.9.5zm6.5.2c.6.5.3 1.3.1 1.9-2.6 5.8-6.9 10.9-8.7 17-.5 1.3-.8 2.6-1.2 4-.1.2-.4.2-.7.2-.2-.6-.2-1.3-.2-1.9.6-4.9 1.7-9.7 4.1-14 1.1-2.1 2.2-4.1 3.3-6.2.3-.6.9-1.1 1.7-1.3.6-.1 1.2.1 1.6.3zm7.3.3c.4.7 0 1.5-.2 2.2-1.7 4.7-4.8 8.6-7.3 12.9-2.2 3.5-3.6 7.4-5 11.2-.5 1.1-.7 2.4-1.3 3.5 0 .1-.2 0-.3.1-.4-.3-.3-.8-.4-1.2.3-4.8 2.1-9.1 3.9-13.4 2.2-4.8 5.1-9.4 7-14.4.3-.6.8-1.4 1.7-1.6.7-.1 1.4.2 1.9.7z"></path></g></svg>
                </header>
                <form onSubmit={loginHandler} className={styles["form"]}>
                    <Input
                        checkValue={checkEmailValue}
                        inputName="email"
                        type="email"
                        inputClassName={styles["form__input"]}
                        inputClassNameError={`${styles["form__input--invalid"]} ${styles["form__input"]}`}
                        label="Email"
                        placeholder="Email"
                        labelClass={styles["form__label"]}
                        messageClassName={styles["form__invalid-message"]}
                        errorMessage="Email non valida"
                        inputIsValid={emailIsValid}
                        setInputIsValid={setEmailIsValid}
                        inputValue={emailValue}
                        setInputValue={setEmailValue}
                        setFormError={setFormError}
                    />
                    <Input
                        checkValue={checkPasswordValue}
                        inputName="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        inputClassName={styles["form__input"]}
                        inputClassNameError={`${styles["form__input--invalid"]} ${styles["form__input"]}`}
                        labelClass={styles["form__label"]}
                        messageClassName={styles["form__invalid-message"]}
                        errorMessage="Password non valida, deve contenere almeno 8 caratteri"
                        inputIsValid={passwordIsValid}
                        setInputIsValid={setPasswordIsValid}
                        inputValue={passwordValue}
                        setInputValue={setPasswordValue}
                        setFormError={setFormError}

                    />
                    <button disabled={!formIsValid} className={styles["form__btn"]} type="submit">Accedi</button>
                </form>

                {formError ?
                    <p className={styles["form-invalid-message"]}>{formErrorMessage}</p> :
                    <p className={styles["form-invalid-message"]}></p>}

                <span className={styles["effect"]}></span>
                <div className={styles["sign-in"]}>
                    <p className={styles["sign-in__paragraph"]}>Non hai un account?</p>
                    <button onClick={signInHandler} className={styles["sign-in__btn"]}>Iscriviti</button>
                </div>
            </Modal>
        </React.Fragment>
    )
}
export default Login;