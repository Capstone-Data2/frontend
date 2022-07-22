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
import { Filter } from "../../components/Filter";
import { MatchLogTable } from "../../components/MatchLogTable";
import { fetchMatchDetails } from "../matchOverview/matchDetailsSlice";
import { Loading } from "../../components/loading"
import { teamHeroIds } from "../../common/players.js";
import { toggle, clear } from './matchLogSlice'


export default function MatchLog() {


    const match_details = useSelector(
        (state) => state.match_details.match_details
    );

    const loading = useSelector((state) => state.match_details.loading)

    var selected_heroes = useSelector(
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

    function clicked(hero) {
        dispatch(toggle(hero))
    }

    function clearSelection() {
        dispatch(clear())
    }

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
                                width: 800,
                                height: '200px',
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 2,

                            }}>
                            <Filter players={teamHeroIds(match_details.picks_bans)} header={"Match Filter"} click={clicked} clear={clearSelection} selected_heroes={selected_heroes} />
                        </Box>
                        {Object.keys(log).length !== 0 &&
                            <MatchLogTable players={selected_heroes} log_data={log} teams={teamHeroIds(match_details.picks_bans)} />
                        }
                    </Box>
                </Box>
            )}
        </ThemeProvider>

    );

}


