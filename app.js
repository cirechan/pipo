const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const imagenes = document.querySelector('.imagenes');


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

const afirmacion = ["Voy!", "Enseguida!", "Claro!", "Por Supuesto!"];
const datas = ["Voy!", "Enseguida!", "Claro!", "Por Supuesto!"];
const estado = ["Lista pa la guerra ya tu sabe", "Podría estar jugando al LoL", "Podría estar jugando al Ruina", "Chilling", "Le acabo de desear a mi jungla que se tire de un cuarto piso", "Aquí en el gymnasio"];



//listener

btn.addEventListener('click', function() {
    recognition.start();
    recognition.lang = 'es-ES';

});


function glow() {
    var glower = document.getElementById('glow');

    glower.classList.toggle("active");
}


recognition.onstart = function() {
    console.log('voice is activated');
    glow();

    setTimeout(function() {

        glow();
        recognition.stop();
        console.log('Speech recognition has stopped.');
    }, 3000);

};



recognition.onresult = function(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    content.textContent = "Creo que has dicho: " + transcript;
    content.style.margin = "1rem";
    const busqueda = transcript.substring(15); //busqueda google
    const busquedaYT = transcript.substring(16); //busqueda YT
    const pregunta = transcript.substring(6); // pregunta
    readOutLoud(transcript, busqueda, pregunta, busquedaYT);
    console.log(busqueda);
    glow();

};


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

            } else {


            }

        });

    });
}
/*
// Get the hash of the url
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

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '2102d6bf57714410a8f50dd1ccadc571';
const redirectUri = 'https://spotify-web-playback.glitch.me';
const scopes = [
    'streaming',
    'user-read-birthdate',
    'user-read-private',
    'user-modify-playback-state'
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

// Set up the Web Playback SDK

window.onSpotifyPlayerAPIReady = () => {
    const player = new Spotify.Player({
        name: 'PIPO',
        getOAuthToken: cb => { cb(_token); }
    });

    // Error handling
    player.on('initialization_error', e => console.error(e));
    player.on('authentication_error', e => console.error(e));
    player.on('account_error', e => console.error(e));
    player.on('playback_error', e => console.error(e));

    // Playback status updates
    player.on('player_state_changed', state => {
        console.log(state)
        $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
        $('#current-track-name').text(state.track_window.current_track.name);
    });

    // Ready
    player.on('ready', data => {
        console.log('Ready with Device ID', data.device_id);

        // Play a track using our new device ID
        play(data.device_id);
    });

    // Connect to the player!
    player.connect();
}


*/





function playSpotify() { //Función para reproductor de Spotify



    window.onSpotifyWebPlaybackSDKReady = () => {



        const player = new Spotify.Player({
            name: 'PIPO',
            volume: 0.4,
            getOAuthToken: cb => { cb("BQD3mRIMuBjbZUxE2Y1GDSMyEMWTLi58DZOon6ukfLm0pWGY3Iq1xEKbTAZDJpMuP2gULsgIXwpOc-VoXJtjmCOPgAGN5-L25CKIr8xBidWaDaHLt5XgN9vJPtTLIAVtR88wEV6Wt_snu7-GZEuOETyqu-syrNuSbJaq"); }
        });


        const title = document.getElementById('title');
        const artist = document.getElementById('artist');
        const album = document.getElementById('album');





        player.addListener('player_state_changed', ({
            position,
            duration,
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
            //album.style.width = "6rem";
            album.style.opacity = "0.3";
            album.style.objectFit = "cover";
            album.style.borderRadius = "2rem";

            recuadroV();

        });

        // Ready
        player.addListener('ready', ({ device_id }) => {
            console.log('Ready with Device ID', device_id);
        });

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => {
            console.log('Device ID has gone offline', device_id);
        });

        // Error handling
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });


        // Connect to the player!
        player.connect();
    };

}

function recuadroV() {
    const recuadro = document.getElementById('spotify');

    recuadro.style.display = "flex";
}


function recuadroH() {
    const recuadro = document.getElementById('spotify');
    recuadro.style.display = "none";

}

function loginSpotify() {


    const clientSecret = '056eb89f303a4fc8b4e60245b34d2a82';
    app.get('/login', function(req, res) {
        const clientId = '5967f5e598b94ca09b4c5fd41c142cce';
        var scopes = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + clientId +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(redirect_uri));
    });
}


function readOutLoud(message, busqueda, pregunta, busquedaYT) {
    const speech = new SpeechSynthesisUtterance();

    speech.text = "Disculpa, no te he entendido";


    if (message.includes('busca en Google')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;

        window.open('http://google.com/search?q=' + busqueda, "_blank");
    }
    if (message.includes('busca en youtube')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;

        window.open('https://www.youtube.com/results?search_query=' + busquedaYT, "_blank");
    }
    if (message.includes('busca en Spotify')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;

        window.open('https://open.spotify.com/search/' + busquedaYT, "_blank");
    }

    if (message.includes('qué es')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;

        window.open('http://google.com/search?q=' + pregunta, "_blank");
    }
    if (message.includes('pon en Youtube')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;

        playYoutube(busqueda);
    }
    if (message.includes('activa Spotify')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;

        loginSpotify();
        playSpotify();
    }
    if (message.includes('desactiva Spotify')) {
        const finalText = afirmacion[Math.floor(Math.random() * afirmacion.length)];
        speech.text = finalText;

        playSpotify();
    }
    if (message.includes('qué tal') || message.includes('cómo estás') || message.includes('cómo te encuentras')) {
        const finalText = estado[Math.floor(Math.random() * estado.length)];
        speech.text = finalText;
        content.textContent = finalText;

    }
    if (message.includes('qué día es') || message.includes('a qué día estamos')) {
        var dia = document.getElementById("day").innerHTML;
        const finalText = "Hoy es: " + dia;
        content.textContent = finalText;
        speech.text = "Hoy es" + dia;;
    }
    if (message.includes('qué día es hoy')) {
        var mL = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var dia = document.getElementById("day").innerHTML;
        var diaN = document.getElementById("fecha").innerHTML.slice(0, 2);
        if (diaN < 10) {
            diaN = diaN.slice(1, 2)
        }
        var mesN = document.getElementById("fecha").innerHTML.slice(3, 5);

        const finalText = "Hoy es: " + dia + " " + diaN + " de " + mL[parseInt(mesN) - 1];
        content.textContent = finalText;
        speech.text = "Hoy es" + dia + diaN + "de" + mL[parseInt(mesN) - 1];
    }

    //POR CAMBIAR *********************
    if (message.includes("tiempo")) {
        const finalText = "Sal de casa anormal";
        speech.text = finalText;
        content.textContent = finalText;
        imagenes.textContent = "";
    }
    if (message.includes("quién eres")) {
        const finalText = "Soy PIPO, tu asistente virtual";
        speech.text = finalText;
        content.textContent = finalText;
        imagenes.textContent = "";
    }

    if (message.includes("hora")) {
        var today = new Date();


        var hora = today.getHours() + " horas y " + today.getMinutes() + " minutos";

        if (parseInt(today.getMinutes()) == 0) {
            hora = today.getHours() + " en punto";
        }

        speech.text = "Son las" + hora;
        content.textContent = "Son las: " + hora;
        imagenes.textContent = "";
    }

    if (message.includes("adiós")) {
        const finalText = "Que vaya bien, hasta luego";
        speech.text = finalText;
        imagenes.textContent = "";
        content.textContent = finalText;
    }




    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);

    glow();


};