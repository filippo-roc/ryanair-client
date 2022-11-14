import styles from "./AddBagsItem.module.css";

const AddBagsItem = function (props) {
    const { passengerName } = props
    const { setCheckboxValue } = props;
    const { bagsDispatch } = props;
    const { bagsACTIONS } = props;
    const { index } = props;
    const { input1Name } = props;
    const { input1Description } = props;
    const { input2Name } = props
    const { input2Description } = props;


    const firstBagOnChangeHandler = function (e) {
        setCheckboxValue(e.target.checked);
        bagsDispatch({
            type: bagsACTIONS.SET_BAGS_ATTRIBUTE, value: {
                index: index,
                attribute: {
                    name: input1Name,
                    value: e.target.checked
                }
            }
        })
    }
    const secondBagOnChangeHandler = function (e) {
        bagsDispatch({
            type: bagsACTIONS.SET_BAGS_ATTRIBUTE, value: {
                index: index,
                attribute: {
                    name: input2Name,
                    value: e.target.checked
                }
            }
        })
    }


    return (
        <li className={styles["add-bags-item"]}>
            <div className={`${styles["add-bags-item__passenger"]} ${styles["add-bags-item__child"]}`}>{passengerName}</div>
            <div className={`${styles["add-bags-item__choice"]} ${styles["add-bags-item__child"]}`}>
                {input1Name === "aSmallBag" ?
                    <input onChange={() => { }} className={styles["checkbox-round"]} name={input1Name} type="checkbox" checked />
                    :
                    <input onChange={firstBagOnChangeHandler} className={styles["checkbox-round"]} name={input1Name} type="checkbox" />
                }
                <label forhtml={input1Name}>{input1Description}</label>
            </div>
            <div className={`${styles["add-bags-item__choice"]} ${styles["add-bags-item__child"]}`}>
                <input onChange={secondBagOnChangeHandler} className={styles["checkbox-round"]} name={input2Name} type="checkbox" />
                <label forhtml="prova1">{input2Description}</label>
            </div>
        </li>)
}
export default AddBagsItem;