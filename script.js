$(document).ready(function (){
    //button
    $("#searchCity").on("click", function(event){
        var apikey = '2e9e3402c84c17a1b6756c015c8e478d'
        var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q='
        var locationQuery = $("#cityInput").val();
        var bigDiv = document.getElementById('mainDiv')
        var currentDate = moment().format("MMM/ Do /YY");
    event.preventDefault();
    //ajax requesting data from weather
        $.ajax({
            url: baseUrl + locationQuery + '&appId=' + apikey,
            method: 'GET'
        }).then(function (results){
            //data
            console.log(results)
            //object traversed vars
            var cities = ["Austin, TX", 'Houston, TX', 'San Antonio, TX', 'Fort Worth, TX'];
            var humidity = results.main.humidity
            var city = results.name
            var windSpeed = results.wind.speed
            var tempT = (results.main.temp - 273.15) * 1.80 + 32;
            $('#cityName').html('<h1>' + city  +  " " + currentDate + '</h1>')
            $('.temp').text("tempature (f): " + tempT)
            $('#windSpeedDiv').text('wind speed:  ' + windSpeed + ' MPH')
            $('#humidDiv').text('humidity: ' + humidity + '%')
            //UV object
            var uvUrl = 'http://api.openweathermap.org/data/2.5/uvi?appid=' + apikey + '&lat=' + lat + '&lon=' + lon
            var lat = results.coord.lat
            var lon = results.coord.lon
            
            //function for displaying and logging searched cities
            //Still not able to render the array of cities...
            function renderButtons(){
                $('#cities').empty();
                for (var index = 0; index < cities.length; index++) {
                    var a = $('<button>');
                    a.addClass("city");
                    a.attr("data-name", cities[i]);
                    a.text(cities[i]);
                    $("#cities").append(a);
                }
            }
            
            // ajax requesting the UV data from weather
            //Not understanding why it doesn't grab the UV. Having issues with the GET response here....
            $.ajax({
                url: uvUrl + apikey + '&lat=' + lat + '&lon=' + lon,
                method: 'GET'
            }).then(function (uv){
                console.log(uv)
                var uvIndex = uv.value
                console.log(uvIndex)
                $('#uvDiv').text('UV index: ' + uvIndex)
            })
        })
    })

    renderButtons()
// end button
})