import {
    Box,
    Typography,
    Paper,
    Button,
} from "@mui/material";

import { LoadHeroIcons } from "../common/images";
import { useDispatch, useSelector } from "react-redux";
import { toggle, clear } from '../pages/matchLog/matchLogSlice'
import hero_names from '../constants/hero_names.json'
import heroes from '../constants/heroes.json'
export function MatchLogTable({ players, log_data, teams }) {
    const radiant = teams[0]
    const dire = teams[1]

    function getTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var sec = seconds - minutes * 60;
        if (sec < 10) {
            return (String(minutes) + ':0' + String(sec))
        }
        else {
            return (String(minutes) + ':' + String(sec))
        }

    }

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
        else if (array_name.length == 4) {
            if (array_name[2] === 'goodguys') {
                team = 'Radiant '
            }
            else {
                team = 'Dire '
            }

            if (array_name[3][5] == 4) {
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

    function loadLog() {
        var res = []
        var time_in_seconds = []
        if (players === '') {
            var buildings_array = log_data['Buildings']
            for (var i = 0; i <= buildings_array.length - 1; i++) {
                var unit = hero_names[buildings_array[i].unit]

                if (unit === undefined) {

                    if (creepIsRadiant(buildings_array[i])) {
                        res.push(
                            <Box sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center" }}>
                                <Typography>{'The Radiant ---> '}</Typography>
                                <Typography>{getTowerName(buildings_array[i].tower)} {getTime(buildings_array[i].time)}</Typography>
                            </Box>

                        )
                        time_in_seconds.push(buildings_array[i].time)
                    }
                    else {
                        res.push(
                            <Box sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center", justifyContent: "end" }}>
                                <Typography>{getTowerName(buildings_array[i].tower)} {getTime(buildings_array[i].time)}</Typography>
                                <Typography>{' <--- The Dire '}</Typography>
                            </Box>
                        )
                        time_in_seconds.push(buildings_array[i].time)
                    }

                }

                else {
                    var hero_id = hero_names[buildings_array[i].unit].id
                    if (radiant.includes(String(hero_id))) {
                        res.push(
                            <Box sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center" }}>
                                <img
                                    src={LoadHeroIcons(String(hero_id))}
                                    style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                />
                                <Typography> {'---> '} {getTowerName(buildings_array[i].tower)} {getTime(buildings_array[i].time)}</Typography>
                            </Box>
                        )
                        time_in_seconds.push(buildings_array[i].time)
                    }
                    else if (dire.includes(String(hero_id))) {
                        res.push(
                            <Box sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center", justifyContent: "end" }}>
                                <Typography>{getTowerName(buildings_array[i].tower)} {getTime(buildings_array[i].time)} {' <---'}</Typography>
                                <img
                                    src={LoadHeroIcons(String(hero_id))}
                                    style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                />
                            </Box>
                        )
                        time_in_seconds.push(buildings_array[i].time)
                    }
                }
            }

            var kills_array = log_data['Kills']

            for (var k = 0; k <= kills_array.length - 1; k++) {
                var hero_killing = Object.keys(kills_array[k])[0]

                var array_of_kills = kills_array[k][String(hero_killing)]
                if (array_of_kills.length !== 0) {
                    for (var p = 0; p <= array_of_kills.length - 1; p++) {
                        var slained_hero_id = hero_names[array_of_kills[p].key].id
                        if (radiant.includes(String(hero_killing))) {
                            res.push(
                                <Box sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center" }}>
                                    <img
                                        src={LoadHeroIcons(String(hero_killing))}
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                    />
                                    <Typography> {' ---> '} </Typography>
                                    <img
                                        src={LoadHeroIcons(String(slained_hero_id))}
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                    />
                                    <Typography> {getTime(array_of_kills[p].time)} </Typography>
                                </Box>
                            )

                            time_in_seconds.push(array_of_kills[p].time)
                        }
                        else if (dire.includes(String(hero_killing))) {
                            res.push(
                                <Box sx={{ minWidth: 450, maxWidth: 450, height: 65, minHeight: 65, marginRight: 2, display: "flex", alignItems: "center", justifyContent: "end" }}>
                                    <Typography> {getTime(array_of_kills[p].time)} </Typography>
                                    <img
                                        src={LoadHeroIcons(String(slained_hero_id))}
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                    />
                                    <Typography> {' <--- '} </Typography>
                                    <img
                                        src={LoadHeroIcons(String(hero_killing))}
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                    />
                                </Box>
                            )
                            time_in_seconds.push(array_of_kills[p].time)
                        }
                    }
                }
            }
            return res
        }
        else {

        }
    }

    return (
        <Box
            sx={{
                flexDirection: 'row',
            }}
        >
            <Typography>{players}Log</Typography>
            {loadLog()}
        </Box>
    )
}