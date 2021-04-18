const storage = require('electron-json-storage');
storage.setDataPath();

var $ = require("jquery");
const { log } = require('console');

storage.has("login", function (error, hasKey) {
    if (error) throw error;

    //if the file and data exist
    //just load the elektrisch deken without creating any files
    if (hasKey) {
        storage.get('login', function (err, data) {
            var email = data.email;
            var password = data.password;
            var region = data.region;

            (async () => {
                var connection = await connectEwelink(email, password, region);
                readPowerState(connection);
            })();
        });
    }
    else {
        $("main").load(
            "templates/login.html",
            function () {
                $("#save").click(function () {
                    console.log('ola');
                    storage.set('login', { email: $("input[name='email']").val(), password: $("input[name='password']").val(), region: $("input[name='region']").val() }, function (error) {
                        if (error) throw error;
                    });

                    storage.get('login', function (err, data) {
                        var email = data.email;
                        var password = data.password;
                        var region = data.region;

                        (async () => {
                            var connection = await connectEwelink(email, password, region);
                            readPowerState(connection);
                        })();
                    });
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