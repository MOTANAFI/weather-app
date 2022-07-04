const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
    const query = req.body.cityName;
    const apiKey = "09b5f02308e08fdf5688188ce173e3da";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + query + "&appid=" + apiKey + "&units=" + unit;
    https.get(url, response => {
        console.log(response.statusCode);
        response.on("data", data => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " Degress celcius</h1>");
            res.write("<img src= " + imgURL + ">");
            res.send();
        })
    })

})






app.listen(PORT, () => console.log(`server runing on port ${PORT}`));