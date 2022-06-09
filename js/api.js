//Constantes de URLS:

const KEY = "89fd8b7dc89bc3bf6bc5e0ec3850a0cb";
const SEARCH = "https://api.openweathermap.org/data/2.5/weather?q=";
const URLVIDEO = "https://www.youtube.com/embed/";
const PREMAPA = "https://www.google.com/maps/embed/v1/view?key=";
const POSTMAPA = "&zoom=10&maptype=satellite";
const KEYMAPA = "AIzaSyCgMMtNcdfKCx8WbnC17MgutZ3AkDsKO0s";

//Constantes del DOM:

const BUSQUEDA = document.getElementById('busqueda');
const BOTON = document.getElementById('buscar');
const RESPUESTA = document.getElementById('respuesta');
const ICONOCLIMA = document.getElementById('icono');
const ULTIMABUSQUEDA =document.getElementById('ult');
const IFRAMEVIDEO = document.getElementById('player');
const IFRAMEMAPA = document.getElementById('mapa');

//Buscar datos de la ultima busqueda al abrir la pagina:

var miultimabusqueda = localStorage.getItem('ultima');

if(miultimabusqueda != undefined){

    mostrarUltima(miultimabusqueda);

}

//Función/fetch que pide los datos a Open Weather y realiza funciones:


BOTON.onclick = function(){
    const valorABuscar = BUSQUEDA.value;
    console.log('Ciudad/Provincia/Pais: ', valorABuscar);
    
    fetch(`${SEARCH}${valorABuscar}&appid=${KEY}&units=metric`)
    .then(function(response){
        
        console.log('Fetch completado exitosamente');
        return response.json();
        
    }).then(function(data){
      
        crearRespuesta(data);
        guardarLocal(data);
        mostrarVideo(data);
        mostrarMapa(data);
        console.log('Datos mostrados exitosamente');
        return data.weather[0].icon;
    }).then(function(icono){
        mostrarIcono(icono);
        console.log('Icono mostrado exitosamente');
        BUSQUEDA.value = '';
    })
    .catch(function(err){
        console.log('Algo salio mal', err);
        mensajeError(err);
    });
}
      
//Función que muestra la respuesta en la pagina:
                       
function crearRespuesta(data){
    let temperatura = '';
    let humedad = '';
    let tempmax = '';
    let tempmin = '';
    let sensacion = '';
    let presion = '';
    let viento = '';
    let nombre = '';

    console.log('Propiedades de la ciudad: ', data);
 
    temperatura += `${data.main.temp}`;
    humedad += `${data.main.humidity}`;
    tempmax += `${data.main.temp_max}`;
    tempmin += `${data.main.temp_min}`;
    sensacion += `${data.main.feels_like}`;
    presion += `${data.main.pressure}`;
    viento += `${data.wind.speed}`;
    nombre += `${data.name}`;

    RESPUESTA.innerHTML = `<h3 class="col-12">${nombre}</h3><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Temperatura actual:<br> ${temperatura}º</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Humedad actual:<br> ${humedad}%</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Máxima para hoy:<br> ${tempmax}º</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Minima para hoy:<br> ${tempmin}º</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Sensación termica:<br> ${sensacion}º</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Presión atmosférica:<br> ${presion}hPa</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Velocidad del viento:<br> ${viento}m/s</p></div>`;
}

//Función que pide la url del icono y creación del mismo:

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

//Función que se realiza solo si lo ingresado es incorrecto:

function mensajeError(fallo){

    RESPUESTA.innerHTML = '<p class="container error">La zona solicitada no existe</p>';
    ICONOCLIMA.src = '';
}

//Función que guarda la busqueda en el localStorage:

function guardarLocal(datos){
    let guardado = '';
    
    localStorage.setItem('ultima', JSON.stringify(datos));
    
    guardado += localStorage.getItem('ultima');
    
    console.log('String guardado: ', guardado)
    mostrarUltima(guardado);
    
}

//Función que muestra en pantalla la ultima busqueda que se realizó

function mostrarUltima(parsear){
    
    ULTIMABUSQUEDA.innerHTML = '';
    
    let ultinfo = '';
    let ulttemperatura = '';
    let ulthumedad = '';
    let ulttempmax = '';
    let ulttempmin = '';
    let ultsensacion = '';
    let ultpresion = '';
    let ultviento = '';
    let ultnombre = '';    
    let ulticono = '';

    ultinfo = JSON.parse(parsear);
    console.log('Informacion guardada: ', ultinfo)
    
    ulttemperatura += `${ultinfo.main.temp}`;
    ulthumedad += `${ultinfo.main.humidity}`;
    ulttempmax += `${ultinfo.main.temp_max}`;
    ulttempmin += `${ultinfo.main.temp_min}`;
    ultsensacion += `${ultinfo.main.feels_like}`;
    ultpresion += `${ultinfo.main.pressure}`;
    ultviento += `${ultinfo.wind.speed}`;
    ultnombre += `${ultinfo.name}`;
    ulticono += `${ultinfo.weather[0].icon}`;   
    
    ULTIMABUSQUEDA.innerHTML = `<h3 class="col-12">Tu ultima busqueda: ${ultnombre}</h3><img class="col-4 offset-4" src="http://openweathermap.org/img/wn/${ulticono}@4x.png"><div class="row"><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Temperatura actual:<br> ${ulttemperatura}º</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Humedad actual:<br> ${ulthumedad}%</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Máxima para hoy:<br> ${ulttempmax}º</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Minima para hoy:<br> ${ulttempmin}º</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Sensación termica:<br> ${ultsensacion}º</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Presión atmosférica:<br> ${ultpresion}hPa</p></div><div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 borde"><p>Velocidad del viento:<br> ${ultviento}m/s</p></div></div>`;
    
    
}

//CAMINO A:
//Función que muestra un video diferente segun el clima:

function mostrarVideo(data){

    let codigo = '';
    let videourl = '';

    codigo = data.weather[0].id;

    if(codigo >= 200 || 531 >= codigo){

        videourl = 'NahYrAGXuvs';

    }if(codigo >= 600 || 622 >= codigo){

        videourl = 'Kz1wHw16GyA';

    }if(codigo >= 701 || 781 >= codigo){

        videourl = 'DBoLieComQw';

    }if(codigo == 800){

        videourl = '2IcdEJ4Jhs0';

    }else{

        videourl = 'IDKU-mZhq8U';

    }

    IFRAMEVIDEO.src = URLVIDEO + videourl + '/?autoplay=1&mute=1';
    IFRAMEVIDEO.style.display = 'block';

}


//CAMINO B:
//Función que muestra un mapa segun la ubicación:

function mostrarMapa(data){
    
    let lat = '';
    let lon = '';
    
    lat = data.coord.lat;
    lon = data.coord.lon;
    
    IFRAMEMAPA.src = `${PREMAPA}${KEYMAPA}&center=${lat},${lon}${POSTMAPA}`;
    IFRAMEMAPA.style.display = 'block';
}
