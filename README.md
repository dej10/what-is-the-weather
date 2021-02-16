# What's The Weather ?
A simple weather application using [open weather map's API](https://openweathermap.org/) to fetch live weather data.


### `Live Link`
https://aqueous-eyrie-11610.herokuapp.com/


### `Packages Used`
[express](https://expressjs.com/)
[ejs](https://ejs.com/)
[body parser](https://www.npmjs.com/package/body-parser)
[dotenv](https://www.npmjs.com/package/dotenv)



### `Open Weather Map's API implementation`
```` javascript

app.post("/", function (req, res) {
	let city = req.body.cityName;
	const query = city;
	const apiKey = process.env.API_KEY 
	const units = "metric";	
	apiUrl = "http://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ units +"&appid=" + apiKey +"";

	https.get(apiUrl, function (response) {
		console.log(response.statusCode);
		response.on("data", function (data) {
			try{
			const weatherData = JSON.parse(data);
````


### `Rendering the data using EJS `

``` javascript

  		res.render("index", {
                    data: weatherData,
                    img: iconUrl,
                    temp: temp,
                    error: null
                });

```


### `Google Maps Intergation`

``` javascript

let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: { lat: 9.1450, lng: 40.4897 },
    zoom: 5
    }
    
    infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

```


