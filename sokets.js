exports.default = function (port = 3000) {
  const WebSocket = require('ws');
  const fs = require('fs');
  const random = require('./randomizer').default;
  const server = new WebSocket.Server({ port: port });
  let weapons = [];

  getWeapons((err, files) => {
    if (err) console.error(err);
    else if(files) {
      weapons = files.map(fileNmae => {
        return {
          icon: `${fileNmae}`,
          name: fileNmae.replace(/\.png/, '')
        }
      });
    }
  });

  server.on('connection', ws => {
    ws.on('message', message => {
      const index = random(0, weapons.length - 1);
      server.clients.forEach(c => {
        if (c.readyState === WebSocket.OPEN) {
          if (message.includes('roling')) {
            c.send(`weapons=${JSON.stringify(weapons)}`);
            c.send(`${message},${index}`);
          }
        }
      });
    })
    ws.send(`weapons=${JSON.stringify(weapons)}`);
  });

  function getWeapons(callback = (err) => { console.error(err); }, dirPath = './public/icons/') {
    fs.readdir(dirPath, (err, files) => {
      if (err) callback(err);
      else callback(err, files);
    })
  }
}