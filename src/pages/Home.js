import SearchFlights from "../components/SearchFlights/SearchFlights";
import styles from "./Home.module.css";
const Home = function () {
    return (
        <main className={styles["home"]}>
            <div className={styles["home__block"]}>
                <h1 className={styles["home__block__title"]}>Vola con i migliori,<span className={styles["home__block__title--special-color"]}> vola con Ryanair! </span></h1>
                <div className={styles["home__block__container-form"]}>
                    <SearchFlights />
                </div>
            </div>
            <div className={styles["home__block"]}>
                <svg className={styles["home__block__background-icon"]} xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 292 182"><defs><linearGradient x1="7.457%" x2="58.661%" y1=".683%" y2="88.242%"><stop offset="0%" stopColor="#FFF"></stop><stop offset="100%" stopColor="#FFF" stopOpacity="0"></stop></linearGradient></defs><path fillRule="evenodd" d="M1188.509 24.469c23.74 1.844 43.803 9.83 65.93 15.247 18.438 6.172 37.937 10.913 57.832 13.184l13.865.14.436-.39c8.286.231 14.424-3.427 22.484-5.216.855-.207 2.948-.725 3.827.456.4 1.546-.224 3.22-1.97 4.37-9.875 7.585-21.66 13.227-32.76 17.293v-.225c-3.638.706-7.538 2.27-11.317 3.518-13.683 4.163-29.247 6.762-43.967 5.703-28.18-1.449-52.125-11.565-77.01-10.366-24.425-1.43-47.661 7.937-60.665 26.429-6.666 9.671-11.98 19.879-13.629 31.103.74 10.158 14.945 14.054 20.27 22.466 3.057 5.076 4.586 10.67 6.884 15.947 5.902 10.62 11.749 21.242 19.003 31.243l-.164.213c4.258 6.683 11.02 12.477 19.02 16.403 10.378 7.432 19.543 16.775 24.99 26.8l-.292.158c6.138 9.806 9.571 19.983 14.32 30.208 2.123 6.282 4.477 11.796 6.302 17.901.613.572.613 1.485.983 2.283 1.686 4.833 3.117 9.988 5.161 14.474-.873.688.692.925.498 1.582.109 2.721 2.76 6.805-.765 8.607-5.13-4.54-7.812-11.2-10.583-16.05-6.041-10.597-12.974-20.823-20.434-30.897l.218-.207c-4.591-5.758-9.638-12.27-14.884-18.247-22.06-24.524-54.515-39.26-78.23-62.602l-.218.207c-2.032-1.82-3.324-4.23-4.962-6.294l.189-.225c-2.888-4.066-4.604-8.692-7.406-12.849l.194-.213c-7.345-10.968-14.399-22.618-19.148-34.146-.989-5.107-2.73-9.501-3.118-15.381l-.558-1.93c.304-5.344-12.93-8.454-5.64-18.71 4.567-4.949 22.271-11.047 28.27-20.336.151-1.394.473-3.043-.728-4.29 0-.999-1.031-2.046-1.747-3.075-3.342-4.169-12.41-.87-12.264-7.036.934-.036.055-.852.667-1.211-.521-3.031-.727-5.046.116-7.614 1.825-5.046 3.615-10.871 3.25-15.966.365-1.911 2.281-3.061 4.204-3.804 3.766-.956 7.06-1.455 10.754-1.954l.473.378c8.533-.7 18.778-.067 24.46 6.64 2.451 5.107.529 11.163-.842 16.306-.43 2.958-3.664 5.375-2.918 8.491 1.129 1.15 3.488 1.084 4.98.445 12.895-7.834 24.146-18.73 33.529-29.71 8.649-8.125 21.392-10.937 33.11-9.251zm125.386 67.023c2.525 4.284.09 9.006-1.061 13.101-10.035 28.396-28.822 51.91-43.908 77.784-12.923 21.26-21.361 44.866-29.968 67.948-2.965 6.923-4.038 14.619-7.649 21.206-.295.713-1.223.28-1.85.469-2.23-1.883-1.947-4.594-2.459-6.99 1.712-28.882 12.724-54.987 23.072-81.061 12.947-29.078 30.311-56.846 42.107-86.912 1.645-3.796 4.894-8.433 9.902-9.865 5.021-.762 8.818 1.066 11.814 4.32zm-44.995-.46c3.625 2.767 1.755 7.97.326 11.21-15.796 35.255-41.38 65.641-51.965 102.617-2.925 7.835-4.831 15.944-7.256 23.84-.416 1.428-2.49 1.47-3.95 1.112-1.405-3.349-1.001-7.604-1.001-11.233 3.341-29.712 10.38-58.572 24.782-84.424 6.55-12.923 12.883-24.545 19.746-37.158 1.93-3.568 5.187-6.796 9.91-7.963 3.48-.213 6.815.62 9.408 2zm-40.234-1.765c1.767 7.907-3.938 14.386-6.467 21.465-13.517 26.798-29.75 53.001-37.773 81.63-.381.919-.907 2.137-1.978 2.552-1.15.312-2.118-.264-2.414-1.063-2.705-11.378.423-23.219 3.364-34.045 7.702-24.035 17.025-48.63 30.064-70.996 1.512-1.14 1.742-2.113 3.63-2.642 4.526-.462 9.064-.138 11.574 3.099zm-41.138-7.158c2.009.432 3.788 1.13 5.258 2.595 3.34 4.466-1.131 8.386-2.463 12.317-13.894 20.952-18.753 44.705-27.97 67.146-.701.784-2.07 1.009-3.05.699-2.456-1.75-2.456-4.667-2.184-7.207 1.864-24.336 8.266-47.184 18.584-68.938 2.415-3.482 6.53-7.432 11.825-6.612z" opacity=".1" transform="translate(-1061 -24)"></path></svg>
                <ion-icon class={styles["home__block__icon"]} name="airplane"></ion-icon>
                <h2 className={styles["home__block__title-2"]}>Perché dovrei volare con <span className={styles["home__block__title-2--special-color"]}> Ryanair? </span></h2>
                <ul className={styles["home__block__list"]}>
                    <li className={styles["home__block__list__item"]}>Economica</li>
                    <li className={styles["home__block__list__item"]}>Veloce</li>
                    <li className={styles["home__block__list__item"]}>Sicura</li>
                </ul>
            </div>

        </main>
    )
}
export default Home;