const weather = require ('./weatherApp');
//Join multiple values passed as arguments and replace all spaces with underscores
const query = process.argv.slice(2).join('+')
//console.log(process.argv)
weather.get(query);