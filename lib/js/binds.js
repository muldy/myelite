$( "#submitForm" ).submit(function( event ) {
    var text = $("#exampleTextarea").val()
    var jsonObj = JSON.parse(text)
    handleEvent(jsonObj);
    $("#jsonContent").html(JSON.stringify(jsonObj,null,1))
    event.preventDefault();
});