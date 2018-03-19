const http = require("https");

const Secrets = require("./secrets.js");


class WeatherReport {

    constructor (fahrenheit, celsius, type) {
        this.fahrenheit = fahrenheit;
        this.celsius = celsius;
        this.type = type;
    }

}


const kelvinToFahrenheit = function (temp) {
    return temp * 9 / 5 - 459.67
}


const fahrenheitToCelsius = function (temp) {
    return (temp - 32) * 5 / 9;
}


module.exports.getWeatherForLocation = function (town, country) {
    return new Promise((resolve, reject) => {

        http.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(town)},${encodeURIComponent(country)}&appid=${Secrets.OPENWEATHERMAP_API_KEY}`, (res) => {
            
            let body = "";

            res.setEncoding("utf8");
            res.on("data", (data) => {
                body += data;
            });

            res.on("end", () => {
                
                try {

                    const result = JSON.parse(body);
                    if (result.cod !== 200) {
                        switch (result.cod) {
                            case 404:
                                return reject(new Error("Could not find weather location"));
                            default: 
                                return reject(new Error("Could not retrieve weather"));
                        }
                    }

                    const temperature = kelvinToFahrenheit(result.main.temp);
                    let type = "cloudy";

                    const reportedType = result.weather[0].main.toLowerCase();

                    if (reportedType.indexOf("fog") >= 0) {
                        type = "foggy";
                    } else if (reportedType.indexOf("sun") >= 0) {
                        type = "sunny";
                    } else if (reportedType.indexOf("rain") >= 0) {
                        type = "rainy";
                    } else if (reportedType.indexOf("snow") >= 0) {
                        type = "snowy";
                    } else if (reportedType.indexOf("extreme") >= 0) {
                        type = "extreme";
                    }

                    return resolve(new WeatherReport(Math.floor(temperature), Math.floor(fahrenheitToCelsius(temperature)), type));

                } catch (err)  {
                    return reject(new Error("Could not retrieve weather"));
                }

            });

        });

    });
}


module.exports.Classes = {
    WeatherReport: WeatherReport
};