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
import MatchDetailsHeader from "../../components/MatchDetailsHeader";
import { PicksAndBansList, GameMap } from "../../common/images";
import MatchDetailsTable from "../../components/MatchDetailsTable";
import AbilityBuildsTable from "../../components/AbilityBuildsTable";
import { hoverPaper } from "../../components/HoverPaper";
import { Loading } from "../../components/loading"

export default function MatchOverview() {
  const { id } = useParams();
  const match_details = useSelector(
    (state) => state.match_details.match_details
  );
  const loading = useSelector((state) => state.match_details.loading);
  const hover = useSelector((state) => state.hover);
  const dispatch = useDispatch();
  const [page, setPage] = useState(window.location.href.split("/").pop());
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
  }, [dispatch, id, location, match_details, loading]);

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
                <Typography sx={{}}>Radiant Overview</Typography>
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
                <Typography sx={{}}>Dire Overview</Typography>
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
                <Typography sx={{}}>Radiant Ability Builds</Typography>
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
                <Typography sx={{}}>Dire Ability Builds</Typography>
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

function getPlayerDetails(players) {
  if (players !== undefined) {
    var radiant_players = [];
    var dire_players = [];
    players.forEach((player) => {
      if (player.is_radiant) {
        radiant_players.push(player);
      } else {
        dire_players.push(player);
      }
    });
    return { radiant: radiant_players, dire: dire_players };
  }
}