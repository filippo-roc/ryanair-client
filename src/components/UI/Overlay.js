import React from "react"

import styles from "./Overlay.module.css";

const Overlay = function (props) {
    const {setModal} = props
    const {onClick}= props;
    const clickHandler = function () {
        if(onClick){
            onClick();
        }else{
            setModal("");
        }
    };
    
    return (
        <div onClick={clickHandler} className={styles["overlay"]}>
        </div>
    )
}
export default Overlay