import React, { useEffect, useState, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchMatchDetails } from "./matchDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../app/theme.js";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import MatchDetailsHeader from "../../components/common/MatchDetailsHeader";
import { PicksAndBansList, GameMap } from "../../components/common/images";
import MatchDetailsTable from "../../components/overview/MatchDetailsTable";
import AbilityBuildsTable from "../../components/overview/AbilityBuildsTable";
import { hoverPaper } from "../../components/overview/HoverPaper";
import { Loading } from "../../components/common/loading"
import { getPlayerDetails } from "../../common/players";

export default function MatchOverview() {
  const { id } = useParams();
  const match_details = useSelector(
    (state) => state.match_details.match_details
  );
  const loading = useSelector((state) => state.match_details.loading);
  const hover = useSelector((state) => state.hover);
  const rank = useSelector((state) => state.rank.value);
  const dispatch = useDispatch();
  const [page, setPage] = useState();
  let location = useLocation();
  const playersMemoized = useMemo(
    () => getPlayerDetails(match_details.players),
    [match_details]
  );

  useEffect(() => {
    setPage(location.pathname.split("/").pop());
    if (match_details.match_id !== parseInt(id) && !loading) {
      dispatch(fetchMatchDetails(id));
    }
  }, [dispatch, id, location, match_details, loading, rank]);

  return (
    <ThemeProvider theme={theme}>
      {loading && 
        <Loading/>
      }
      {!loading && match_details.match_id !== 0 && (
        <Box>
          <MatchDetailsHeader page={page} />
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
            <Box>
              {hover && 
                hoverPaper(hover.type, hover.hovered, hover.location.x, hover.location.y)
              }
            </Box>
            <Box
              sx={{
                display: "flex",
                mt: 2,
                mx: 2,
                justifyContent: "start",
                flexDirection: "column",
                width: "75%",
              }}
            >
              <Box sx={{ display: "flex", mb: 1 }}>
                <Typography sx={{}}>{match_details.radiant_name} Overview</Typography>
                {match_details.radiant_win && (
                  <Paper
                    elevation={3}
                    sx={{
                      mx: 2,
                      px: 1,
                      backgroundColor: theme.palette.radiant.text,
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
              </Box>
              {Object.keys(playersMemoized).length !== 0 && (
                <MatchDetailsTable players={playersMemoized.radiant} />
              )}
            </Box>
            <PicksAndBansList picks_bans={match_details.picks_bans} />
            <Box
              sx={{
                display: "flex",
                mt: 0,
                mx: 2,
                justifyContent: "start",
                flexDirection: "column",
                width: "75%",
              }}
            >
              <Box sx={{ display: "flex", mb: 1 }}>
                <Typography sx={{}}>{match_details.dire_name} Overview</Typography>
                {!match_details.radiant_win && (
                  <Paper
                    elevation={3}
                    sx={{
                      mx: 2,
                      px: 1,
                      backgroundColor: theme.palette.dire.main,
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
              </Box>
              {Object.keys(playersMemoized).length !== 0 && (
                <MatchDetailsTable players={playersMemoized.dire} />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                width: "75%",
              }}
            >
              <Box sx={{ display: "flex", mb: 1 }}>
                <Typography sx={{}}>{match_details.radiant_name} Ability Builds</Typography>
              </Box>
              {Object.keys(playersMemoized).length !== 0 && (
                <AbilityBuildsTable players={playersMemoized.radiant} />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                width: "75%",
              }}
            >
              <Box sx={{ display: "flex", mb: 1 }}>
                <Typography sx={{}}>{match_details.dire_name} Ability Builds</Typography>
              </Box>

              {Object.keys(playersMemoized).length !== 0 && (
                <AbilityBuildsTable players={playersMemoized.dire} />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                flexDirection: "column",
                width: "75%",
              }}
            >
              <Box sx={{ display: "flex", mb: 1 }}>
                <Typography sx={{}}>Building Map</Typography>
              </Box>
              {Object.keys(playersMemoized).length !== 0 && (
                <GameMap objectives={match_details.objectives} players={playersMemoized}/>
              )}
              </Box>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}