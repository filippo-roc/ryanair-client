import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { useState } from "react";
const Header = function (props) {

    const { setModal } = props;
    // gestisce l'iscrizione
    const signInHandler = function (e) {
        e.preventDefault();
        setMenuIsOpen(false);
        setModal("sign-in");
    }
    //gestisce il login
    const loginHandler = function (e) {
        e.preventDefault();
        setMenuIsOpen(false);
        setModal("login");
    }
    //imposta l'accesso all'account(nel caso in cui sia impostato)
    const user = useSelector(state => state.auth.user);

    let [menuIsOpen, setMenuIsOpen] = useState(false);

    const openMenuHandler = function () {
        setMenuIsOpen(!menuIsOpen);
    }
    const clickHandler = function(){
        setMenuIsOpen(false);
    }

    return (
        <header className={styles["header"]}>
            <nav className={styles["nav"]}>
                <div className={styles["logo"]}>
                    <svg viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg" height="50px" width="157px"><path d="m23.8 14.3-2.8-3.7h-1.1v3.7h-3.3v-9.7h4.9c3.6 0 5.9 1 5.9 3 0 1.4-1.3 2.2-3.1 2.7l3.2 4zm-2.5-8h-1.5v2.7h1.6c1.7 0 2.6-.5 2.6-1.3.1-1-.7-1.4-2.7-1.4zm14.3 4.3v3.7h-3.3v-3.6l-4.8-6.1h3.6l1.4 2c.6.8 1.2 1.8 1.4 2.3.2-.5.8-1.5 1.4-2.3l1.4-2h3.6zm12.5 3.7-.9-2h-4.1l-.9 2h-3.4l4.7-9.7h3.2l4.7 9.7zm-2.1-4.8c-.3-.7-.7-1.9-.9-2.4-.1.5-.5 1.5-.8 2.3l-.5 1.2h2.7zm14.5 4.8-3.4-4.3c-.5-.6-1.1-1.4-1.4-2 0 .6.1 1.6.1 2.2v4.1h-3v-9.7h3.3l3.2 4.3c.4.6 1.1 1.5 1.5 2 0-.6-.1-1.7-.1-2.3v-4h3v9.7zm13.8 0-.9-2h-4.1l-.9 2h-3.4l4.7-9.7h3.3l4.7 9.7zm-2.1-4.8c-.3-.7-.7-1.9-.9-2.4-.1.5-.5 1.5-.8 2.3l-.5 1.2h2.7zm6.8 4.8v-9.7h3.3v9.7zm13.4 0-2.9-3.7h-1.1v3.7h-3.3v-9.7h4.9c3.6 0 5.9 1 5.9 3 0 1.4-1.3 2.2-3.1 2.7l3.2 4zm-2.5-8h-1.5v2.7h1.6c1.7 0 2.6-.5 2.6-1.3.1-1-.7-1.4-2.7-1.4z" fill="#fff"></path><g fill="#f1c931"><path d="m11.2 4.2c.7.2 1.4.4 2.1.5h.5c.3 0 .5-.1.8-.2h.1c0 .1 0 .1-.1.2-.4.3-.8.5-1.2.6-.1 0-.3.1-.4.1-.5.2-1.1.2-1.6.2-1-.1-1.9-.4-2.9-.4-.9-.1-1.8.3-2.3 1-.1.4-.3.8-.3 1.2s.6.5.8.8l.3.6c.1.4.3.8.6 1.2.2.2.4.5.7.6.4.3.7.6.9 1s.4.7.5 1.1c.1.2.2.4.2.7v.1c.1.2.1.4.2.5v.1c0 .1.1.3 0 .3-.2-.2-.3-.4-.4-.6-.1-.4-.4-.8-.7-1.2-.2-.2-.4-.5-.6-.7-.8-.9-2-1.5-2.9-2.3 0 0 0-.1-.1-.2-.1-.2-.2-.3-.3-.5-.2-.4-.5-.8-.7-1.3 0-.2-.1-.4-.1-.6v-.1c0-.2-.5-.3-.2-.7.2-.2.8-.4 1-.8v-.2s0-.1-.1-.1-.4.2-.4-.1v-.3c.1-.2.1-.4.1-.6 0-.1.1-.1.2-.1s.3-.1.4-.1c.3 0 .7 0 .9.2.1.2 0 .4 0 .6s-.2.3-.1.4h.2c.4-.3.8-.7 1.2-1.1.3-.3.8-.4 1.2-.3.9 0 1.6.3 2.5.5z"></path><path d="m8.9 5.8c.1.2 0 .3-.1.5-.5.7-.7 1.6-1 2.4h-.1c-.1 0-.1-.1-.1-.2 0-.9.3-1.7.7-2.5.1-.1.2-.3.4-.2.1-.1.1 0 .2 0zm1.4.2c.1.3-.1.5-.2.8-.5 1-1.1 2-1.4 3.1 0 0 0 .1-.1.1h-.1c-.1-.4 0-.9.1-1.3.3-.9.6-1.8 1.1-2.7.1 0 .1-.1.1-.1.2 0 .4 0 .5.1zm1.4.1c.1.1.1.3 0 .4-.6 1.3-1.5 2.4-1.9 3.8l-.3.9c0 .1-.1.1-.1 0-.1-.1 0-.3 0-.4.1-1.1.4-2.2.9-3.1.2-.5.5-.9.7-1.4.1-.1.2-.3.4-.3.1 0 .2 0 .3.1zm1.6.1c.1.2 0 .3 0 .5-.4 1-1.1 1.9-1.6 2.9-.5.8-.8 1.7-1.1 2.5-.1.3-.2.5-.3.8h-.1c-.1-.1-.1-.2-.1-.3.1-1.1.5-2 .9-3 .5-1.1 1.1-2.1 1.6-3.2.1-.1.2-.3.4-.4.1 0 .2 0 .3.2z"></path></g></svg>
                </div>
                <ul className={`${styles["menu"]} ${menuIsOpen && styles["menu--open"]}`}>
                    <li className={styles["menu__item"]}>
                        <NavLink to="/" onClick={()=> clickHandler()}>
                            Home
                        </NavLink ></li>
                    {user ?
                        <li className={styles["menu__item"]}>
                            <NavLink to="/user" onClick={()=> clickHandler()}>
                                <ion-icon id={styles["user-icon"]} name="person-circle-outline"></ion-icon>
                                {user.firstname}
                            </NavLink>
                        </li>

                        :
                        <React.Fragment>
                            <li className={styles["menu__item"]}>
                                <button className={styles["menu__item__btn"]} onClick={signInHandler}>Iscriviti</button></li>
                            <li className={styles["menu__item"]}>
                                <button className={styles["menu__item__btn"]} onClick={loginHandler}>
                                    Accedi
                                </button>
                            </li>
                        </React.Fragment>}
                    <li className={styles["menu__item"]}>
                        {user &&
                            <NavLink to="/user/booking" onClick={()=> clickHandler()}>
                                <ion-icon id={styles["booking-icon"]} name="book-sharp"></ion-icon>
                                Prenotazioni
                            </NavLink>}
                    </li>
                </ul>

                <div onClick={openMenuHandler} className={styles["hamburger"]}>
                    <span className={`${styles["hamburger__bar"]} ${menuIsOpen && styles["hamburger__bar--active"]}`}></span>
                    <span className={`${styles["hamburger__bar"]} ${menuIsOpen && styles["hamburger__bar--active"]}`}></span>
                    <span className={`${styles["hamburger__bar"]} ${menuIsOpen && styles["hamburger__bar--active"]}`}></span>
                </div>

            </nav>
        </header>
    )
}
export default Header;



// 2 ore con il light theme e gli occhi vanno a fottersi, il programma ti serve 