exports.default = function (port = 3000) {
  const WebSocket = require('ws');
  const fs = require('fs');
  const random = require('./randomizer').default;
  const server = new WebSocket.Server({ port: port });
  let weapons = [];

  getWeapons((err, files) => {
    if (err) console.error(err);
    else if (files) {
      weapons = files.map(fileNmae => {
        return {
          icon: `${fileNmae}`,
          name: fileNmae.replace(/\.png/, ''),
          enable: false
        }
      });
    }
  });

  server.on('connection', ws => {
    ws.on('message', message => {
      const enableWeapons = weapons.filter(w => w.enable);
      const index = Math.floor(random(0, enableWeapons.length - 1));
      server.clients.forEach(c => {
        if (c.readyState === WebSocket.OPEN) {
          if (message.startsWith('roling')) {
            c.send(`weapons=${JSON.stringify(weapons)}`);
            c.send(`${message},${index}`);
          } else if (message.startsWith('cahngeWeapon')) {
            const cahngeWeapon = JSON.parse(message.split('=')[1]);
            const cw = weapons.find(w => {
              if (w.name === cahngeWeapon.name) {
                w.enable = cahngeWeapon.enable;
                return true;
              }
              return false;
            });
            if (cw) c.send(`weapons=${JSON.stringify(weapons)}`);
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