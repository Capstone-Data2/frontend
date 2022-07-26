import {
    Box,
    Typography,
} from "@mui/material";

import { LoadHeroIcons } from "../common/images";
import { loadTeamIcons } from "../common/images";
import hero_names from '../../constants/hero_names.json'
import theme from "../../app/theme.js";
import { getTowerName, isSelected, creepIsRadiant, sortResponseByTime, runeName } from "./tableFunctions";
import  { getTime }  from '../../functions/time.js'

export function MatchLogTable({ players, log_data, teams }) {
    const radiant = teams[0]
    const dire = teams[1]

    function getTowerName(rawName) {
        var array_name = rawName.split('_')
        var team = ''
        var tower = ''
        var tier = ''
        if (array_name.length === 5) {
            if (array_name[2] === 'goodguys') {
                team = 'Radiant '
            }
            else {
                team = 'Dire '
            }
            tier = 'Tier ' + array_name[3][5]
            tower = array_name[4]
            return (team + tier + ' ' + tower)
        }
        else if (array_name.length === 6) {
            if (array_name[2] === 'goodguys') {
                team = 'Radiant '
            }
            else {
                team = 'Dire '
            }

            tier = array_name[3] + ' Barracks'
            tower = array_name[5]
            return (team + tier + ' ' + tower)
        }
        else if (array_name.length === 4) {
            if (array_name[2] === 'goodguys') {
                team = 'Radiant '
            }
            else {
                team = 'Dire '
            }

            if (array_name[3][5] === '4') {
                tier = 'Tier ' + array_name[3][5]
            }
            else {
                tier = 'Ancient'
            }
            return (team + tier + ' ')
        }
    }

    function creepIsRadiant(buildingInfo) {
        var team = buildingInfo.unit.split('_')
        if (team[3] === 'badguys') {
            return false
        }
        else {
            return true
        }
    }

    function sortResponseByTime(res, time_in_seconds) {
        for (var i = 0; i < time_in_seconds.length; i++) {
            for (var j = 0; j < (time_in_seconds.length - i - 1); j++) {
                if (time_in_seconds[j] > time_in_seconds[j + 1]) {

                    var temp = time_in_seconds[j]
                    time_in_seconds[j] = time_in_seconds[j + 1]
                    time_in_seconds[j + 1] = temp

                    var resTemp = res[j]
                    res[j] = res[j + 1]
                    res[j + 1] = resTemp
                }
            }
        }
        return res
    }

    function loadLog() {
        var res = []
        var time_in_seconds = []
            //Buildings
            var buildings_array = log_data['Buildings']
            for (var i = 0; i <= buildings_array.length - 1; i++) {
                var unit = hero_names[buildings_array[i].unit]

                if (unit === undefined) {

                    if (creepIsRadiant(buildings_array[i])) {
                        if(players === ''){
                            res.push(
                                <Box key={i+"i"} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center" }}>
                                    <img
                                        src={loadTeamIcons('radiant')}
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                        alt="Radiant"
                                        
                                    />
                                    <Typography>{'--Destroyed--> '}</Typography>
                                    <Typography>{getTowerName(buildings_array[i].tower)} {getTime(buildings_array[i].time)}</Typography>
                                </Box>

                            )
                            time_in_seconds.push(buildings_array[i].time)
                        }
                    }
                    else {
                        if(players === ''){
                            res.push(
                                <Box key={i+"i"} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center", justifyContent: "end" }}>
                                    
                                    <Typography>{getTime(buildings_array[i].time)} {getTowerName(buildings_array[i].tower)}</Typography>
                                    <Typography>{' <--Destroyed-- '}</Typography>
                                    <img
                                        src={loadTeamIcons('dire')}
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                        alt="Dire"
                                        
                                    />
                                </Box>
                            )
                            time_in_seconds.push(buildings_array[i].time)
                        }
                    }
                }
                else {
                    var hero_id = hero_names[buildings_array[i].unit].id
                    if (radiant.includes(String(hero_id))) {
                        if(isSelected(String(hero_id), players.split(',')) || players === ''){
                            res.push(
                                <Box key={i+"i"} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center" }}>
                                    <img
                                        src={LoadHeroIcons([String(hero_id)])}
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                        alt="Radiant Hero Destroying Tower"
                                    />
                                    <Typography> {'--Destroyed--> '} {getTowerName(buildings_array[i].tower)} {getTime(buildings_array[i].time)}</Typography>
                                </Box>
                            )
                            time_in_seconds.push(buildings_array[i].time)
                        }
                    }
                    else if (dire.includes(String(hero_id))) {
                        if(isSelected(String(hero_id), players.split(',')) || players === ''){
                            res.push(
                                <Box key={i+"i"} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center", justifyContent: "end" }}>
                                    <Typography>{getTime(buildings_array[i].time)} {getTowerName(buildings_array[i].tower)}{' <--Destroyed--'}</Typography>
                                    <img
                                        src={LoadHeroIcons([String(hero_id)])}
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                        alt="Dire Hero Destroying Tower"
                                    />
                                </Box>
                            )
                            time_in_seconds.push(buildings_array[i].time)
                        }
                    }
                }
            }

            //Kills
            var kills_array = log_data['Kills']
            for (var k = 0; k <= kills_array.length - 1; k++) {
                var hero_killing = Object.keys(kills_array[k])[0]

                var array_of_kills = kills_array[k][String(hero_killing)]
                if (array_of_kills.length !== 0) {
                    for (var p = 0; p <= array_of_kills.length - 1; p++) {
                        var slained_hero_id = hero_names[array_of_kills[p].key].id
                        if (radiant.includes(String(hero_killing))) {
                            if(isSelected(String(hero_killing), players.split(',')) || players===''){
                                res.push(
                                    <Box key={p+k+hero_killing} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center" }}>
                                        <img
                                            src={LoadHeroIcons([String(hero_killing)])}
                                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                            alt="Hero Killing"
                                        />
                                        <Typography> {' --Killed--> '} </Typography>
                                        <img
                                            src={LoadHeroIcons([String(slained_hero_id)])}
                                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                            alt="Slained Hero"
                                        />
                                        <Typography
                                        sx={{marginLeft: 1}}
                                        >{getTime(array_of_kills[p].time)} </Typography>
                                    </Box>
                                )

                                time_in_seconds.push(array_of_kills[p].time)
                            }
                        }
                        else if (dire.includes(String(hero_killing))) {
                            if(isSelected(String(hero_killing), players.split(',')) || players===''){
                                res.push(
                                    <Box key={p+k+hero_killing} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center", justifyContent: "end" }}>
                                        <Typography
                                            sx={{marginRight: 1}}
                                        > {getTime(array_of_kills[p].time)} </Typography>
                                        <img
                                            src={LoadHeroIcons([String(slained_hero_id)])}
                                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                            alt="Slained Hero"
                                        />
                                        <Typography> {' <--Killed-- '} </Typography>
                                        <img
                                            src={LoadHeroIcons([String(hero_killing)])}
                                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                            alt="Hero Killing"
                                        />
                                    </Box>
                                )
                                time_in_seconds.push(array_of_kills[p].time)
                            }
                        }
                    }
                }
                
            }

            //Runes
            var runes_array = log_data['Runes']
            for (var l = 0; l <= runes_array.length - 1; l++) {
                var hero_picking = Object.keys(runes_array[l])[0]

                var array_of_pickups = runes_array[l][String(hero_picking)]

                if (array_of_pickups !== 0) {
                    for (var d = 0; d <= array_of_pickups.length - 1; d++) {
                        var rune = array_of_pickups[d].key
                        if (radiant.includes(String(hero_picking))) {
                            if(isSelected(String(hero_picking), players.split(',')) || players===''){
                                res.push(
                                    <Box key={(d+l+hero_picking)+1000} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center" }}>
                                        <img
                                            src={LoadHeroIcons([String(hero_picking)])}
                                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                            alt="Radiant Hero Rune"
                                        />
                                        <Typography>-Activated {runeName(String(rune))}  {getTime(array_of_pickups[d].time)}</Typography>
                                    </Box>
                                )
                                time_in_seconds.push(array_of_pickups[d].time)
                            }
                        }
                        else if (dire.includes(String(hero_picking))) {
                            if(isSelected(String(hero_picking), players.split(',')) || players===''){
                                res.push(
                                    
                                    <Box key={(d+l+hero_picking)+1000} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center", justifyContent: "end" }}>
                                        <Typography>  {getTime(array_of_pickups[d].time)} Activated {runeName(String(rune))} -</Typography>
                                        <img
                                            src={LoadHeroIcons([String(hero_picking)])}
                                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                            alt="Dire Hero Rune"
                                        />

                                    </Box>
                                )
                                time_in_seconds.push(array_of_pickups[d].time)
                            }
                        }
                    }
                }
            }

            //Roshan 2= radiant 3=dire
            var roshans_array = log_data['Roshan']
            for( var n= 0; n<=roshans_array.length - 1; n++){
                var team_killing = roshans_array[n]['rosh_kill_team']
                if(team_killing === 2 && players ===''){
                    res.push(
                        <Box key={n+"n"} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center" }}>
                            <img
                                src={loadTeamIcons('radiant')}
                                style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                alt="Radiant Roshan Kill"
                            />
                            <Typography>Slained Roshan {getTime(roshans_array[n].rosh_kill_time)}</Typography>
                        </Box>
                    )
                    time_in_seconds.push(roshans_array[n].rosh_kill_time)
                }
                else if(team_killing === 3 && players === ''){
                    res.push(
                        <Box key={n+"n"} sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center", justifyContent: "end" }}>
                            <Typography>{getTime(roshans_array[n].rosh_kill_time)} Slained Roshan</Typography>
                            <img
                                src={loadTeamIcons('dire')}
                                style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                alt="Dire Roshan Kill"
                            />
                            
                        </Box>
                    )
                    time_in_seconds.push(roshans_array[n].rosh_kill_time)
                }
            }

            return sortResponseByTime(res, time_in_seconds)
    }
    
    return (
        <Box
            sx={{
                flexDirection: 'row',
                backgroundColor: theme.palette.primary.main,
                marginTop: 5,
                padding: 3,
                borderRadius: 2,
            }}
        >
            {loadLog()}
        </Box>
    )
}
