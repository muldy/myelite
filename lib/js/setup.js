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

var global_ranks = {
    "federal": {
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
    },
    "emperial": {
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
    },
    "combat": {
        0: "Harmless",
        1: "Mostly Harmless",
        2: "Novice",
        3: "Competent",
        4: "Expert",
        5: "Master",
        6: "Dangerous",
        7: "Deadly",
        8: "Elite",
    },
    "trade": {
        0: "Penniless",
        1: "Mostly Penniless",
        2: "Peddler",
        3: "Dealer",
        4: "Merchant",
        5: "Broker",
        6: "Entrepreneur",
        7: "Tycoon",
        8: "Elite",
    },
    "explore": {
        0: "Aimless",
        1: "Mostly Aimless",
        2: "Scout",
        3: "Surveyor",
        4: "Trailblazer",
        5: "Pathfinder",
        6: "Ranger",
        7: "Pioneer",
        8: "Elite"
    },
    "cqc": {
        0: "Helpless",
        1: "Mostly Helpless",
        2: "Amateur",
        3: "Semi Professional",
        4: "Professional",
        5: "Champion",
        6: "Hero",
        7: "Legend",
        8: "Elite"
    }
}

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});