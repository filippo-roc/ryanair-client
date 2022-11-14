import styles from "./User.module.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import authACTIONS from "../store/actions/auth";

const User = function () {

    const user = useSelector(state => state.auth.user);
    const history = useHistory();
    const dispatch = useDispatch();

    if (!user) {
        history.replace("/home")
        return null
    }

    // logout dall'account
    const logoutHandler = async function (e) {
        try {
            e.preventDefault();

            const result = await fetch(`${process.env.REACT_APP_APY_URL}users/logout`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `${user.token}`
                }
            });

            console.log(result.ok)
            if (!result.ok) {
                const error = await result.json();
                throw new Error(error.message)
            }
            dispatch({ type: authACTIONS.LOGOUT});

            //remove the user from local storage 
            window.localStorage.removeItem('user');

        } catch (err) {
            console.log("errore", err);
        }
    };

    const timeOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }

    const formattedBirthday = Intl.DateTimeFormat("IT-it", timeOptions).format(new Date(user.birthday))
    return (
        <main className={styles["user-main"]}>
            <div className={styles["user"]}>
                <nav className={styles["user__nav"]}>
                    <h3 className={styles["user__nav__name"]}>{user.firstname} {user.lastname}</h3>

                    <div className={styles["user__nav__container"]}>             
                        <ul className={styles["menu"]}>
                            <li className={styles["menu__item"]}>
                                <ion-icon size="small" name="person"></ion-icon>
                                <button className={styles["menu__item__btn"]}>Il Mio Account</button>
                            </li>
                        </ul>
                        <div className={styles["cta"]}>
                            <ion-icon class={styles["cta__icon"]} name="log-out-outline"></ion-icon>
                            <button onClick={logoutHandler} className={styles["cta__btn"]}>Logout</button>
                        </div>
                    </div>

                </nav>
                <div className={styles["user__block"]}>
                    <h1 className={styles["user__block__title"]}>Informazioni personali</h1>
                    <h4 className={styles["user__block__sub-title"]}>Queste informazioni saranno utilizzate per inserire automaticamente i tuoi dati personali, rendere la tua prenotazione più rapida e tenerti informato.</h4>
                    <ul className={styles["user-data"]}>
                        <li className={styles["user-data__item"]}>
                            <span className={styles["user-data__item__title"]}>Nome</span>
                            <span>{user.firstname}</span>
                        </li>
                        <li className={styles["user-data__item"]}>
                            <span className={styles["user-data__item__title"]}>Cognome</span>
                            <span>{user.lastname}</span>
                        </li>
                        <li className={styles["user-data__item"]}>
                            <span className={styles["user-data__item__title"]}>Data di nascita</span>
                            <span>{formattedBirthday}</span>
                        </li>
                        <li className={styles["user-data__item"]}>
                            <span className={styles["user-data__item__title"]}>Indirizzo e-mail</span>
                            <span>{user.email}</span>
                        </li>

                    </ul>
                </div>
            </div>
        </main>
    )
}
export default User;