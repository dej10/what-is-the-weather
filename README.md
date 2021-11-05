# What's The Weather ?
A simple weather application using [open weather map's API](https://openweathermap.org/) to fetch live weather data.


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
