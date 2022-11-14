import styles from "./AddBags.module.css";
import AddBagsItem from "./AddBagsItem";
import {useState } from "react";

const AddBags = function (props) {
    const {bagsDispatch} = props;
    const {bagsACTIONS} = props;
    const {passengers}= props



    const [, setCheckboxValue ] = useState();
    
   
    return (
        <ul className={styles["add-bags"]}>
            {
                passengers.map((pas,i)=>
                    <AddBagsItem
                    key = {i}
                    index = {i}
                    passengerName={`${pas.firstname} ${pas.lastname}`}
                    input1Description={props.input1Description}
                    input1Name = {props.input1Name}
                    input2Description={props.input2Description}
                    input2Name = {props.input2Name}
                    setCheckboxValue = {setCheckboxValue}
                    bagsDispatch = {bagsDispatch}
                    bagsACTIONS = {bagsACTIONS}

                    />
                )
            }
        </ul> 
    )
}
export default AddBags;