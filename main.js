const LonelyCloud = require("./lonelycloud.js");
const WeatherProvider = require("./weatherprovider.js");
const Readline = require("readline");

const Secrets = require("./secrets.js");

const readline = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

process.stdout.write("Thank you for using Lonely Cloud.\n");
readline.question("What city are you in?\n", (city) => {
    readline.question("What country are you in?\n", (country) => {
        WeatherProvider.getWeatherForLocation(city, country)
        .then(LonelyCloud.generateHaiku)
        .then((haiku) => {
            process.stdout.write(haiku.join("\n"));
            process.stdout.write("\n");
            readline.close();
        });
    });
});
