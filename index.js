const webServer = require('./webserver.js').default;
const sockets = require('./sokets.js').default;




sockets();
webServer();