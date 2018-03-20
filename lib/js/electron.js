const {
    ipcRenderer
} = require('electron')
/* EVENT FROM electron */
ipcRenderer.on('data', (event, arg) => {
    $("#left-column").show();
    if (arg.type == "active_missions") {
        arg['myCurrentStarSystem'] = info.starSystem
        arg['myCurrentStation'] = info.station
        $("#center-column").html(handlebars.mission_page(arg))
        $("#left-column").html(handlebars.mission_gist(arg))
    } else if (arg.type == "community_goals") {
        $("#right-column").html(handlebars.goals_gist(arg))
    } else if (arg.type == "ranks") {
        updateRank(arg.ranks)
    } else {
        console.log(arg)
    }
})
ipcRenderer.on('journal', function (ipcEvent, event) {
    //var event = msg
    event = event.data;
    handleEvent(event)
});