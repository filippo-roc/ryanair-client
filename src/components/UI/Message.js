import Modal from "./Modal";
import styles from "./Message.module.css"
const Message = function(props){
    const {className} = props;
    return(
        <Modal className = {`${styles["message"] + " " + className}  `} >
            <ion-icon size = "large" class={styles["message__icon"]} name="airplane"></ion-icon>
            <h1>{props.message}</h1>
        </Modal>
    )
}
export default Message;