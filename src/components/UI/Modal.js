import styles from "./Modal.module.css"
const Modal = function(props){
    const {className} = props;
    const {responsive} = props;
    return(
        <div className = {`${styles["modal"]} ${className} ${responsive && styles["modal--responsive"]}`}>
            {props.children}
        </div>
    )
}
export default Modal;