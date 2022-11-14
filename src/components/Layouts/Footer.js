import styles from "./Footer.module.css";
const Footer = function(){
    return(
        <footer className={styles["footer"]}>
            <div>
            <h4 className={styles["footer-title"]}>Info Utili</h4>
            <ul className = {styles["footer-list"]}> 
                <li className = {styles["footer-list__item"]}>Tariffe</li>
                <li className = {styles["footer-list__item"]}>Centro informazioni</li>
                <li className = {styles["footer-list__item"]}>Rimborsi</li>
                <li className = {styles["footer-list__item"]}>Acquisti utili</li>
            </ul>
            </div>

            <div>
            <h4 className={styles["footer-title"]}>Azienda Ryanair</h4>
            <ul className = {styles["footer-list"]}>
                <li className = {styles["footer-list__item"]}>Su di noi</li>
                <li className = {styles["footer-list__item"]}>Promuoviti con noi</li>
                <li className = {styles["footer-list__item"]}>Offerte di lavoro</li>
                <li className = {styles["footer-list__item"]}>Ufficio stampa</li>
            </ul>
            </div>

        </footer>
    )
}
export default Footer