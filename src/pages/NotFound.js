import styles from "./NotFound.module.css";
const NotFound = function(){
    return(
        <main>
            <h1 className = {styles["not-found__title"]}>Oh No, La pagina che stai cercando non esiste!</h1>
        </main>
    )
}
export default NotFound;