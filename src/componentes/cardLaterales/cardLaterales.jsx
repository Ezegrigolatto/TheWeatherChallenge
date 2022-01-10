import "./cardLaterales.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import { borrarCity, getWeatherInfo } from "../../redux/actions";

export default function Sidecards () {

    const arrCities = useSelector(state => state.arrCities);
    const IPCity = useSelector((state) => state.IPCity);
    const dispatch = useDispatch()

    const handleDelete = (e) => {
        if (arrCities.length > 1) {
            console.log(e.target)
        dispatch(borrarCity(e.target.id))
        }else{
            Swal.fire({
                title: 'Estas seguro?',
                text: "La card se reemplazará por tu ubicación actual",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrar.',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(borrarCity(e.target.id));
                    if(arrCities.length === 0){
                    dispatch(getWeatherInfo(IPCity.city));
                    }
                    dispatch(getWeatherInfo(IPCity.city));
                }
              })
        }

    }

    return (
        <div className="sidecards">
            {
           arrCities.map((e)=>{return(
            <div key={e.city.name} className="cardsVerticales">
                {console.log(e.city.name)}
                <div className="botonContainer" >
                <button id={e.city.name} onClick={handleDelete}>x</button>
                </div>
                <h1>{e.city.name}</h1> 
                <h2>{`${Math.round(e.list[0].main.temp)}°C`}</h2>
                <img alt="icon" src={`http://openweathermap.org/img/wn/${e.list[0].weather[0].icon}@2x.png`}></img>
                <hr className="hrsidecard"/>
                </div>
                )})
                }
        </div>
    )
}