const ws = new WebSocket(`ws://${window.location.host}:3000`);

const startBtn = document.getElementById('start');
const table = document.getElementById('table');
let weapons = [];

startBtn.addEventListener('click', () => {
  ws.send('roling');
})

ws.onmessage = (m) => {
  if (m.data.includes('weapons')) {
    const newWeapons = JSON.parse(m.data.split('=')[1]);
    if (weapons.length !== newWeapons.length) {
      weapons = newWeapons.sort((a, b) => a.name.localeCompare(b.name));
      fillTable(weapons, true);
    } else {
      fillTable(weapons);
    }
  }
}

function fillTable(weapons = weapons, clearTable) {
  if (clearTable) [...table.children].forEach(e => e.remove());
  weapons.forEach(w => {
    const oldRow = [...table.children].find(r => r.id === w.name);
    const newRow = createRow(w);
    if (clearTable || !oldRow) {
      table.appendChild(newRow);
    } else {
      table.insertBefore(newRow, oldRow);
      oldRow.remove();
    }
  })
}

function createRow(w) {
  const row = document.createElement('tr');
  const icon = document.createElement('td');
  const name = document.createElement('td');
  const checkbox = document.createElement('input');
  const enable = document.createElement('td');

  row.id = w.name;
  icon.style.backgroundImage = `url('./icons/${w.icon}')`;
  icon.style.backgroundSize = 'contain';
  icon.style.backgroundPosition = 'center';
  icon.style.backgroundRepeat = 'no-repeat';
  name.innerText = w.name;
  checkbox.type = 'checkbox';
  checkbox.checked = w.enable;
  checkbox.addEventListener('change', (e) => {
    w.enable = checkbox.checked;
    changeWeapon(w);
  });
  enable.appendChild(checkbox);

  row.appendChild(icon);
  row.appendChild(name);
  row.appendChild(enable);
  return row;
}

function changeWeapon(w) {
  ws.send(`cahngeWeapon=${JSON.stringify(w)}`);
}