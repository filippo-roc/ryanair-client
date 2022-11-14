import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import SummaryContent from "../components/Summary/summaryContent";
import styles from "./Bookings.module.css"
import Spinner from "../components/UI/Spinner";
const Bookings = function () {

    const user = useSelector(state => state.auth.user);

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    
    if(!user){
        history.replace("/home");
    }

    //fetch the user's booking
    const fetchBookings = useCallback(async function () {
        try {
            setIsLoading(true);
            const result = await fetch(`${process.env.REACT_APP_APY_URL}bookings`, {
                method: "GET", // *GET, POST, PUT, DELETE, etc.
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${user.token}`
                },
            })
            const data = await result.json();
            setIsLoading(false)
            setBookings(data);
        } catch (err) {
            setIsLoading(true);
        }
    }, [setBookings, user]);

    useEffect(() => fetchBookings(), [fetchBookings]);

    return (
        <main className={styles["bookings"]}>
            <h1 className={styles["bookings__title"]}>Le tue prenotazioni</h1>
            {
               isLoading &&  <div className="spinner-container">
                <Spinner className = "spinner" />
               </div>
            }
            <ul>
                {
                    bookings.map((booking, i) =>
                        <SummaryContent
                            key={i}
                            booking={booking}
                            isBooking={true} />)
                }
            </ul>
        </main>
    )
}
export default Bookings;
