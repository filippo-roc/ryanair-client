import React from "react";
import styles from "./CloseButton.module.css";

const CloseButton = function (props) {
    const {setModal} = props;
    return ( 
        <div onClick={() => setModal("")} className={styles["close__btn"]}>
            <span className={styles["close__btn__bar"]}></span>
            <span className={styles["close__btn__bar"]}></span>
            <span className={styles["close__btn__bar"]}></span>
        </div>
    )
}


export default CloseButton;