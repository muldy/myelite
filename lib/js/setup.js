$.notifyDefaults({
    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>',
    delay: 500
});

var federal_ranks = {
    0: "None",
    1: "Recruit",
    2: "Cadet",
    3: "Midshipman",
    4: "Petty Officer",
    5: "Chief Petty Officer",
    6: "Warrant Officer",
    7: "Ensign",
    8: "Lieutenant",
    9: "Lieutenant Commander",
    10: "Post Commander",
    11: "Post Captain",
    12: "Rear Admira",
    13: "Vice Admiral",
    14: "Admiral"
}
var empire_ranks = {
    0: "None",
    1: "Outsider",
    2: "Serf",
    3: "Master",
    4: "Squire",
    5: "Knight",
    6: "Lord",
    7: "Baron",
    8: "Viscount",
    9: "Count",
    10: "Earl",
    11: "Marquis",
    12: "Duke",
    13: "Prince",
    14: "King"
}