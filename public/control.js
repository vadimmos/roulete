const ws = new WebSocket(`ws://${window.location.host}:3000`);

const startBtn = document.getElementById('start');

startBtn.addEventListener('click', () => {
  ws.send('roling');
})