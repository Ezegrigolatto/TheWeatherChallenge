import { GET_WEATHER_INFO, GET_IP, ADD_ARR_CITIES, DELETE_CITIES } from '../types';

const initialState = {
    allInfo: {},
    IPCity: {},
    arrCities:[]
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_WEATHER_INFO:
            return {
                ...state,
                allInfo: action.payload,
            };
            case GET_IP:
                return {
                    ...state,
                    IPCity: action.payload,
                };
            case ADD_ARR_CITIES:
                return {
                    ...state,
                    arrCities: [action.payload, ...state.arrCities],
                }
            case DELETE_CITIES:
                return {
                    ...state,
                    arrCities: state.arrCities.filter(city => city.city.name !== action.payload)
                }
        default:
            return state;
    }
}