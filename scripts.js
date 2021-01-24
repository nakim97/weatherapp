document.body.style.backgroundImage = 
"url('https://source.unsplash.com/4000x2992/?" + "pastel" + "')";

document.addEventListener('DOMContentLoaded', bindButtons);

function bindButtons() {
	document.getElementById('weather-search').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		var appID = "&appid=b5712042b6cb14edb813c3ea344bfb18";         
        var city = document.getElementById("search").value;
        var payload;
        if(city)
		{
            payload = "http://api.openweathermap.org/data/2.5/weather?q=" + city  + appID + '&units=imperial';      
        }
		req.open("GET", payload, true);      
		req.send();
		req.addEventListener('load', function() {                  
			if (req.status >= 200 && req.status < 400) {
				var response = JSON.parse(req.responseText);
                showweather(response);   
                document.querySelector(".card").style.height ='300px';
                showDate();                    
			} else {
                console.log("Error in network request: " + req.statusText);
                alert("City Does Not Exist");
			}
    	});
		event.preventDefault();
	})
}

function showweather(response){
    const {name} = response;
    const { icon,description } = response.weather[0];
	document.getElementById("names").textContent = name;
    document.getElementById("temp").textContent = Math.round(response.main.temp * 10 )/10 +"°" ;
    document.getElementById("icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";   
    document.getElementById("description").textContent = description;
    document.getElementById("humidity").textContent = "Humidity: " + response.main.humidity + "%";
    document.getElementById("wind").textContent = "Wind: " + response.wind.speed + "mph";
    document.getElementById("highlow").textContent = response.main.temp_min + " / " + response.main.temp_max;
    
    
    // Display Background Images based on weather description (unsplash)
    if (response.weather[0].main ==="Clear"){
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/4000x2992/?" + "aesthetic sky" + "')";
    }
    if (response.weather[0].main ==="Clouds"){
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/4000x2992/?" + "aesthetic cloud" + "')";
    }
    if (response.weather[0].main ==="Thunderstorm"){
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/4000x2992/?" + "thunderstorm" + "')";
    }
    if (response.weather[0].main ==="Drizzle"){
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/4000x2992/?" + "rain" + "')";
    }
    if (response.weather[0].main ==="Rain"){
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/4000x2992/?" + "rain" + "')";
    }
    if (response.weather[0].main ==="Snow"){
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/4000x2992/?" + "aesthetic snow" + "')";
    }
   
                        
}
// Display the Date
var dates = new Date();
var month = dates.toLocaleString('default',{month:'long'});
var day = dates.getDate();
var year = dates.getFullYear();
document.getElementById("date").innerHTML = (month + " " + day + " "+ year);
function showDate(){
    document.getElementById('date').style.display = 'block';
}

// Trigger Search Button Click with Enter Key
document.getElementById("search").addEventListener("keyup", function (event) {
      if (event.key == "Enter") {document.getElementById("weather-search").click();
      showDate();
      }
      
});

