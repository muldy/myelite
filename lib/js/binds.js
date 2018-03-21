$("a.nav-link").click(function () {
    ipcRenderer.send('get_data', 'active_missions')

})
$("#submitForm").submit(function (event) {
    var text = $("#exampleTextarea").val()
    var jsonObj = JSON.parse(text)
    $("#jsonContent").html(JSON.stringify(jsonObj,null,1))
    ipcRenderer.send('send_event', text) //pull data
    handleEvent(jsonObj);
    event.preventDefault();
});