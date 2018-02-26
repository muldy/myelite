var process = require('./api/data_process')

var p = [{
    "Name": "Mission_Courier_Boom",
    "DestinationStation": "Mitchell Dock",
    "Faction": "HIP 29241 Organisation",
    "MissionID": 315824062,
    "timestamp": "2018-02-13T20:40:58Z",
    "Influence": "Low",
    "Expiry": "2018-02-14T20:40:16Z",
    "TargetFaction": "United Meene Labour",
    "LocalisedName": "Boom data delivery",
    "Reputation": "Med",
    "DestinationSystem": "Meene",
    "Reward": 10108,
    "event": "MissionAccepted",
    "_id": "6v78MUaWHruqO2pV"
}, {
    "Name": "Mission_Courier_CivilWar",
    "DestinationStation": "Mitchell Dock",
    "Faction": "HIP 29241 Exchange",
    "MissionID": 315809405,
    "timestamp": "2018-02-13T20:23:52Z",
    "Influence": "Low",
    "Expiry": "2018-02-14T20:23:14Z",
    "TargetFaction": "Independent HIP 29241 Green Party",
    "LocalisedName": "Secure information needs delivering",
    "Reputation": "Med",
    "DestinationSystem": "Meene",
    "Reward": 10108,
    "event": "MissionAccepted",
    "_id": "wLp3ODhmXvUHfDDy"
}, {
    "Name": "Mission_Courier_CivilWar",
    "DestinationStation": "Weber Dock",
    "Faction": "HIP 29241 Order",
    "MissionID": 315803592,
    "timestamp": "2018-02-13T20:17:00Z",
    "Influence": "Low",
    "Expiry": "2018-02-14T20:16:37Z",
    "TargetFaction": "Meene Silver Life Partners",
    "LocalisedName": "Secure information needs delivering",
    "Reputation": "Med",
    "DestinationSystem": "Meene",
    "Reward": 11344,
    "event": "MissionAccepted",
    "_id": "YSwjIGTahvtAw3wD"
}, {
    "Count": 1,
    "Name": "Mission_PassengerVIP",
    "Commodity": "$Clothing_Name;",
    "timestamp": "2018-02-13T20:49:10Z",
    "LocalisedName": "Transport Remi Wagner",
    "PassengerCount": 6,
    "PassengerWanted": false,
    "Reward": 129412,
    "DestinationSystem": "Ndoyerunga",
    "DestinationStation": "Kirtley Horizons",
    "Faction": "Independent HIP 29241 Green Party",
    "MissionID": 315830940,
    "Influence": "Med",
    "event": "MissionAccepted",
    "Expiry": "2018-02-14T00:04:30Z",
    "Reputation": "High",
    "PassengerVIPs": true,
    "PassengerType": "Tourist",
    "Commodity_Localised": "Clothing",
    "_id": "0h70I40aqZ4ik0DT"
}, {
    "Count": 3,
    "Name": "Mission_PassengerVIP",
    "Commodity": "$ConsumerTechnology_Name;",
    "timestamp": "2018-02-13T20:49:05Z",
    "LocalisedName": "Transport Lucien Gonzalez",
    "PassengerCount": 5,
    "PassengerWanted": false,
    "Reward": 133328,
    "DestinationSystem": "Ndoyerunga",
    "DestinationStation": "Kirtley Horizons",
    "Faction": "Independent HIP 29241 Green Party",
    "MissionID": 315830887,
    "Influence": "Med",
    "event": "MissionAccepted",
    "Expiry": "2018-02-13T22:55:19Z",
    "Reputation": "High",
    "PassengerVIPs": true,
    "PassengerType": "Tourist",
    "Commodity_Localised": "Consumer Technology",
    "_id": "J8sCEPSG6wSqYXZY"
}]

var result = p.map(x => x.DestinationSystem)

console.log(result)

var gistMissions = process.getMissionGist(p)
console.log(JSON.stringify(
    Object.keys(gistMissions).map(x=>gistMissions[x]),null,2)
)
//process.getMissionGist(p)