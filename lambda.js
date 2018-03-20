const Alexa = require("alexa-sdk");
const LonelyCloud = require("./lonelycloud.js");
const WeatherProvider = require("./weatherprovider.js");

const Secrets = require("./secrets.js");


const handlers = {

    "LaunchRequest": function () {
        this.emit("WeatherReport");
    },

    "WeatherReport": function () {

        WeatherProvider.getWeatherForLocation("Guildford", "UK")
        .then(LonelyCloud.generateHaiku)
        .then((haiku) => {
            this.response.speak(haiku.join(" "));
            this.emit(":responseReady");
        });
        return;

        if (this.event.context.System.user.permissions) {
            const token = this.event.context.System.user.permissions.consentToken;
            const apiEndpoint = this.event.context.System.apiEndpoint;
            const deviceId = this.event.context.System.device.deviceId;
    
            const das = new Alexa.services.DeviceAddressService();
            das.getFullAddress(deviceId, apiEndpoint, token)
            .then((data) => {
                this.response.speak("<address information>");
                console.log("Address get: " + JSON.stringify(data));
                this.emit(":responseReady");
            })
            .catch((error) => {
                this.response.speak("I'm sorry, something went wrong.");
                this.emit(":responseReady");
                console.log(error.message);
            });
        } else {
            this.response.speak("Please grant skill permissions to access your device address.");
            this.emit(":responseReady");
        }
        
    }
};


exports.handler = function (event, context, callback) {
    console.log(event);
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = Secrets.ALEXA_SKILL_APP_ID,
    alexa.registerHandlers(handlers);
    alexa.execute();
};