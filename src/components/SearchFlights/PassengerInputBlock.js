import { forwardRef } from "react";

const PassengerInputBlock = forwardRef(({label, defaultValue,adults,name},ref)=> {
    return (
        <div className="search-flights__block search-flights__block--passengers ">
            <label htmlFor={name}  className="search-flights__block__label">{label}</label>
            <input name = {name} ref={ref} min={adults ? 1 : 0} max={8} defaultValue={defaultValue} className={`search-flights__block__input search-flights__block__input--passengers` } type="number" required = {true}/>
        </div>
    )
});
export default PassengerInputBlock