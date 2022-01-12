import axios from "axios";
import Swal from 'sweetalert2';
import { GET_IP, GET_WEATHER_INFO, ADD_ARR_CITIES, DELETE_CITIES} from "../types";

export function getIP() {
    return function (dispatch) {
        axios.get(`http://api.ipapi.com/api/check?access_key=${process.env.REACT_APP_IP}`)
        .then(res => {
            dispatch({
                type: GET_IP,
                payload: res.data
            })
        })
    }
}

export function getWeatherInfo(payload){

    return function (dispatch) {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${payload}&units=metric&appid=${process.env.REACT_APP_WEATHER}`)
        .then(res => {
            dispatch({
                type: GET_WEATHER_INFO,
                payload: res.data
            })
        })
        .catch(err => {
            Swal.fire('No se pudo encontrar esa ciudad')
        }
        )
    }
}

export function addArrCities(payload){
    return function (dispatch) {
        dispatch({
            type: ADD_ARR_CITIES,
            payload: payload
        })
    }
}

export function borrarCity(payload){
    return function (dispatch) {
        console.log(payload)
        dispatch({
            type: DELETE_CITIES,
            payload: payload
        })
    }
}