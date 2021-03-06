const btn = document.querySelector('#micro');
const respuesta = document.querySelector('.content-respuesta');
const preguntas = document.querySelector('.content-pregunta');
const contenedorRespuesta = document.querySelector('.respuesta');
const contenedorPregunta = document.querySelector('.pregunta');
const imagenes = document.querySelector('.imagenes');

const afirmacion = ["Voy!", "Enseguida!", "Claro!", "Por Supuesto!"];
const cosas = ["Pedro de la Rosa mantiene todavía la vuelta rápida en carrera de la Fórmula 1 en el circuito de Bahréin", "El cometa Halley, es un cometa grande y brillante que orbita alrededor del Sol cada 75 años en promedio", "Los elefantes son capaces de localizar agua y de detectar lluvias a distancias de aproximadamente 250 km", " Las jirafas no emiten sonido alguno convirtiéndose de esta manera en el único mamífero con esta característica", "Se necesitan 200 litros de agua para producir un solo litro de gaseosa "];
const estado = ["Bien, y tú?", "Podría estar en la piscina, pero estoy aquí", "Nada mal", "Molt bé", "He tenido días peores", "He tenido días mejores"];
const comandoError = ["Eso no era un comando que yo conozca, prueba de nuevo", "No te he entendido, vuelve a intentarlo"];
const hola = ["Hola", "Hello", "Ciao", "Bon día"];
const joda = ['Coña?', 'Despiértame de esta vida gitana que llevo', 'A mí me están filmando', 'Y Carlangas se ha hecho un porro, buenas tardes'];

//Lottie animations
const svgContainer = document.getElementById('micro');
const svgCpipo = document.getElementById('svg-pipo');
const question = document.getElementById('question');
const loading = document.getElementById('loading-animation');
const spotifyAnim = document.getElementById('spot-animation');

const micro1 = bodymovin.loadAnimation({
    wrapper: svgContainer,
    animType: 'svg',
    loop: false,
    autoplay: false,
    path: "json/micro.json"
});
const animPipo = bodymovin.loadAnimation({
    wrapper: svgCpipo,
    animType: 'svg',
    loop: false,
    autoplay: false,
    path: 'json/pipo-hablando.json'
});
const animQuestion = bodymovin.loadAnimation({
    wrapper: question,
    animType: 'svg',
    loop: false,
    autoplay: false,
    path: 'json/question.json'
});
const animLoading = bodymovin.loadAnimation({
    wrapper: loading,
    animType: 'svg',
    loop: false,
    autoplay: true,
    path: 'json/loading.json'
});
const spotifyAnimation = bodymovin.loadAnimation({
    wrapper: spotifyAnim,
    animType: 'svg',
    loop: true,
    autoplay: true,
    path: 'json/spotify.json'
});

function loadingAnimation() {
    animLoading.setDirection(1);
    animLoading.goToAndPlay(0, true);
}

function spotifyLottie() {
    spotifyAnimation.setDirection(1);
    spotifyAnimation.goToAndPlay(0, true);
}

//listener 
function hablaPipo() {
    svgCpipo.classList.remove('hide');
    contenedorRespuesta.classList.remove('hide');
    animPipo.setDirection(1);
    animPipo.goToAndPlay(0, true);
    animPipo.addEventListener('complete', () => {
        animPipo.setDirection(-1);
        animPipo.goToAndPlay(0, false);
    })
}

function preguntaTexto() {
    question.classList.remove('hide');
    contenedorPregunta.classList.remove('hide');
    animQuestion.setDirection(1);
    animQuestion.goToAndPlay(0, true);
    animQuestion.addEventListener('complete', () => {
        animQuestion.setDirection(-1);
        animQuestion.goToAndPlay(0, false);
    })
}

//Acordeón
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
    const itemToggle = this.getAttribute('aria-expanded');

    for (i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false');
    }
    if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
    }
}
items.forEach(item => item.addEventListener('click', toggleAccordion));

//Pop-Up
const items2 = document.querySelectorAll(".pop-up button");

function togglePopup() {
    const itemToggle = this.getAttribute('aria-expanded');

    for (i = 0; i < items2.length; i++) {
        items2[i].setAttribute('aria-expanded', 'false');
    }
    if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
    }
}
items2.forEach(item => item.addEventListener('click', togglePopup));

//FECHA GYM
var fechaInicio = new Date('2022-05-16').getTime();

//Reconocimiento de voz
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
micro1.setSpeed(1.5);
var activo = 0; // botón activo 
btn.addEventListener('click', () => {
    if (activo === 0) {
        recognition.start();
        recognition.lang = 'es-ES';
        activo = 1;
    } else {
        recognition.stop();
        console.log('Speech recognition has stopped.');
        micro1.setDirection(-1);
        micro1.goToAndPlay(100, true);
        activo = 0;
    }
});

