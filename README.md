# The weather challenge

Este proyecto ha sido desarrollado como un challenge solicitado por una empresa para medir conocimientos en el Front-end.

En la aplicación podremos realizar búsquedas de ciudades y se nos devolverá información del clima de dicha ciudad para hoy, para las próximas horas y para los próximos 5 dias.

De momento las ApiKeys estan públicas para que puedan descargarlo y probarlo inmediatamente.

Se utilizó react (componentes funcionales y hooks), redux, redux thunk, mocha, should.js, 
SweetAlert, React-Icons, entre otras dependencias; así como las apis de OpenWeather e IP API.

Para probarlo debes clonar el repositorio, abrirlo con tu editor de codigo, ejecutar npm install y luego iniciarlo con npm start.

Para ejecutar los tests, desde el directorio raiz del proyecto, ejecutar npm test.

## Funcionalidades

- Búsqueda de información automática al cargar la página por primera vez y/o al quedar vacía la lista de ciudades consultadas.

- Posibilidad de buscar información hasta para 5 ciudades.

- Diseño responsivo y adaptable para muchos dispositivos.

- Alertas en pantalla cada vez que no podamos realizar alguna acción (campo de búsqueda vacío, ciudad no encontrada, máximo de ciudades ya alcanzado o al eliminar la ultima ciudad de la lista).

- Hora en tiempo real: Al realizar la búsqueda de cada ciudad en particular, el horario mostrado en pantalla se ajusta a la hora de dicha ciudad.

- Spinner de carga: Hasta que la información se muestre en pantalla, se mostrará un spinner a modo de pantalla de espera.

- Testing del reducer: se testeó el estado inicial y se testearon 2 action-types.
- Testing de las peticiones a las URLs: se testeó el contenido de la respuesta.



## Anotaciones del desarrollador

Aprovecho cada proyecto que voy desarrollando para que sea una instancia de aprendizaje nueva, antes de este proyecto por ejemplo nunca había desarrollado testing, fue todo un desafío aprenderlo a contrarreloj pero con 1 día que me dediqué a investigar pude aprender a configurar mocha, supertest y should.js(que no hay mucha documentacion y/o información).
Si bien no llegué a desarrollar tests de integración o a testear cada una de las actions en sí, creo que logré aprender algo nuevo y eso personalmente es lo positivo que me llevo.

Lo mismo me sucedió con redux-saga, siempre he utilizado el middleware redux-thunk, que de hecho lo apliqué a este proyecto tambien, pero me permití investigarlo y en solo un par de horas ya logré conectar mi proyecto con la API.


