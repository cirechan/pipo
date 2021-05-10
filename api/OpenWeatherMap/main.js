$(document).ready(function() {
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getWeather);
        } else {
            alert("No se puede geolocalizar su posición");
        }
    }



    function getWeather(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        let API_KEY = 'bf715dcd93e17e20902eaf9197616477';
        let baseURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${API_KEY}`;

        $.get(baseURL, function(res) {
            let data = res.current;
            let temp = Math.floor(data.temp - 273);
            let condition = data.weather[0].main;
            let locationIcon = document.querySelector('.weather-icon');
            const { icon } = data.weather[0];
            locationIcon.innerHTML = `<img src = 'icons/${icon}.png' >`;


            const condicion = [
                "despejado",
                "nublado",
                "lluvia",
                "nieve",
                "llovizna",
                "tormenta",
                "neblina",
                "polvo en suspensión",
                "tornados",
                "niebla"
            ];
            const translate = [
                "Clear",
                "Clouds",
                "Rain",
                "Snow",
                "Drizzle",
                "Thunderstorm",
                "Mist",
                "Dust",
                "Tornado",
                "Fog"
            ];

            var index = 0;

            translate.forEach(cond => {

                if (condition === cond) {

                    index = translate.indexOf(cond);
                    console.log(index);
                }

            });


            console.log(data);

            $('#temp-main').html(`${temp}°`);
            $('#condition').html(condicion[index]);
        })

    }


    recuadroH();
    mueveReloj();
    getLocation();
    //  prepSpotify();

});

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}




function mueveReloj() {

    var weekday = new Array(7);
    weekday[0] = "Domingo";
    weekday[1] = "Lunes";
    weekday[2] = "Martes";
    weekday[3] = "Miércoles";
    weekday[4] = "Jueves";
    weekday[5] = "Viernes";
    weekday[6] = "Sábado";

    const day = document.getElementById('day');
    const time = document.getElementById('hora');
    const date = document.getElementById('fecha');

    var today = new Date();
    const hora = addZero(today.getHours()) + " : " + addZero(today.getMinutes());
    const fecha = addZero(today.getDate()) + "/" + addZero((today.getMonth() + 1)) + "/" + addZero(today.getFullYear());
    const diaSemana = weekday[today.getDay()];;


    time.textContent = hora;
    date.textContent = fecha;
    day.textContent = diaSemana;


    setTimeout("mueveReloj()", 1000)
}