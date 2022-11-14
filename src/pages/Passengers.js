import styles from "./Passengers.module.css";
import PassengersList from "../components/Passengers/PassengersList"
const Passengers = function () {
    return (
        <main className = {styles["passengers-page"]}>
            <div className = {styles["passengers-pages__introduction"]}>
                <h2 className = {styles["passengers-pages__introduction-title"]}>Passeggeri</h2>
                <h3 className = {styles["passengers-pages__introduction-text"]}>Inserisci i nomi come indicati sul passaporto o sulla documentazione di viaggio</h3>
            </div>
            <PassengersList />
        </main>
    )
}
export default Passengers;