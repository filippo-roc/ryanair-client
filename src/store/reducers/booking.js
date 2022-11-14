import ACTIONS from "../actions/booking";

const prevBooking = JSON.parse(localStorage.getItem('booking'));

const initaliState = {
    departureFlight: prevBooking?.departureFlight || "",
    returnFlight: prevBooking?.returnFlight || "",
    passengers: prevBooking?.passengers || [],
};

const bookingReducer = function (prevState = initaliState, action) {
    switch (action.type) {
        case ACTIONS.SET_DEPARTURE_FLIGHT: {
            const newState = {
                ...prevState,
                departureFlight: action.value
            };
            // save the booking state on the local storage
            localStorage.setItem('booking', JSON.stringify( newState ) );
            return newState;
        }

        case ACTIONS.SET_RETURN_FLIGHT: {
            const newState = {
                ...prevState,
                returnFlight: action.value
            };
            localStorage.setItem('booking', JSON.stringify( newState ) );

            return newState;
        }

        case ACTIONS.SET_PASSENGERS: {
            const newState = {
                ...prevState,
                passengers: action.value
            }
            // save the booking state on the local storage
            localStorage.setItem('booking', JSON.stringify( newState ) );
            return newState;
        }
        case ACTIONS.SET_PASSENGERS__BAGS: {
            const newState = {
                ...prevState,
                passengers: [
                    ...prevState.passengers.map((pas, i) => {
                        return {
                            ...pas,
                            bags: action.value[i]
                        }
                    })
                ]
            }
            localStorage.setItem('booking', JSON.stringify(newState ) );
            return newState;
        }
        case ACTIONS.SET_BOOKING: {
            const prevBooking = action.value
            return { ...prevBooking }
        }
        default: {
            return prevState
        }
    }
}

export default bookingReducer;