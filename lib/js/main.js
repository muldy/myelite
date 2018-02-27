const host = "localhost";
const port = 3000;
var events = []
const {
    ipcRenderer
} = require('electron')

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("active_missions");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.getElementsByTagName("TR");
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            // Start by saying there should be no switching:
            shouldSwitch = false;
            /* Get the two elements you want to compare,
            one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place,
            based on the direction, asc or desc: */
            if ((x === undefined) || (y === undefined)) {
                console.log("wrong row number")
                return
            }
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch
            and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Each time a switch is done, increase this count by 1:
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc",
            set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}


$(document).ready(function () {
    Handlebars.registerPartial("mission_line", document.getElementById("template_mission_line").innerHTML)
    var mission_page = Handlebars.compile(document.getElementById("template_nav_missions").innerHTML)
    var mission_line = Handlebars.compile(document.getElementById("template_mission_line").innerHTML)
    var mission_gist = Handlebars.compile(document.getElementById("template_left_missions").innerHTML)
    var goals_gist = Handlebars.compile(document.getElementById("template_right_missions").innerHTML)
    console.log("START");

    /* EVENTA FROM electron */
    ipcRenderer.on('data', (event, arg) => {
        if (arg.type == "active_missions") {
            $("#center-column").html(mission_page(arg))
            $("#left-column").html(mission_gist(arg))
        } else if (arg.type == "community_goals") {
            $("#right-column").html(goals_gist(arg))
        } else {
            console.log(arg) // prints "pong"
        }
    })


    $("a.nav-link").click(function () {
        ipcRenderer.send('get_data', 'active_missions')

    })
    console.log("END");
    /*
    namespace = '/test';
    var socket = io.connect('http://localhost:' + "3000" + namespace);
    socket.on('connect', function () {
        socket.emit('event', {
            data: 'I\'m connected!'
        });
    });


    // Event handler for server sent data.
    // The callback function is invoked whenever the server emits data
    // to the client. The data is then displayed in the "Received"
    // section of the page.
    */
    //socket.on('event', function (msg) {
    ipcRenderer.on('journal', function (ipcEvent, event) {
        //var event = msg
        event = event.data;
        events.push(event)
        if ((event.event == "MissionAccepted") ||
            (event.event == "MissionRedirected") ||
            (event.event == "MissionCompleted") ||
            (event.event == "MissionAbandoned") ||
            (event.event == "MissionFailed")) {
            ipcRenderer.send('get_data', 'active_missions')
            //$.notify({
            //    title: event.event,
            //    message: event.LocalisedName
            //}, {
            //    type: 'primary'
            //});
        } else if (event.event == "Music") {
            //$.notify({
            //    title: event.event,
            //    message: event.MusicTrack
            //}, {
            //    type: 'secondary'
            //});
        } else if (event.event == "Rank") {
            $("#global_federation").html(global_ranks.federal[event.Federation]);
            $("#global_empire").html(global_ranks.emperial[event.Empire]);
            $("#global_combat").html(global_ranks.combat[event.Combat]);
            $("#global_trade").html(global_ranks.trade[event.Trade]);
            $("#global_explore").html(global_ranks.explore[event.Explore]);
            $("#global_cqc").html(global_ranks.cqc[event.CQC]);
        } else if (event.event == "Progress") {
            //$.notify({
            //    title: event.event,
            //    message: 
            //    "Federation:" +event.Federation +"<br>"+
            //    "Empire:" +event.Empire+"<br>"+
            //    "Combat:"+event.Combat+"<br>"+
            //    "Trade:"+event.Trade+"<br>"+
            //    "Explore:" +event.Explore+"<br>"+
            //    "CQC:"+event.CQC+"<br>"
            //}, {
            //    type: 'info'
            //});
        } else if (event.event == "LoadGame") {
            //$.notify({
            //    title: event.event,
            //    message: JSON.stringify(event,null,1)
            //}, {
            //    type: 'info'
            //});
        } else if (event.event == "CommunityGoal") {
            //$.notify({
            //    title: event.event,
            //    message: JSON.stringify(event,null,1)
            //}, {
            //    type: 'warning'
            //});
            ipcRenderer.send('get_data', 'community_goals')
        } else {
            console.log('Received #' + JSON.stringify(event));
            /*
            $.notify({
                title: event.event,
                message: JSON.stringify(event,null,1)
            }, {
                type: 'dark'
            });
            */

        }
    });

});