
const api = require('./api.json');
const https = require('https');
//const zip = 90210;

function printWeather(weather) {
    const message = `The weather at ${weather.name} is ${weather.main.temp} F`;
    console.log(message);
}

//print out error message
function printError(error) {
    console.error(error.message);
}

function get(query) {
    try {
    const values = {
        appid: api.key,
        units: 'imperial'
    }

    let url='';
    const zipIn = parseInt(query);
    if (!isNaN(zipIn)) {
        values.zip = zipIn + `,us`;
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${values.zip}&units=${values.units}&appid=${values.appid}`;
    } else {
        values.q = query + `,us`;
        url = `https://api.openweathermap.org/data/2.5/weather?q=${values.q}&units=${values.units}&appid=${values.appid}`;
    }
    console.log(url);

    const request = https.get(url, response => {
        if (response.statusCode === 200) {
            let body = '';
            //read the data
            response.on('data', part => {
                body += part;
                
            });
            response.on('end', () => {
                try {
                    const weather = JSON.parse(body);
                    printWeather(weather);
                } catch (error) {
                    //Parse error
                    printError(error);
                }
            });
        }else {
            //Status error code
            const statusErrorCode = new Error (`There has been an error getting the message for "{query}". (${http.STATUS_CODES[response.statusCode]})`);
            printError(statusErrorCode);
        }
    })
    } catch (error) {
        //adress is wrong
        printError(error);
    }
}


module.exports.get = get;

// convert Kelvin to F   ℉ =((K-273.15)*1.8)+32