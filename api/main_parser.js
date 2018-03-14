var currentSystem = ""
var CurrentStation = ""
exports.parseEvent = function (line, mainDb) {
    //var eventJSon = JSON.parse(line);
    var eventJSon = line.data;

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
            mainDb.dbMissions.insert(eventJSon, function (err, newDocs) {
                if (err) {
                    console.log("ERROR: ", err)
                }
                console.log("Got a mission event :" + newDocs._id)
            });
        } else if ((eventJSon.event == "MissionCompleted") ||
            (eventJSon.event == "MissionFailed") ||
            (eventJSon.event == "MissionAbandoned")
        ) {
            mainDb.dbMissions.remove({
                MissionID: eventJSon.MissionID
            }, {}, function (err, numRemoved) {
                if (err) {
                    console.log("ERROR: ", err)
                }
                console.log("Removed a mission event :" + eventJSon.MissionID);
            });
        } else if (eventJSon.event == "MissionRedirected") {
            eventJSon.DestinationSystem = eventJSon.NewDestinationSystem
            eventJSon.DestinationStation = eventJSon.NewDestinationStation
            mainDb.dbMissions.update({
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

    } else if (eventJSon.event == "SupercruiseEntry") {
        mainDb.dbMissions.update({
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
    } else if (eventJSon.event == "CommunityGoal") {
        eventJSon.CurrentGoals.map(x => {
            mainDb.dbCommunityGoal.update({
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
        mainDb.dbProgress.insert(eventJSon, function (err, newDocs) {
            if (err) {
                console.log("ERROR: ", err)
            }
        });
        console.log("Got a Progress event")
    } else if (eventJSon.event == "Rank") {
        mainDb.dbRanks.insert(eventJSon, function (err, newDocs) {
            if (err) {
                console.log("ERROR: ", err)
            }
        });
        console.log("Got a Rank event")
    } else if (eventJSon.event == "LoadGame") {
        mainDb.dbLoads.insert(eventJSon, function (err, newDocs) {
            if (err) {
                console.log("ERROR: ", err)
            }
        });
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
    } else if (eventJSon.event == "Reputation") {
        console.log("Got a Reputation event")
    } else if (eventJSon.event == "Statistics") {
        console.log("Got a Statistics event")
    } else if (eventJSon.event == "Shipyard") {
        console.log("Got a Shipyard event")
    } else if (eventJSon.event == "StoredShips") {
        console.log("Got a StoredShips event")
    } else if (eventJSon.event == "ShipyardSell") {
        console.log("Got a ShipyardSell event")
    } else if (eventJSon.event == "DiscoveryScan") {
        console.log("Got a DiscoveryScan event")
    } else if (eventJSon.event == "ShipyardTransfer") {
        console.log("Got a ShipyardTransfer event")
    } else if (eventJSon.event == "Outfitting") {
        console.log("Got a Outfitting event")
    } else if (eventJSon.event == "StoredModules") {
        console.log("Got a StoredModules event")
    } else if (eventJSon.event == "ShipTargeted") {
        console.log("Got a ShipTargeted event")
    } else if (eventJSon.event == "Shutdown") {
        console.log("Got a Shutdown event")
    } else if (eventJSon.event == "CommunityGoalJoin") {
        console.log("Got a CommunityGoalJoin event")
    } else if (eventJSon.event == "ApproachBody") {
        console.log("Got a ApproachBody event")
    } else if (eventJSon.event == "LeaveBody") {
        console.log("Got a LeaveBody event")
    } else if (eventJSon.event == "Promotion") {
        console.log("Got a Promotion event")
    } else if (eventJSon.event == "Commander") {
        console.log("Got a Commander event")
    } else if (eventJSon.event == "Screenshot") {
        console.log("Got a Screenshot event")
    } else if (eventJSon.event == "Market") {
        console.log("Got a Market event")
    } else if (eventJSon.event == "ModuleInfo") {
        console.log("Got a ModuleInfo event")
    } else if (eventJSon.event == "SendText") {
        console.log("Got a SendText event")
    } else if (eventJSon.event == "Friends") {
        console.log("Got a Friends event")
    } else if (eventJSon.event == "UnderAttack") {
        console.log("Got a UnderAttack event")
    } else if (eventJSon.event == "BuyAmmo") {
        console.log("Got a BuyAmmo event")
    } else if (eventJSon.event == "HeatWarning") {
        console.log("Got a HeatWarning event")
        

        

        
        
        
        
        
    } else if (eventJSon.event == "ReceiveText") {
        //console.log(JSON.stringify(eventJSon));
        if (eventJSon.From_Localised !== undefined) {
            console.log("Got a ReceiveText event: ", eventJSon.From_Localised, "> ", eventJSon.Message_Localised);
        } else {
            console.log("Got a ReceiveText event: ", eventJSon.From, "> ", eventJSon.Message_Localised);
        }
    } else {
        //all unknown go to events db
        mainDb.dbEvents.insert(eventJSon, function (err, newDocs) {
            if (err) {
                console.log("ERROR: ", err)
            }
        });
    }
}