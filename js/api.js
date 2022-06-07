const KEY = "89fd8b7dc89bc3bf6bc5e0ec3850a0cb";
const SEARCH = "https://api.openweathermap.org/data/2.5/weather?q=";

const BUSQUEDA = document.getElementById('busqueda');
const BOTON = document.getElementById('buscar');
const RESPUESTA = document.getElementById('respuesta');
const ICONOCLIMA = document.getElementById('icono');

BOTON.onclick = function(){
    const valorABuscar = BUSQUEDA.value;
    console.log('Ciudad/Provincia/Pais: ', valorABuscar);
    
    fetch(`${SEARCH}${valorABuscar}&appid=${KEY}&units=metric`)
    .then(function(response){
        
        console.log('Fetch completado exitosamente');
        return response.json();
        
    }).then(function(data){
      
        crearRespuesta(data);
        console.log('Datos mostrados exitosamente');

        return data.weather[0].icon;
    }).then(function(icono){
        mostrarIcono(icono);
        console.log('Icono mostrado exitosamente');
    })
    .catch(function(err){
        console.log('Algo salio mal', err);
    });
}
                       
                       
function crearRespuesta(data){
    let temperatura = '';
    let humedad = '';
    let tempmax = '';
    let tempmin = '';
    let sensacion = '';
    let presion = '';
    let viento = '';

    console.log('Propiedades de la ciudad: ', data);

        
        temperatura += `${data.main.temp}`;
        humedad += `${data.main.humidity}`;
        tempmax += `${data.main.temp_max}`;
        tempmin += `${data.main.temp_min}`;
        sensacion += `${data.main.feels_like}`;
        presion += `${data.main.pressure}`;
        viento += `${data.wind.speed}`;

    RESPUESTA.innerHTML = `<ul><li>Temperatura actual: ${temperatura}º</li><li>Humedad actual: ${humedad}%</li><li>Maxima para hoy: ${tempmax}º</li><li>Minima para hoy: ${tempmin}º</li><li>Sensacion termica: ${sensacion}º</li><li>Presion atmosferica: ${presion}</li><li>Velocidad del viento: ${viento}</li></ul>`;
}

function mostrarIcono(icono){

    fetch(`http://openweathermap.org/img/wn/${icono}@4x.png`)
    .then(function(response){

        console.log('Informacion de la url del icono: ', response);
        return response.url;
    }).then(function(url){

        let iconoamostrar = '';
        iconoamostrar += `${url}`;
        ICONOCLIMA.src = iconoamostrar;

    }).catch(function(err){
        console.log('Algo salio mal', err);
    });

}