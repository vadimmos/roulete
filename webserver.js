exports.default = function webServer(port = 80) {
  const express = require('express');
  const app = express();
  app.use(express.static('public'));
  app.listen(port, function () {
    console.log('Node js Express started on port ' + port);
  });
}