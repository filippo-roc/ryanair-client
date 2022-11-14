import styles from "./Spinner.module.css";
import React from "react"
const Spinner = function(props){

    return(
        <React.Fragment>
        <div className={`${styles["loader"]} ${props.className}`}></div> 
        <div className={`${styles["reverse-loader"]} ${props.className}`}></div> 
        </React.Fragment>
    )
}
export default Spinner;