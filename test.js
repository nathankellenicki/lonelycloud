const LonelyCloud = require("./lonelycloud.js");
const WeatherProvider = require("./weatherprovider.js");

WeatherProvider.getWeatherForLocation("London", "UK")
.then(LonelyCloud.generateHaiku)
.then((haiku) => {
    console.log(haiku);
})