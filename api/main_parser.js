exports.parseEvent = function (line,dbEvents, dbMissions, dbCommunityGoal) {
    //var eventJSon = JSON.parse(line);
    var eventJSon = line.data;
    
    //all go to events db
    dbEvents.insert(eventJSon, function (err, newDocs) {
        if (err) {
            console.log("ERROR: ", err)
        }
    });
    if (eventJSon.event === undefined) {
        if (eventJSon.lastSystem !== undefined) {
            console.log("*** GOT A LONG LASTSYSTEM ENTRY ***")
        } else if (eventJSon.BodyName != undefined) {
            console.log("*** GOT A LONG BODYNAME ENTRY ***")
        } else {
            console.log("Line without event:\n" + JSON.stringify(eventJSon, undefined, 2));
        }

        /************************** MISSIONS ***********************************/
    } else if (eventJSon.event.startsWith("Mission")) {

        if (eventJSon.event == "MissionAccepted") {
            dbMissions.insert(eventJSon, function (err, newDocs) {
                if (err) {
                    console.log("ERROR: ", err)
                }
                console.log("Got a mission event :" + newDocs._id)
            });
        } else if ((eventJSon.event == "MissionCompleted") ||
            (eventJSon.event == "MissionFailed") ||
            (eventJSon.event == "MissionAbandoned")
        ) {
            dbMissions.remove({
                MissionID: eventJSon.MissionID
            }, {}, function (err, numRemoved) {
                if (err) {
                    console.log("ERROR: ", err)
                }
                console.log("Removed a mission event :" + eventJSon.MissionID);
            });
        } else if (eventJSon.event == "MissionRedirected") {
            dbMissions.update({
                    MissionID: eventJSon.MissionID
                }, {
                    $set: eventJSon
                }, {
                    upsert: false
                },
                function (err, numReplaced, upsert) {
                    if (err) {
                        console.log("ERROR: ", err)
                    } else {
                        console.log("\tUpdated a Mission event :" + eventJSon.MissionID)
                    }
                });

        }

    } else if (eventJSon.event == "CommunityGoal") {
        eventJSon.CurrentGoals.map(x => {
            dbCommunityGoal.update({
                    CGID: x.CGID
                },
                x, {
                    upsert: true
                },
                function (err, numReplaced, upsert) {
                    if (err) {
                        console.log("ERROR: ", err)
                    } else {
                        console.log("\tUpdated a CommunityGoal event :" + x.CGID)
                    }
                });
        });


        /**************************** NOT STORED ***********************************************/
    } else if (eventJSon.event == "Progress") {
        console.log("Got a Progress event")
    } else if (eventJSon.event == "Rank") {
        console.log("Got a Rank event")
    } else if (eventJSon.event == "LoadGame") {
        console.log("Got a LoadGame event")
    } else if (eventJSon.event == "Location") {
        console.log("Got a Location event")
    } else if (eventJSon.event == "Docked") {
        console.log("Got a Docked event")
    } else if (eventJSon.event == "Undocked") {
        console.log("Got a Undocked event")
    } else if (eventJSon.event == "Music") {
        console.log("Got a Music event")
    } else if (eventJSon.event == "Loadout") {
        console.log("Got a Loadout event")
    } else if (eventJSon.event == "Cargo") {
        console.log("Got a Cargo event")
    } else if (eventJSon.event == "ShipyardSwap") {
        console.log("Got a ShipyardSwap event")
    } else if (eventJSon.event == "Scan") {
        console.log("Got a Scan event")
    } else if (eventJSon.event == "StartJump") {
        console.log("Got a StartJump event")
    } else if (eventJSon.event == "NavBeaconScan") {
        console.log("Got a NavBeaconScan event")
    } else if (eventJSon.event == "FSDJump") {
        console.log("Got a FSDJump event")
    } else if (eventJSon.event == "FuelScoop") {
        console.log("Got a FuelScoop event")
    } else if (eventJSon.event == "SupercruiseExit") {
        console.log("Got a SupercruiseExit event")
    } else if (eventJSon.event == "MaterialCollected") {
        console.log("Got a MaterialCollected event")
    } else if (eventJSon.event == "SupercruiseEntry") {
        console.log("Got a SupercruiseEntry event")
    } else if (eventJSon.event == "DockingRequested") {
        console.log("Got a DockingRequested event")
    } else if (eventJSon.event == "DockingGranted") {
        console.log("Got a DockingGranted event")
    } else if (eventJSon.event == "RefuelAll") {
        console.log("Got a RefuelAll event")
    } else if (eventJSon.event == "EscapeInterdiction") {
        console.log("Got a EscapeInterdiction event")
    } else if (eventJSon.event == "ShutDown") {
        console.log("Got a ShutDown event")
    } else if (eventJSon.event == "Scanned") {
        console.log("Got a Scanned event")
    } else if (eventJSon.event == "ApproachSettlement") {
        console.log("Got a ApproachSettlement event")
    } else if (eventJSon.event == "SellExplorationData") {
        console.log("Got a SellExplorationData event")
    } else if (eventJSon.event == "Interdicted") {
        console.log("Got a Interdicted event")
    } else if (eventJSon.event == "ShieldState") {
        console.log("Got a ShieldState event")
    } else if (eventJSon.event == "HullDamage") {
        console.log("Got a HullDamage event")
    } else if (eventJSon.event == "Died") {
        console.log("Got a Died event")
    } else if (eventJSon.event == "Resurrect") {
        console.log("Got a Resurrect event")
    } else if (eventJSon.event == "Passengers") {
        console.log(JSON.stringify(eventJSon));
        console.log("Got a Passengers event")
    } else if (eventJSon.event == "Materials") {
        console.log("Got a Materials event")
    } else if (eventJSon.event == "ModuleBuy") {
        console.log("Got a ModuleBuy event")
    } else if (eventJSon.event == "MarketSell") {
        console.log("Got a MarketSell event")
    } else if (eventJSon.event == "RepairAll") {
        console.log("Got a RepairAll event")
    } else if (eventJSon.event == "Repair") {
        console.log("Got a Repair event")
    } else if (eventJSon.event == "StartUp") {
        console.log("Got a StartUp event")
    } else if (eventJSon.event == "Touchdown") {
        console.log("Got a Touchdown event")
    } else if (eventJSon.event == "LaunchSRV") {
        console.log("Got a LaunchSRV event")
    } else if (eventJSon.event == "Liftoff") {
        console.log("Got a Liftoff event")
    } else if (eventJSon.event == "CommitCrime") {
        console.log("Got a CommitCrime event")
    } else if (eventJSon.event == "Bounty") {
        console.log("Got a Bounty event")
    } else if (eventJSon.event == "VehicleSwitch") {
        console.log("Got a VehicleSwitch event")
    } else if (eventJSon.event == "DockingDenied") {
        console.log("Got a DockingDenied event")
    } else if (eventJSon.event == "ShipyardBuy") {
        console.log("Got a ShipyardBuy event")
    } else if (eventJSon.event == "ModuleSellRemote") {
        console.log("Got a ModuleSellRemote event")
    } else if (eventJSon.event == "ReceiveText") {
        //console.log(JSON.stringify(eventJSon));
        if (eventJSon.From_Localised !== undefined) {
            console.log("Got a ReceiveText event: ", eventJSon.From_Localised, "> ", eventJSon.Message_Localised);
        } else {
            console.log("Got a ReceiveText event: ", eventJSon.From, "> ", eventJSon.Message_Localised);
        }
    } else {
        console.log("Unknown event:\n" + JSON.stringify(eventJSon, undefined, 2));
        console.log("***********************************\n")
        console.log('\n} else if (eventJSon.event == "' + eventJSon.event + '") {\nconsole.log("Got a ' + eventJSon.event + ' event")\n')
        console.log("***********************************\n")
    }
}