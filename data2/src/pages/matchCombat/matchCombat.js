import theme from "../../app/theme.js";
import { ThemeProvider } from "@emotion/react";
import {
    Box, Typography,
} from "@mui/material";
import MatchDetailsHeader from "../../components/MatchDetailsHeader";
import CombatDamageTable from '../../components/MatchCombatDamageTable';
import { useSelector } from "react-redux";
import { alpha } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { getMatchLog } from '../../common/api'

export default function MatchCombat() {
    const match_details = useSelector(
        (state) => state.match_details.match_details
    );

    const [log, setLog] = useState({})
    
    async function fetchData() {
        var res = await getMatchLog(match_details.match_id);
        setLog(res)
    }

    useEffect(() => {
        fetchData()
    }, [])

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
                <Typography
                sx={{marginTop:2}}
                >{'Damage/Kills'}</Typography>
                <Box
                    sx={{
                        display: "flex",
                        mt: 2,
                        mx: 2,
                        justifyContent: "start",
                        flexDirection: "column",
                        width: "60%",
                        borderRadius: 2,

                    }}>
                    {Object.keys(log).length !== 0 && 
                    <CombatDamageTable players={teamHeroIds(match_details.picks_bans)} kills={log} match_details={match_details} />
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