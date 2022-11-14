import styles from "./Bags.module.css";
import smallBag from "../assets/Small-bag.png";
import bag from "../assets/bag.webp";
import checkInBag10 from "../assets/check-in-bag10.webp";
import checkInBag20 from "../assets/check-in-bag20.webp";
import BagsBlock from "../components/Bags/BagsBlock";

import { useSelector, useDispatch } from "react-redux";

import { useHistory } from "react-router-dom";
import { useEffect, useReducer } from "react";
import bookingACTIONS from "../store/actions/booking";

const bagsACTIONS = {
    PUSH_BAGS: "push-bags",
    SET_BAGS_ATTRIBUTE: "set-bags-attribute"
}

const bagsReducer = function (prevState, action) {
    switch (action.type) {
        case bagsACTIONS.PUSH_BAGS: {
            return [...prevState, action.value]
        }
        case bagsACTIONS.SET_BAGS_ATTRIBUTE: {
            let newState = JSON.parse(JSON.stringify(prevState));
            newState[action.value.index][action.value.attribute.name] = action.value.attribute.value;
            return [...newState];
        }
        default: {
            return prevState;
        }
    }
}

const Bags = function () {
    const history = useHistory();

    const dispatch = useDispatch();

    const [bags, bagsDispatch] = useReducer(bagsReducer, [])

    const passengers = useSelector(state => state.booking.passengers);

    //initial setting
    useEffect(() => {
        passengers.forEach(pas => {
            bagsDispatch({
                type: bagsACTIONS.PUSH_BAGS, value: {
                    aSmallBag: true,
                    twoSmallBag: false,
                    tenKgBaggage: false,
                    twentyKgBaggage: false
                }
            });
        })
        //eslint-disable-next-line
    }, [])


    const clickHandler = async function () {
        dispatch({ type: bookingACTIONS.SET_PASSENGERS__BAGS, value: bags })
        history.push("/home/summary");
    };

    return (
        <main className={styles["bags"]}>
            <BagsBlock
                bagsDispatch={bagsDispatch}
                bagsACTIONS={bagsACTIONS}
                passengers={passengers}
                mainTitle={"vuoi aggiungere bagagli a mano?"}


                input1Name={"aSmallBag"}
                input1Description={"1 sola borsa piccola"}
                input2Name={"twoSmallBag"}
                input2Description={"Aggiungi per 12,50€"}
                styles={styles}

                size1={"40 x 20 x 25 cm"}
                title1={"1 sola borsa piccola"}
                subtitle1={"che deve essere sistemata sotto il sedile"}
                photo1={smallBag}

                size2={"40 x 20 x 25 cm e 55 x 40 x 20 cm"}
                title2={"Priorità e 2 Bagagli a mano"}
                photo2={bag} >
                <div className={styles["card__item"]}>
                    <h2 className={styles[""]}>Bagagli a mano</h2>
                    <h4>Priorità e 2 bagagli a mano</h4>
                    <ul className={styles["cabin-bags__list"]}>
                        <li className={styles["cabin-bags__list__item"]}>
                            <ion-icon class={styles["cabin-bags__list__item__icon"]}  name="checkmark-circle-sharp"></ion-icon>
                            <p>Sii tra i primi passeggeri a salire a bordo</p> </li>
                        <li className={styles["cabin-bags__list__item"]}>
                        <ion-icon class={styles["cabin-bags__list__item__icon"]}  name="checkmark-circle-sharp"></ion-icon>
                            <p>Bagaglio a mano da 10kg e 1 bagaglio piccolo</p></li>
                    </ul>
                    <h4>Solo borsa piccola</h4>
                    <ul className={styles["cabin-bags__list"]}>
                        <li className={styles["cabin-bags__list__item"]}>
                        <ion-icon class={styles["cabin-bags__list__item__icon"]}  name="checkmark-circle-sharp"></ion-icon>
                            <p>Fila standard</p>
                        </li>
                        <li className={styles["cabin-bags__list__item"]} >
                            <ion-icon class={styles["cabin-bags__list__item__icon"]}  name="checkmark-circle-sharp"></ion-icon>
                            <p> Deve entrare nello spazio sotto il sedile</p>
                        </li>
                    </ul>
                </div>
            </BagsBlock>
            <BagsBlock
                bagsDispatch={bagsDispatch}
                bagsACTIONS={bagsACTIONS}
                passengers={passengers}


                input1Name={"tenKgBaggage"}
                input1Description={"Aggiungi per 15,00€"}
                input2Name={"twentyKgBaggage"}
                input2Description={"Aggiungi per 30,00€"}


                mainTitle={"Vuoi aggiungere bagagli per il check-in?"}
                styles={styles}

                size1={"55 x 40 x 20 cm"}
                title1={"Bagaglio di 10 kg"}
                subtitle1={"Un bagaglio per passeggero"}
                photo1={checkInBag10}

                size2={"119 x 119 x 81 cm"}
                title2={"Bagaglio di 20 kg"}
                subtitle2={"Un bagaglio per passeggero"}
                photo2={checkInBag20} >
                <div className={styles["card__item"]}>
                    <h2 className={styles[""]}>Bagagli per il check-in</h2>
                    <p>Lasciali al banco del check-in</p>

                    <ul className={styles["cabin-bags__list"]}>
                        <li className={styles["cabin-bags__list__item"]}>
                            <ion-icon class={styles["cabin-bags__list__item__icon"]}  name="checkmark-circle-sharp"></ion-icon>
                            <p>Imbarco a “mani libere”</p> </li>
                        <li className={styles["cabin-bags__list__item"]}>
                            <ion-icon class={styles["cabin-bags__list__item__icon"]}  name="checkmark-circle-sharp"></ion-icon>
                            <p>Assicurati il miglior prezzo acquistando adesso</p></li>
                    </ul>
                </div>

            </BagsBlock>
            <button
                onClick={clickHandler}
                className={styles["bags__btn"]}>
                Continua
            </button>
        </main>
    )
}
export default Bags;
