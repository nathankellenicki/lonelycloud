const WeatherProvider = require("./weatherprovider.js");
const WeatherReport = WeatherProvider.Classes.WeatherReport;

let useCelsius = true;

module.exports.generateHaiku = function (report) {

    let temp = report.fahrenheit;
    if (useCelsius) {
        temp = report.celsius;
    }

    let haiku = [];

    haiku.push(`The weather is ${temp} ${temp <= 1 ? "degree" : "degrees"} and ${report.type}.`);

    if (temp <= 12) {
        
        if (report.type === "snowy" || report.type === "extreme") {
            haiku.push("I'd maybe stay home!");
        } else {
            haiku.push("It looks a bit chilly.");
            haiku.push("Maybe put on a jacket?");
        }
    } else if (temp > 12 && temp <= 19) {
        haiku.push("Just a little bit warm.");
        haiku.push("Not quite t-shirt weather yet.");
    } else {
        haiku.push("Get out those sunglasses, it's really quite warm!");
    }

    return haiku.join("\n");

}