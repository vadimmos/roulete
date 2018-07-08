exports.default = function (port = 3000) {
  const WebSocket = require('ws');
  const fs = require('fs');
  const random = require('./randomizer').default;
  const server = new WebSocket.Server({port: port});
  const weapons = [
    {
      name: 'weapon1',
      icon: 'cube.png'
    },
    {
      name: 'weapon2',
      icon: 'sphere.png'
    },
    {
      name: 'weapon3',
      icon: 'cone.png'
    },
    {
      name: 'weapon4',
      icon: 'pir.png'
    }
  ];

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
  })
}