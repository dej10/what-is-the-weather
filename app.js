const express = require("express");
const https  = require("http");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
require('dotenv').config()


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));;

app.get("", function (req, res) {

	res.render("index",
	 { data: null,
	  error: "Enter a city name to get weather data"});

	
});


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
			const temp = Math.round(weatherData.main.temp);
			
			
			
			const icon = weatherData.weather[0].icon;
			iconUrl =  "http://openweathermap.org/img/wn/"+ icon +"@2x.png"

			const locale  = weatherData.name;


			res.render("index", {
                    data: weatherData,
                    img: iconUrl,
                    temp: temp,
                    error: null
                });

		}
			 catch (e) {
                res.render("index", { data: null, error: "Please search for a valid city 😩" });
            }

// 			res.write("<h1>The Temperature in " + locale + " is " + temp + " 	C</h1>");
// 			res.write(description);
// 			res.write("<img src="+ iconUrl + ">");
// 
// 			res.redirect("");



		});
	});



});



app.listen(3000, function () {
	console.log("Server running.... on port 3000")
});