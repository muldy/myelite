const host = "localhost";
const port = 3000;

$(document).ready(function () {
        console.log("START");
        $("a.nav-link").click(function () {

                $("#center-column").load("http://" + host + ":" + port + "/html/" + $(this).attr("id"));
        })
        console.log("END");
});