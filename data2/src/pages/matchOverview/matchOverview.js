import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fill, fetchMatchDetails } from "./matchDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";
import theme from "../../app/theme.js";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import MatchDetailsHeader from "../../components/MatchDetailsHeader";
import { ItemImageList, LoadHeroIcons, BuffImageList, PicksAndBansList } from "../../common/images";
import { MatchDetailsTable } from "../../components/MatchDetailsTable";


export default function MatchOverview() {
  const { id } = useParams();
  const match_details = useSelector(
    (state) => state.match_details.match_details
  );
  const loading = useSelector((state) => state.match_details.loading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(window.location.href.split("/").pop());
  const [players, setPlayers] = useState({})
  let location = useLocation();


  useEffect(() => {
    setPage(location.pathname.split("/").pop());
    if (match_details.match_id !== parseInt(id) && !loading) {
      dispatch(fetchMatchDetails(id));
    }
    if (match_details.match_id !== 0) {
      setPlayers(getPlayerDetails(match_details.players))
    }
  }, [dispatch, id, location, match_details, loading]);

  return (
    <ThemeProvider theme={theme}>
      {loading && (
        <Box
          flexGrow={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "91.3vh",
            width: "100wh",
            backgroundColor: theme.palette.primary.main,
          }}
        >
          <CircularProgress sx={{ color: "black" }} />
        </Box>
      )}
      {(!loading && match_details.match_id !== 0) && (
        <Box>
          {console.log(match_details)}
          <MatchDetailsHeader page={page} />
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
                      width: 45
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
              {Object.keys(players).length !== 0 &&
                <MatchDetailsTable players={players.radiant} />
              }
            </Box>
            <PicksAndBansList picks_bans={match_details.picks_bans}/>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}

function getPlayerDetails(players) {
  var radiant_players = []
  var dire_players = []
  players.forEach(player => {
    if (player.is_radiant) {
      radiant_players.push(player)
    }
    else {
      dire_players.push(player)
    }
  });
  return { radiant: radiant_players, dire: dire_players };
}


