import axios from "axios";
import Swal from 'sweetalert2';
import { GET_IP, GET_WEATHER_INFO, ADD_ARR_CITIES, DELETE_CITIES} from "../types";


//peticion a la IP-api
export function getIP() {
    return function (dispatch) {
        axios.get(`http://api.ipapi.com/api/check?access_key=23e52ad54fa335ec22b83aa298a5cc01`)
        .then(res => {
            dispatch({
                type: GET_IP,
                payload: res.data
            })
        })
    }
}

//peticion a la Weather-api
export function getWeatherInfo(payload){
    return function (dispatch) {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${payload}&units=metric&appid=a816b33fdc5b88024bb62eeed68fa63a`)
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

//agregamos la info de la ciudad al array de ciudades consultadas
export function addArrCities(payload){
    return function (dispatch) {
        dispatch({
            type: ADD_ARR_CITIES,
            payload: payload
        })
    }
}

//quitamos la ciudad del array de ciudades consultadas
export function borrarCity(payload){
    return function (dispatch) {
        dispatch({
            type: DELETE_CITIES,
            payload: payload
        })
    }
}