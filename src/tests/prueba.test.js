const should = require('should');
const request = require('supertest');
import { GET_IP, GET_WEATHER_INFO } from "../redux/types/index";
import rootReducer from "../redux/reducer/index";

describe("Reducer y algunos types", () => {
    const initialState = {
        allInfo: {},
        IPCity: {},
        arrCities:[]
    };
    it("debe retornar el estado inicial", () => {
        const action = {
            type: "",
            payload: {}
        };
        const newState = rootReducer(undefined, action);
        should(newState).eql(initialState);
        (newState.arrCities).should.have.length(0);
        (newState.allInfo).should.be.empty;
        (newState.IPCity).should.be.empty;
    });
    it("should handle GET_IP", () => {
        
        const action = {
            type: GET_IP,
            payload: {
                ip: "prueba"
            }
        };
        const newState = rootReducer(initialState, action);
        should(newState).eql({
            ...initialState,
            IPCity: action.payload
        });
        should(newState.IPCity.ip).eql("prueba");
    });

    it("debe modificar el objeto allInfo", () => {
       
        const action = {
            type: GET_WEATHER_INFO,
            payload: {
                prueba: "info de la API openWeather"        
            }};
        const newState = rootReducer(initialState, action);
        should(newState).eql({
            ...initialState,
            allInfo: action.payload
        });
        should(newState.allInfo.prueba).eql("info de la API openWeather");
    });
})

describe("Respuestas de las APIS", () => {
    it("debe retornar un status 200", () => {
        return request(`http://api.ipapi.com/api/check?access_key=${process.env.REACT_APP_IP}`)
            .get("/")
            .expect(200);
    });
    it("IP-API debe retornar un objeto", () => {
        return request(`http://api.ipapi.com/api/check?access_key=${process.env.REACT_APP_IP}`)
            .get("/")
            .then(res => {
             res.body.should.be.a.Object();
            });
    })
    it ("El objeto de IP-API debe contener la ubicacion actual", () => {
        return request(`http://api.ipapi.com/`)
            .get("/api/check?access_key=23e52ad54fa335ec22b83aa298a5cc01")
            .then(res => {
                res.body.should.have.property("city").and.be.a.String().and.not.empty();
            })
    })

    it("OpenWeather-API debe retornar un status 401", () => {
        return request(`https://api.openweathermap.org/data/2.5/forecast?q=cualquierciudad&units=metric&appid=notengoapikey`)
            .get("/")
            .expect(401);
    });
});