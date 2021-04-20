const ewelink = require('ewelink-api');
var officalConnection;

async function connectEwelink(email, password) {
  /* ewelink authorisation data*/
  const connection = new ewelink({
    email: email,
    password: password,
  });

  return connection;
};

/* Checks the powerstate of the sonoff device */
function readPowerState(connection) {
  $('main').load('templates/button.html', async () => {
    const buttonSvg = document.getElementById('imageColor');

    var status = await connection.getWSDevicePowerState('1000a1b44c');
    var stateDevice = status.state;

    officalConnection = connection;

    if (stateDevice == 'on') {
      buttonSvg.style.backgroundColor = "rgb(100, 195, 125)";
      console.log('on');
    }
    else {
      buttonSvg.style.backgroundColor = "rgb(161, 18, 18)";
      console.log('off');
    }

    fillCombobox();
  });
}

/* Toggles the button on the sonoff device */
function toggleButton() {
  (async () => {

    /* toggle device */
    await officalConnection.toggleDevice('1000a1b44c');
    await readPowerState(officalConnection);

  })();
}

async function fillCombobox(){
  const devices = await officalConnection.getDevices();
  devices.forEach(item => {
    $('#comboBox').prepend('<option>' + item.name + "</option>");
  });
}

