var $ = require("jquery");
const { log } = require('console');

//if the file and data exist
//just load the elektrisch deken without creating any files

// if (resultLogin) {
//     var connection = await connectEwelink(emailInput, passwordInput, regionInput);
//     connect

//     readPowerState(connection);
// }
// else {
//     console.log("Ongeldige gegevens");
// }
$("main").load(
    "templates/login.html",
    function () {
        $("#save").on("click", async function () {
            var emailInput = $("input[name='email']").val();
            var passwordInput = $("input[name='password']").val();
            var regionInput = $("input[name='region']").val();

            var connection = await connectEwelink(emailInput, passwordInput, regionInput);
            var con = await connection.getCredentials();

            if (con.msg == "Authentication failed") {
                console.log("Fout");
            }
            else {
                readPowerState(connection);
            }
        });
    }
)

function clearStorage() {
    // Clears Storage
    storage.clear(function (err) {
        if (err) throw err;

        // Reloads Page
        location.reload();
    });
};