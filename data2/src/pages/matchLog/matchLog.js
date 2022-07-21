import { ThemeProvider } from "@emotion/react";
import React, { useEffect, useState } from "react";
import theme from "../../app/theme.js";
import { useSelector, useDispatch } from "react-redux";
import MatchDetailsHeader from "../../components/MatchDetailsHeader";
import { alpha } from "@mui/material/styles";
import {
    Box,
} from "@mui/material";

import { getMatchLog } from '../../common/api'
import { MatchLogFilter } from "../../components/MatchLogFilter";
import { MatchLogTable } from "../../components/MatchLogTable";
import { fetchMatchDetails } from "../matchOverview/matchDetailsSlice";
import { Loading } from "../../components/loading"



export default function MatchLog() {


    const match_details = useSelector(
        (state) => state.match_details.match_details
    );

    const loading = useSelector((state) => state.match_details.loading)

    var selected_heros = useSelector(
        (state) => state.filter.value
    );

    const dispatch = useDispatch()

    const [log, setLog] = useState({})

    const [id, setId] = useState(window.location.href.split("/")[4]);

    useEffect(() => {
        async function fetchData() {
            var res = await getMatchLog(match_details.match_id);
            setLog(res)
        }
        setId(window.location.href.split("/")[4])
        if (match_details.match_id !== parseInt(id) && !loading) {
            dispatch(fetchMatchDetails(id));
        }
        if(match_details.match_id === parseInt(id)){
            fetchData()
        }

    }, [match_details.match_id, loading, dispatch, id])

    return (
        <ThemeProvider theme={theme}>
            {(loading || Object.keys(log).length) === 0 &&
                <Loading />
            }
            {!loading && match_details.match_id !== 0 && Object.keys(log).length !== 0 && (
                <Box>
                    <MatchDetailsHeader page='log' />
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
                        <Box
                            sx={{
                                display: "flex",
                                mt: 2,
                                mx: 2,
                                justifyContent: "start",
                                flexDirection: "column",
                                width: "50%",
                                height: '200px',
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 2,

                            }}>
                            <MatchLogFilter players={teamHeroIds(match_details.picks_bans)} />
                        </Box>
                        {Object.keys(log).length !== 0 &&
                            <MatchLogTable players={selected_heros} log_data={log} teams={teamHeroIds(match_details.picks_bans)} />
                        }
                    </Box>
                </Box>
            )}
        </ThemeProvider>

    );

}


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