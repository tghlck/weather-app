
var searchButton = $(".searchButton");
var apiKey = "9ff06de9f4fef7c1cc63d907e759220d";

searchButton.click(function () {

    var searchInput = $(".searchInput").val();
    var urlCurrent = "http://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
    var urlFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

    if (searchInput == "") {
        console.log(searchInput);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response) {
    
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");

            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
       
            currentCard.append(currentName);

            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " · Local Time:  " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            var currentTemp = currentName.append("<p>");
          
            currentName.append(currentTemp);
            
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
        
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
     
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

        });

        $.ajax({
            url: urlFiveDay,
            method: "GET"
        }).then(function (response) {
    
            var day = [0, 8, 16, 24, 32];
            var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
            fiveDayDiv.empty();

            day.forEach(function (i) {
                var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");

                fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="http://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");

            })

        });
    }
});
