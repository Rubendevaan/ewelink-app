const storage = require('electron-json-storage');
storage.setDataPath();

var $ = require("jquery");
const { log } = require('console');
const bcrypt = require('bcrypt');

storage.has("login", function (error, hasKey) {
    if (error) throw error;

    //if the file and data exist
    //just load the elektrisch deken without creating any files
    if (hasKey) {
        /* how da faq can i check hash. lm gebruik setCookie of sessions */
        storage.get('login', async function (err, data) {
            
                var resultLogin = decryptLogin(data.email, data.password, data.region , emailInput, passwordInput, regionInput);

                if (resultLogin) {
                    var connection = await connectEwelink(emailInput, passwordInput, regionInput);
                    readPowerState(connection);
                }
                else {
                    console.log("Ongeldige gegevens");
                }
        });
    }
    else {
        $("main").load(
            "templates/login.html",
            function () {
                $("#save").click(async function () {
                    var emailInput = $("input[name='email']").val();
                    var passwordInput = $("input[name='password']").val();
                    var regionInput = $("input[name='region']").val();

                    /* encrypts data in login.json file */
                    var encryptedCredentials = await encryptLogin(emailInput, passwordInput, regionInput);

                    storage.set('login', { email: encryptedCredentials[0], password: encryptedCredentials[1], region: encryptedCredentials[2] }, function (error) {
                        if (error) throw error;
                    });

                    // storage.get('login', async function (err, data) {
                    //     var resultLogin = await decryptLogin(data.email, data.password, data.region, emailInput, passwordInput, regionInput);

                    //     if (resultLogin.includes(true)) {
                    //         var connection = await connectEwelink(emailInput, passwordInput, regionInput);
                    //         readPowerState(connection);

                    //     }
                    //     else {
                    //         console.log("Ongeldige gegevens");
                    //     }
                    // });
                });
            });
    }
});

function clearStorage() {
    // Clears Storage
    storage.clear(function (err) {
        if (err) throw err;

        // Reloads Page
        location.reload();
    });
};

async function encryptLogin(email, password, region) {
    const saltRounds = 10;

    var preEncryptedArray = [email, password, region];
    var encryptedArray = [];

    preEncryptedArray.forEach((item) => {
        /* hashes array */
        bcrypt.hash(item, saltRounds, function (err, hash) {
            encryptedArray.push(hash);
        });
    });

    return encryptedArray;
}

async function decryptLogin(encryptedEmail, encryptedPassword, encryptedRegion, inputEmail, inputPassword, inputRegion) {

    var encryptedArray = [encryptedEmail, encryptedPassword, encryptedRegion];
    var inputArray = [inputEmail, inputPassword, inputRegion];
    var x = 0;

    var resultCompare = []

    encryptedArray.forEach((item) => {
        bcrypt.compare(inputArray[x], item, function (err, result) {
            console.log("inputArray = " + inputArray);
            console.log("encryptedArray = " + encryptedArray);
            console.log(result);
            console.log(err);
            resultCompare.push(result);
        });
        x++;
    });

    return resultCompare;
}