import AddBags from "./AddBags";

const BagsBlock = function (props) {
    const { mainTitle } = props;
    const { styles } = props;

    const { size1 } = props;
    const { title1 } = props;
    const { subtitle1 } = props;
    const { photo1 } = props;

    const { size2 } = props;
    const { title2 } = props;
    const { subtitle2 } = props;
    const { photo2 } = props;



    return (
        <div className={styles["cabin-bags"]}>
            <h1 className={styles["cabin-bags__title"]}>{mainTitle}</h1>
            <div className={styles["card-container"]}>
                <div className={styles["card"]}>
                    {props.children}
                    <div className={styles["card__item"]}>
                        <div className={styles["card__item__photo"]} >
                            <img className={styles["card__item__photo__content"]} src={photo1} alt="" />
                        </div>
                        <p>{size1}</p>
                        <h3>{title1}</h3>
                        <p>{subtitle1}</p>
                    </div>

                    <div className={styles["card__item"]} >
                        <div className={styles["card__item__photo"]}>
                            <img className={styles["card__item__photo__content"]} src={photo2} alt="" />
                        </div>
                        <p>{size2}</p>
                        <h3>{title2}</h3>
                        <p>{subtitle2}</p>
                    </div>
                </div>
                <AddBags
                    bagsDispatch={props.bagsDispatch}
                    bagsACTIONS={props.bagsACTIONS}
                    passengers={props.passengers}
                    input1Description={props.input1Description}
                    input1Name={props.input1Name}
                    input2Description={props.input2Description}
                    input2Name={props.input2Name}

                />

            </div>

        </div>
    )
}
export default BagsBlock