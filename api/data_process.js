exports.getMissionGist = function (missions) {

    return missions.reduce((entries, line) => {
        if (entries[line.DestinationSystem]) {
            //stations
            if (entries[line.DestinationSystem]['stations'][line.DestinationStation] === undefined) {
                entries[line.DestinationSystem]['stations'][line.DestinationStation] = {
                    'name': line.DestinationStation,
                    'count': 1,
                    'reward': line.Reward
                }
            } else {
                entries[line.DestinationSystem]['stations'][line.DestinationStation]['count'] += 1
                entries[line.DestinationSystem]['stations'][line.DestinationStation]['reward'] += line.Reward

            }
            //system
            entries[line.DestinationSystem]['count'] += 1
            entries[line.DestinationSystem]['totalReward'] += line.Reward
        } else {
            entries[line.DestinationSystem] = {
                'name': line.DestinationSystem,
                'missionid': line.MissionID,
                'stations': {},
                'count': 1,
                'totalReward': line.Reward

            }
            entries[line.DestinationSystem]['stations'][line.DestinationStation] = {
                'name': line.DestinationStation,
                'count': 1,
                'reward': line.Reward
            }
        }
        return entries
    }, {})
}