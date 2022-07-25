import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchMatchDetails } from "../matchOverview/matchDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../app/theme.js";
import { Box } from "@mui/material";
import MatchDetailsHeader from "../../components/common/MatchDetailsHeader";
import { Loading } from "../../components/common/loading";
import { getPlayerDetails } from "../../functions/players";
import { RenderGraphs } from "../../components/graphs/RenderGraphs";

export default function MatchGraphs() {
  const match_details = useSelector(
    (state) => state.match_details.match_details
  );
  const loading = useSelector((state) => state.match_details.loading);
  const dispatch = useDispatch();
  const [id, setId] = useState(window.location.href.split("/")[4]);
  let location = useLocation();
  const playersMemoized = useMemo(
    () => getPlayerDetails(match_details.players),
    [match_details]
  );

  useEffect(() => {
    setId(window.location.href.split("/")[4]);
    if (match_details.match_id !== parseInt(id) && !loading) {
      dispatch(fetchMatchDetails(id));
    }
  }, [dispatch, id, location, match_details, loading]);

  return (
    <ThemeProvider theme={theme}>
      {loading && <Loading />}
      {!loading && match_details.match_id !== 0 && (
        <Box sx={{ height: 580 }}>
          <MatchDetailsHeader page="graphs" />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "start",
              width: "100%",
              height: "fit",
              minHeight: "100%",
              flexDirection: "column",
              backgroundImage:
                "linear-gradient(to right, rgb(225, 215, 188, 0.7), rgb(215, 205, 178, 0.7));",
            }}
          >
            <Box
              sx={{
                display: "flex",
                mt: 2,
                mx: 2,
                pb: 4,
                justifyContent: "start",
                flexDirection: "column",
                width: "80%",
                heihgt: "fit",
                backgroundColor: theme.palette.primary.light,
                borderRadius: 2,

              }}>
              {Object.keys(playersMemoized).length !== 0 &&
                <RenderGraphs players={playersMemoized} />
              }
            </Box>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}