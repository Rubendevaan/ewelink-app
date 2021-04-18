const ewelink = require('ewelink-api');
const buttonSvg = document.getElementById('imageColor');

/* ewelink authorisation data*/
const connection = new ewelink({
  email: '/* Put email from account in */',
  password: '/* Put password from account in */',
  region: '/* Put region from account in: example eu/us */'
});

readPowerState();

/* Checks the powerstate of the sonoff device */
function readPowerState() {
  (async () => {
    var status = await connection.getWSDevicePowerState('1000a1b44c');
    var stateDevice = status.state;

    if (stateDevice == 'on') {
      buttonSvg.style.backgroundColor = "rgb(100, 195, 125)";
      console.log('on');
    }
    else {
      buttonSvg.style.backgroundColor = "rgb(161, 18, 18)";
      console.log('off');
    }
  })
    ();
}

/* Toggles the button on the sonoff device */
function toggleButton() {
  (async () => {

    /* toggle device */
    await connection.toggleDevice('1000a1b44c');
    await readPowerState();

  })();
}
