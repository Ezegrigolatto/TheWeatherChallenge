import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIP, getWeatherInfo, addArrCities } from "../../redux/actions";
import Lupa from "../../assets/lupa.png";
import "./home.css";
import Swal from "sweetalert2";
import Principal from "../cardPrincipal/cardPrincipal";
import Sidecards from "../cardLaterales/cardLaterales";

export default function Home() {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");
  const cantidadCities = useSelector((state) => state.arrCities);
  const cityActual = useSelector((state) => state.allInfo);

  //al cargar la pagina, hacemos un get a la IP-API para obtener la ciudad actual
  useEffect(() => {
    dispatch(getIP());
  }, [dispatch]);

  //funcion que se ejecuta al hacer click en el boton de buscar, 
  //se obtiene la ciudad del estado local y se hace un get a la API de OpenWeather
  const buscarCiudad = (e) => {
    e.preventDefault();
    if (cantidadCities.length < 5) {
      if (city.length !== 0) {
        dispatch(getWeatherInfo(city));
      } else {
        Swal.fire("Ingrese un valor para buscar");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No puedes agregar mas de 5 ciudades",
      });
    }
    setCity("");
  };


// accion de agregar ciudad a la lista de ciudades consultadas

  /*eslint-disable */
  useEffect(() => {
    if (cityActual.city) {
      let arr = cantidadCities.map((e) => {
        return e.city.name;
      });
      if (arr.includes(cityActual.city.name)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Esa ciudad ya está en la lista",
        });
      } else if (cantidadCities.length < 5) {
        dispatch(addArrCities(cityActual));
      }
    }
  }, [cityActual]);
  /*eslint-enable */

  return (
    <div className="home">
      <form className="searchbarContainer" onSubmit={buscarCiudad}>
        <input
          className="searchbar"
          type="text"
          placeholder="Buscar ciudad"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        ></input>
        <button type="submit">
          <img src={Lupa} alt="boton buscar"></img>
        </button>
      </form>

      <div className="cards">
        <Sidecards />
        <Principal />
      </div>
    </div>
  );
}
