import theme from "../../app/theme.js";
import { ThemeProvider } from "@emotion/react";
import {
    Box, Typography, Button
} from "@mui/material";
import MatchDetailsHeader from "../../components/MatchDetailsHeader";
import CombatDamageTable from '../../components/combat/MatchCombatDamageTable';
import TeamDamageTable from '../../components/combat/MatchTeamDamageTable';

import { useSelector, useDispatch } from "react-redux";
import { alpha } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { getMatchLog } from '../../common/api'
import { getMatchCombatData } from '../../common/api'
import TeamFightsList from "../../components/combat/MatchTeamFightsList.js";
import TeamFightTable from "../../components/combat/MatchTeamFightTable.js";
import TeamMapDeaths from '../../components/combat/MatchCombatTeamDeaths.js'
import TeamFightGraph from "../../components/combat/MatchFightGraph.js";
import { fetchMatchDetails } from "../matchOverview/matchDetailsSlice";

export default function MatchCombat() {
    const match_details = useSelector(
        (state) => state.match_details.match_details
    );

    const selected_team_fight = useSelector((state) => state.teamfight.value);
    const dispatch = useDispatch()
    const [log, setLog] = useState({})
    const [combat, setCombat] = useState({})
    const [teamFight, setTeamFight] = useState({})
    const [id, setId] = useState(window.location.href.split("/")[4]);
    const loading = useSelector((state) => state.match_details.loading);

    function clickButton() {
        if (teamFight === false) {
            setTeamFight(true)
        }
        else {
            setTeamFight(false)
        }
    }

    function getButtonName() {
        if (teamFight === false) {
            return ('Teamfights')
        }
        else {
            return ('Combat Overview')
        }
    }
    useEffect(() => {
        async function fetchData() {
            var res = await getMatchLog(match_details.match_id);
            setLog(res)

            var resCombat = await getMatchCombatData(match_details.match_id)
            setCombat(resCombat)
        }
        setId(window.location.href.split("/")[4])
        if (match_details.match_id !== parseInt(id) && !loading) {
            dispatch(fetchMatchDetails(id));
        }
        if (match_details.match_id === parseInt(id)) {
            fetchData()
        }
    }, [match_details, loading, id, dispatch])

    function getPageDetails() {
        if (teamFight === false) {
            return (
                <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column', justifyContent: "center", ml: "auto", mr: "auto" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", ml: "auto", mr: "auto" }}>
                        <Typography sx={{ marginTop: 2 }}>{'Kills / Damage'}</Typography>
                        <CombatDamageTable players={teamHeroIds(match_details.picks_bans)} kills={log} match_details={match_details} />
                    </Box>
                    <Typography>Radiant</Typography>
                    <TeamDamageTable players={teamHeroIds(match_details.picks_bans)[0]} combat={combat} />
                    <Typography>Dire</Typography>
                    <TeamDamageTable players={teamHeroIds(match_details.picks_bans)[1]} combat={combat} />
                </Box>
            )
        }

        else {
            return (
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography>Team Fights</Typography>
                        <TeamFightsList teamfights={match_details.teamfights} />
                    </Box>
                    {Object.keys(selected_team_fight).length !== 0 &&

                        <Box
                            sx={{
                                flexDirection: 'row',
                                marginTop: 5,

                            }}
                        >
                            <Box sx={{ display: 'flex', width: '150vh', justifyContent: 'space-between', marginBottom: 4 }}>
                                <Box sx={{ marginLeft: 20 }}>
                                    <TeamMapDeaths playersDead={selected_team_fight.players} />
                                </Box>
                                <Box sx={{ marginRight: 20 }}>
                                    <TeamFightGraph team={teamHeroIds(match_details.picks_bans)} />
                                </Box>


                            </Box>
                            <Box sx={{
                                display: 'flex',
                            }}>
                                <Box
                                    sx={{
                                        width: 750,
                                        marginRight: 10

                                    }}
                                >
                                    <Typography>Radiant Fight Overview</Typography>
                                    <TeamFightTable team={teamHeroIds(match_details.picks_bans)[0]} fight={selected_team_fight} />
                                </Box>

                                <Box
                                    sx={{
                                        width: 750
                                    }}
                                >
                                    <Typography>Dire Fight Overview</Typography>
                                    <TeamFightTable team={teamHeroIds(match_details.picks_bans)[1]} fight={selected_team_fight} />
                                </Box>
                            </Box>

                        </Box>

                    }

                </Box>
            )
        }

    }

    return (

        <ThemeProvider theme={theme}>
            <MatchDetailsHeader page='combat' />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "start",
                    width: "100%",

                    flexDirection: "column",
                    backgroundColor: alpha(theme.palette.primary.main, 0.6),
                }}
            >
                <Button

                    sx={{
                        marginTop: 3,
                        color: theme.palette.secondary.main,
                        backgroundColor: theme.palette.primary.light
                    }}
                    onClick={() => clickButton()}
                >{getButtonName()}</Button>
                <Box
                    sx={{
                        display: "flex",
                        mt: 2,
                        mx: 2,
                        justifyContent: "start",
                        flexDirection: "column",
                        width: "95%",
                        borderRadius: 2,

                    }}>
                    {(Object.keys(log).length !== 0 && Object.keys(combat).length !== 0) &&

                        <Box>
                            {getPageDetails()}
                        </Box>



                    }
                </Box>

            </Box>
        </ThemeProvider>
    )

    function teamHeroIds(picks_bans) {
        let team1 = []
        let team2 = []
        for (let i = 0; i <= picks_bans.length - 1; i++) {
            if (picks_bans[i].is_pick === true) {
                if (picks_bans[i].team === 0) {
                    team1.push(String(picks_bans[i].hero_id));
                }
                else if (picks_bans[i].team === 1) {
                    team2.push(String(picks_bans[i].hero_id));
                }
            }
        }
        return ([team1, team2])
    }
}