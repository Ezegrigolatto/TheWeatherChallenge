import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherInfo } from "../../redux/actions";
import { WiBarometer, WiStrongWind, WiHumidity } from "react-icons/wi";
import "./cardPrincipal.css";

export default function Principal() {
  const IPCity = useSelector((state) => state.IPCity);
  const weatherInfo = useSelector((state) => state.allInfo);
  const info = useSelector((state) => state.arrCities);
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  //calculamos la hora para cada ciudad que busquemos
  const fecha = new Date();
  const fechaUTC = new Date(
    fecha.getUTCFullYear(),
    fecha.getUTCMonth(),
    fecha.getUTCDate(),
    fecha.getUTCHours(),
    fecha.getUTCMinutes()
  );
  const horaActual = new Date(
    fechaUTC.getTime() +  info[0]?.city.timezone * 1000
  );
  
  const horas = horaActual.getHours().toString().padStart(2, "0");
  const minutos = horaActual.getMinutes().toString().padStart(2, "0");
  
  /////////////////////////////////////////////////////////////////////////

  //seteamos la ciudad capturada por IP como card principal
 /*eslint-disable */
  useEffect(() => {
    setCity(IPCity);
  }, [IPCity]);

  useEffect(() => {
    if (city) {
      dispatch(getWeatherInfo(city.city));
    }
  }, [city.city]);
  /*eslint-enable */

  //funcion para mostrar las 5 instancias del clima por hora
  const perHours = () => {
    let porHoras = [];
    for (let x = 0; x < 5; x++) {
      porHoras.push(info[0].list[x]);
    }
    return (
      <div className="horas">
        {porHoras.map((e) => (
          <div key={e.dt_txt} className="elementos">
            <h3>{e.dt_txt.slice(11, 16)}</h3>
            <h1>{Math.round(e.main.temp)}°C</h1>
            <img 
              alt="icon"
              src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`}
            ></img>
          </div>
        ))}
      </div>
    );
  };


  //funcion para mostrar las 5 instancias del clima por dia.
  //sabemos que la api trae informacion cada 3 horas, y sabemos que el dia dura 24 horas, 
  //entonces 24/3 = 8, 
  //tambien sabemos que la api devuelve un array con 40 posiciones, una cada 3 horas por 5 dias.
  //es por eso que hacemos un for y en cada parametro de igualdad vamos saltando de 8 en 8.
  //recorremos todo el array, pusheamos en uno de los 5 arrays creados (uno por dia) y luego
  //le hacemos un sort, esto es para capturar la temperatura maxima y minima de cada dia.
  //finalmente devolvemos el elemento jsx que queremos mostrar en el componente.
  const perDays = () => {
    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];
    let arr5 = [];

    for (let x = 0; x < weatherInfo.list.length; x++) {
      if (
        weatherInfo.list[x].dt_txt.slice(0, 10) ===
        weatherInfo.list[0].dt_txt.slice(0, 10)
      ) {
        arr1.push(weatherInfo.list[x]);
      }
      if (
        weatherInfo.list[x].dt_txt.slice(0, 10) ===
        weatherInfo.list[8].dt_txt.slice(0, 10)
      ) {
        arr2.push(weatherInfo.list[x]);
      }
      if (
        weatherInfo.list[x].dt_txt.slice(0, 10) ===
        weatherInfo.list[16].dt_txt.slice(0, 10)
      ) {
        arr3.push(weatherInfo.list[x]);
      }
      if (
        weatherInfo.list[x].dt_txt.slice(0, 10) ===
        weatherInfo.list[24].dt_txt.slice(0, 10)
      ) {
        arr4.push(weatherInfo.list[x]);
      }
      if (
        weatherInfo.list[x].dt_txt.slice(0, 10) ===
        weatherInfo.list[32].dt_txt.slice(0, 10)
      ) {
        arr5.push(weatherInfo.list[x]);
      }
    }
    let arr1sort = arr1.sort(function (a, b) {
      if (a.main.temp > b.main.temp) {
        return -1;
      }
      if (a.main.temp < b.main.temp) {
        return 1;
      }
      return 0;
    });
    let arr2sort = arr2.sort(function (a, b) {
      if (a.main.temp > b.main.temp) {
        return -1;
      }
      if (a.main.temp < b.main.temp) {
        return 1;
      }
      return 0;
    });
    let arr3sort = arr3.sort(function (a, b) {
      if (a.main.temp > b.main.temp) {
        return -1;
      }
      if (a.main.temp < b.main.temp) {
        return 1;
      }
      return 0;
    });
    let arr4sort = arr4.sort(function (a, b) {
      if (a.main.temp > b.main.temp) {
        return -1;
      }
      if (a.main.temp < b.main.temp) {
        return 1;
      }
      return 0;
    });
    let arr5sort = arr5.sort(function (a, b) {
      if (a.main.temp > b.main.temp) {
        return -1;
      }
      if (a.main.temp < b.main.temp) {
        return 1;
      }
      return 0;
    });
    return (
      <div className="horas">
        <div className="elementos">
          <h3>{`Resto del dia`}</h3>
          <div className="maxmin">
            {" "}
            MAX/MIN
            <h3>{Math.round(arr1sort[0].main.temp)}°C</h3>
            <hr />
            <h3>{Math.round(arr1sort[arr1sort.length - 1].main.temp)}°C</h3>
          </div>
          <img alt="icon" src={`http://openweathermap.org/img/wn/${arr1sort[Math.round((arr1sort.length-1)/2)].weather[0].icon}@2x.png`}></img>
        </div>
        <div className="elementos">
          <h3>{`${arr2sort[0].dt_txt.slice(8, 10)}-${arr2sort[0].dt_txt.slice(
            5,
            7
          )}`}</h3>
          <div className="maxmin">
            {" "}
            MAX/MIN
            <h3>{Math.round(arr2sort[0].main.temp)}°C</h3>
            <hr />
            <h3>{Math.round(arr2sort[arr2sort.length - 1].main.temp)}°C</h3>
          </div>
          <img alt="icon" src={`http://openweathermap.org/img/wn/${arr2sort[Math.round((arr2sort.length-1)/2)].weather[0].icon}@2x.png`}></img>
        </div>
        <div className="elementos">
          <h3>{`${arr3sort[0].dt_txt.slice(8, 10)}-${arr3sort[0].dt_txt.slice(
            5,
            7
          )}`}</h3>
          <div className="maxmin">
            {" "}
            MAX/MIN
            <h3>{Math.round(arr3sort[0].main.temp)}°C</h3>
            <hr />
            <h3>{Math.round(arr3sort[arr3sort.length - 1].main.temp)}°C</h3>
          </div>
          <img alt="icon" src={`http://openweathermap.org/img/wn/${arr3sort[Math.round((arr3sort.length-1)/2)].weather[0].icon}@2x.png`}></img>
        </div>
        <div className="elementos">
          <h3>{`${arr4sort[0].dt_txt.slice(8, 10)}-${arr4sort[0].dt_txt.slice(
            5,
            7
          )}`}</h3>
          <div className="maxmin">
            {" "}
            MAX/MIN
            <h3>{Math.round(arr4sort[0].main.temp)}°C</h3>
            <hr />
            <h3>{Math.round(arr4sort[arr4sort.length - 1].main.temp)}°C</h3>
          </div>
          <img alt="icon" src={`http://openweathermap.org/img/wn/${arr4sort[Math.round((arr4sort.length-1)/2)].weather[0].icon}@2x.png`}></img>
        </div>
        <div className="elementos">
          <h3>{`${arr5sort[0].dt_txt.slice(8, 10)}-${arr5sort[0].dt_txt.slice(
            5,
            7
          )}`}</h3>
          <div className="maxmin">
            {" "}
            MAX/MIN
            <h3>{Math.round(arr5sort[0].main.temp)}°C</h3>
            <hr />
            <h3>{Math.round(arr5sort[arr5sort.length - 1].main.temp)}°C</h3>
          </div>
          <img alt="icon" src={`http://openweathermap.org/img/wn/${arr5sort[Math.round((arr5sort.length-1)/2)].weather[0].icon}@2x.png`}></img>
        </div>
      </div>
    );
  };

  return (
    <div className="principal">
      {info[0]?.list[0]?.weather[0]?.icon ? (
        <>
          <div className="principalCard">
            <h2 className="title">{`${info[0].city.name}: ${horas}:${minutos} hs`}</h2>
            <div className="datos">
              <div className="izq">
                <h2 className="tempPrincipal">
                  {Math.round(info[0].list[0].main.temp)}°C
                </h2>
                <img
                  alt="icon"
                  className="iconPrincipal"
                  src={`http://openweathermap.org/img/wn/${info[0].list[0].weather[0].icon}@2x.png`}
                ></img>
              </div>
              <div className="der">
                <div>
                  <WiHumidity className="principalIdentificador" />
                  <h3>{`${Math.round(info[0].list[0].main.humidity)} %`}</h3>
                </div>
                <div>
                  <WiBarometer className="principalIdentificador" />
                  <h3>{`${Math.round(info[0].list[0].main.pressure)} hPa`}</h3>
                </div>
                <div>
                  <WiStrongWind className="principalIdentificador" />
                  <h3>{`${Math.round(info[0].list[0].wind.speed)} m/s`}</h3>
                </div>
              </div>
            </div>
          </div>
          <h1 className="titles">Pronóstico por hora</h1>
          <div className="perHourCard">
            {info[0] ? perHours() : <p></p>}</div>

          <h1 className="titles">Pronóstico por día</h1>
          <div className="perDayCard">{info[0] ? perDays() : <p></p>}</div>
        </>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}
