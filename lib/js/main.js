const host = "localhost";
const port = 3000;

$(document).ready(function () {
        console.log("START");
        $("a.nav-link").click(function () {

                $("#center-column").load("http://" + host + ":" + port + "/html/" + $(this).attr("id"));
        })
        console.log("END");
            namespace = '/test';
            var socket = io.connect('http://localhost:' + "3000" + namespace);
            socket.on('connect', function() {
                socket.emit('event', {data: 'I\'m connected!'});
            });

            // Event handler for server sent data.
            // The callback function is invoked whenever the server emits data
            // to the client. The data is then displayed in the "Received"
            // section of the page.
            socket.on('my_response', function(msg) {
                    var event = msg.data
                    events.push(event)
                    if  ( (event.event=="MissionAccepted")
                        || (event.event=="MissionRedirected")
                        || (event.event=="MissionCompleted")
                        || (event.event=="MissionAbandoned")
                        || (event.event=="MissionFailed") )
                    {
                        $('#missions').prepend('<tr id="mission'+event.MissionID+'" >'+
                            '<td>'+event.MissionID+'</td>'+
                            '<td>'+event.event+'</td>'+
                            '<td>'+event.DestinationSystem+'</td>'+
                            '<td>'+event.DestinationStation+'</td>'+
                            '<td>'+event.LocalisedName+'</td>'+
                            '<td class="rowRight">'+getReward(event.Reward)+'</td>'+
                            '</tr>');
                        if  (event.event=="MissionAccepted")
                        {
                            if(missions[event.MissionID]==undefined)
                            {
                              var expires = new Date(event.Expiry)
                            $('#active_missions').prepend('<tr id="mission_a'+event.MissionID+'" >'+
                                '<td>'+event.MissionID+'</td>'+
                                '<td>'+event.MissionID+'</td>'+
                                '<td>'+ToExpire(expires)  + '</td>'+
                                '<td>'+event.DestinationSystem+'</td>'+
                                '<td>'+event.DestinationStation+'</td>'+
                                '<td>'+event.LocalisedName+'</td>'+
                                '<td class="rowRight">'+getReward(event.Reward)+'</td>'+
                                '</tr>');
                                }
                        }
                        else if ( (event.event=="MissionFailed")
                            || (event.event=="MissionCompleted")
                            || (event.event=="MissionAbandoned")
			)
                        {
                            $('table#active_missions tr#mission_a'+event.MissionID).remove()
                        }
                        else if  (event.event=="MissionRedirected")
                        {
                           $('table#missions'+
                               ' tr#mission'+event.MissionID+
                               ' td:nth-child(3)').html(event.OldDestinationSystem)
                           $('table#missions'+
                               ' tr#mission'+event.MissionID+
                               ' td:nth-child(4)').html(event.OldDestinationStation)

                           $('table#active_missions'+
                               ' tr#mission_a'+event.MissionID+
                               ' td:nth-child(3)').html(event.NewDestinationSystem)
                           $('table#active_missions'+
                               ' tr#mission_a'+event.MissionID+
                               ' td:nth-child(4)').html(event.NewDestinationStation)
                        }
                        missions[event.MissionID] = event
                    }
                    else
                    {
                        console.log('Received #' + JSON.stringify(msg.data));
                    }
            });
});