import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchMatchDetails } from "../matchOverview/matchDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../app/theme.js";
import { Box, Typography, Paper } from "@mui/material";
import MatchDetailsHeader from "../../components/MatchDetailsHeader";
import { Loading } from "../../components/loading";
import { getMatchPerformance } from "../../common/api";
import MatchPerformanceTable from "../../components/MatchPerformanceTable";
import { getPlayerDetails } from "../../common/players";

export default function MatchPerformance() {
  const match_details = useSelector(
    (state) => state.match_details.match_details
  );
  const loading = useSelector((state) => state.match_details.loading);
  const dispatch = useDispatch();
  const [id, setId] = useState(window.location.href.split("/")[4]);
  const [performance, setPerformance] = useState({});
  let location = useLocation();
  const playersMemoized = useMemo(
    () => getPlayerDetails(match_details.players),
    [match_details]
  );

  useEffect(() => {
    async function fetchData() {
      var res = await getMatchPerformance(match_details.match_id);
      setPerformance(res);
    }
    setId(window.location.href.split("/")[4]);
    if (match_details.match_id !== parseInt(id) && !loading) {
      dispatch(fetchMatchDetails(id));
    }
    if (match_details.match_id === parseInt(id)) {
      fetchData();
    }
  }, [dispatch, id, location, match_details, loading]);

  function RenderTeamTable({ team, name, win, color }) {
    return (
      <Box
        sx={{
          display: "flex",
          mt: 2,
          mx: 2,
          justifyContent: "start",
          flexDirection: "column",
          width: "90%",
        }}
      >
        <Box sx={{ display: "flex", mb: 1 }}>
          <Typography sx={{}}>{name} Performance</Typography>
          {win && (
            <Paper
              elevation={3}
              sx={{
                ml: 2,
                px: 1,
                backgroundColor: color,
                width: 45,
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: theme.palette.common.white }}
              >
                Winner
              </Typography>
            </Paper>
          )}
          <Paper
            elevation={3}
            sx={{
              mx: 2,
              px: 1,
              backgroundColor: color,
              width: "fit",
            }}
          >
            <Typography
              variant="caption"
              sx={{ color: theme.palette.common.white }}
            >
                Team ML Performance Score: {match_details[`${team}_win_proba`]}/5
            </Typography>
          </Paper>
        </Box>
        {Object.keys(playersMemoized).length !== 0 &&
          Object.keys(performance).length !== 0 && (
            <MatchPerformanceTable
              players={playersMemoized[team]}
              performance={performance}
              team={team}
              match_details={match_details}
            />
          )}
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      {loading && <Loading />}
      {!loading && match_details.match_id !== 0 && (
        <Box>
          <MatchDetailsHeader page="performance" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "start",
              width: "100%",
              flexDirection: "column",
              backgroundImage:
                "linear-gradient(to right, rgb(225, 215, 188, 0.7), rgb(215, 205, 178, 0.7));",
            }}
          >
            <RenderTeamTable
              team={"radiant"}
              name={match_details.radiant_name}
              win={match_details.radiant_win}
              color={theme.palette.radiant.text}
            />
            <RenderTeamTable
              team={"dire"}
              name={match_details.radiant_name}
              win={!match_details.radiant_win}
              color={theme.palette.dire.main}
            />
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}