recognition.onstart = function() {
    console.log('voice is activated');
    micro1.setDirection(1);
    micro1.goToAndPlay(0, true);
    setTimeout(function() {
        if (activo === 1) {
            recognition.stop();
            console.log('Speech recognition has stopped.');
            micro1.setDirection(-1);
            micro1.goToAndPlay(100, true);
            activo = 0;
        }
    }, 5000)
};

//Resultado del reconocimineto
recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    const busqueda = transcript.substring(15); //busqueda google
    const busquedaYT = transcript.substring(16); //busqueda YT
    const pregunta = transcript.substring(6); // pregunta 
    const busquedaSpotify = transcript.substring(17); //busqueda SPOTIFY
    recognition.stop();
    console.log('Speech recognition has stopped.');
    micro1.setDirection(-1);
    micro1.goToAndPlay(100, true);
    activo = 0;
    readOutLoud(transcript, busqueda, pregunta, busquedaYT, busquedaSpotify);
};

//Interpretación del comando
function readOutLoud(message, busqueda, pregunta, busquedaYT, busquedaSpotify) {
    const speech = new SpeechSynthesisUtterance();
    const noEntiendo = comandoError[Math.floor(Math.random() * comandoError.length)]
    speech.text = noEntiendo;
    respuesta.textContent = noEntiendo;
    preguntas.textContent = message;

    if (message.toLowerCase().includes('busca en google')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;
        respuesta.textContent = finalText;

        window.open('http://google.com/search?q=' + busqueda, "_blank");
    }
    if (message.toLowerCase().includes('busca en youtube')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;
        respuesta.textContent = finalText;

        window.open('https://www.youtube.com/results?search_query=' + busquedaYT, "_blank");
    }
    if (message.toLowerCase().includes('busca en spotify')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;
        respuesta.textContent = finalText;
        window.open('https://open.spotify.com/search/' + busquedaSpotify, "_blank");
    }
    if (message.toLowerCase().includes('qué es')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;

        window.open('http://google.com/search?q=' + message, "_blank");
    }
    if (message.toLowerCase().includes('quién es')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;

        window.open('http://google.com/search?q=' + message, "_blank");
    }
    if (message.toLowerCase().includes('pon en youtube')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;
        respuesta.textContent = finalText;

        playYoutube(busqueda);
    }
    if (message.toLowerCase().includes('activa spotify')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;
        respuesta.textContent = finalText;

        // If there is no token, redirect to Spotify authorization
        if (!_token) {
            window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
        }
        playSpotify();
    }
    if (message.toLowerCase().includes('desactiva spotify')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;
        respuesta.textContent = finalText;
        player.pause();
    }
    if (message.toLowerCase().includes('cuéntame cosas') || message.toLowerCase().includes('cuéntame algo')) {
        const finalText = "Sabías qué  " + cosas[Math.floor(Math.random() * cosas.length)];
        speech.text = finalText;
        respuesta.textContent = finalText;
    }
    if (message.toLowerCase().includes('qué tal') || message.toLowerCase().includes('cómo estás') || message.toLowerCase().includes('cómo te encuentras')) {
        const finalText = estado[Math.floor(Math.random() * estado.length)];
        speech.text = finalText;
        respuesta.textContent = finalText;

    }
    if (message.toLowerCase().includes('qué día es') || message.toLowerCase().includes('a qué día estamos')) {
        var dia = document.getElementById("day").innerHTML;
        const finalText = "Hoy es: " + dia;
        respuesta.textContent = finalText;
        speech.text = "Hoy es" + dia;;
    }
    if (message.toLowerCase().includes('qué día es hoy')) {
        var mL = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var dia = document.getElementById("day").innerHTML;
        var diaN = document.getElementById("fecha").innerHTML.slice(0, 2);
        if (diaN < 10) {
            diaN = diaN.slice(1, 2)
        }
        var mesN = document.getElementById("fecha").innerHTML.slice(3, 5);
        const finalText = "Hoy es " + dia + " " + diaN + " de " + mL[parseInt(mesN) - 1];
        respuesta.textContent = finalText;
        speech.text = "Hoy es" + dia + diaN + "de" + mL[parseInt(mesN) - 1];
    }

    if (message.toLowerCase().includes('días de ruina')) {
        
      
        var fechaFin    = new Date().getTime();
        
        var diff = fechaFin - fechaInicio;
        console.log( fechaFin+ " " +fechaInicio);
        var dias = diff/(1000*60*60*24) ;
                         // (1000*60*60*24) --> milisegundos -> segundos -> minutos -> horas -> días

        const finalText = `Lleva ${Math.round(dias)} días haciendo X cosas`;
        respuesta.textContent = finalText;
        speech.text = finalText;
    }

    if (message.toLowerCase().includes('serrano ha ido al gimnasio')) {
        


        const finalText = joda[Math.floor(Math.random() * joda.length)];
        respuesta.textContent = finalText;
        speech.text = finalText;
    }


    if (message.toLowerCase().includes("tiempo")) {
        var grados = document.getElementById("temp-main").innerHTML;
        var condition = document.getElementById("condition").innerHTML;
        var condicion = "";
        if (condition.toLowerCase().includes("despejado") || condition.toLowerCase().includes("nublado")) {
            condicion = "está " + condition;
        } else {
            condicion = " " + condition;
        }
        const finalText = "Ahora mismo hay " + grados + " y " + condicion;
        speech.text = finalText;
        respuesta.textContent = finalText;
    }
    if (message.toLowerCase().includes("quién eres")) {
        const finalText = "Soy PIPO, tu asistente virtual";
        speech.text = finalText;
        respuesta.textContent = finalText;
    }
    if (message.toLowerCase().includes("qué pasa")) {
        const finalText = "Un gato por tu casa";
        speech.text = finalText;
        respuesta.textContent = finalText;
    }
    if (message.toLowerCase().includes("hora")) {
        var today = new Date();
        var hora = today.getHours() + " horas y " + today.getMinutes() + " minutos";
        if (parseInt(today.getMinutes()) == 0) {
            hora = today.getHours() + " en punto";
        }
        speech.text = "Son las" + hora;
        respuesta.textContent = "Son las: " + hora;
    }
    if (message.toLowerCase().includes("hola")) {
        const finalText = hola[Math.floor(Math.random() * hola.length)];
        speech.text = finalText;
        respuesta.textContent = finalText;
    }
    if (message.toLowerCase().includes("adiós")) {
        const finalText = "Que vaya bien, hasta luego";
        speech.text = finalText;
        respuesta.textContent = finalText;
    }
    preguntaTexto();
    hablaPipo();
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
};
// Funciones 
function playYoutube(search) { //Función para reproducir video de YT
    let API_KEY = "AIzaSyCcc1lUDBSJdSnzmJFLseJ_PIuOzCnJkmk";
    let baseURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${search}&key=${API_KEY}`;
    $.get(baseURL, function(data) {
        console.log(data);
        var url;
        data.items.forEach(item => {
            if (item.id.videoId !== undefined) {
                if (url == undefined) {
                    url = "https://www.youtube.com/watch?v=" + item.id.videoId;
                    window.open(url, "_blank");
                }
            } else {}
        });
    });
}

// obtener token pasado por enlace
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';
_token = hash.access_token;
console.log(_token);

// Asignar token
const authEndpoint = 'https://accounts.spotify.com/authorize';

// Datos para la API de Spotify 
const clientId = '5967f5e598b94ca09b4c5fd41c142cce';
const redirectUri = 'https://pipo-asistente.netlify.app/';
const scopes = [
    'streaming',
    'user-read-private',
    'user-modify-playback-state'
];
let player = null;

function playSpotify() { //Función para reproductor de Spotify
    window.onSpotifyWebPlaybackSDKReady = () => {
        player = new Spotify.Player({
            name: 'PIPO',
            getOAuthToken: cb => { cb(_token); }
        });
        const title = document.getElementById('title');
        const artist = document.getElementById('artist');
        const album = document.getElementById('album');

        if (player != null) {
            player.addListener('player_state_changed', ({
                track_window: { current_track }
            }) => {
                console.log('Currently Playing', current_track);
                var artistas = "";
                var fotoAlbum = "";
                current_track.artists.forEach(element => {
                    artistas += element.name + ", ";
                });
                current_track.album.images.forEach(element => {

                    fotoAlbum = element.url;
                });
                title.textContent = current_track.name;
                artist.textContent = artistas.slice(0, -2);
                album.src = fotoAlbum;
                album.style.height = "100%";
                album.style.opacity = "0.3";
                album.style.objectFit = "cover";
                album.style.borderRadius = "2rem";
                recuadroV();
            });
            // Listo
            player.addListener('ready', ({ device_id }) => {
                console.log('ID del reproductor', device_id);
                recuadroV();
            });
            // No está listo
            player.addListener('not_ready', ({ device_id }) => {
                console.log('El reproductor no está disponible', device_id);
            });
            //Posibles errores
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });
            // Conectar el reproductor
            player.connect();
        }
    };
}

function recuadroV() {
    const recuadro = document.querySelector('.pop-up-container');
    recuadro.style.display = "flex";
}

function recuadroH() {
    const recuadro = document.querySelector('.pop-up-container');
    recuadro.style.display = "none";

}