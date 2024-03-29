import React from "react";
import theme from "../../app/theme.js";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FormatTime, TimeDifference } from "../../functions/time";
import { MatchButton } from "./Buttons";

export default function MatchDetailsHeader({ page }) {
  const { match_details } = useSelector((state) => state.match_details);
  let navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "30%",
        my: 1.5
      }}>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          {match_details.radiant_win &&
            <Typography variant="h2" sx={{ color: theme.palette.radiant.text }}>
              {match_details.radiant_name} Victory
            </Typography>
          }
          {match_details.radiant_win === false &&
            <Typography variant="h2" sx={{ color: theme.palette.dire.main }} >
              {match_details.dire_name} Victory
            </Typography>
          }
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography variant="caption" sx={{ fontSize: 16 }}>
            {match_details.match_id}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography variant="h2" sx={{ color: theme.palette.radiant.text, mr: 2 }}>
            {match_details.radiant_score}
          </Typography>
          <Typography variant="match_time">
            {FormatTime(match_details.duration)}
          </Typography>
          <Typography variant="h2" sx={{ color: theme.palette.dire.main, ml: 2 }}>
            {match_details.dire_score}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <Typography variant="caption" sx={{ fontSize: 16 }}>
            {"Match ended " + TimeDifference(match_details.time_difference)}
          </Typography>
        </Box>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "center",
        width: "30%",
        my: 2
      }}>
        <MatchButton 
          id={"overview"}
          type={page === "overview" ? "main" : "secondary"}
          click={() => { navigate("/matches/" + match_details.match_id + "/overview") }}
          text="Overview"
        />
        <MatchButton 
          id={"performance"}
          type={page === "performance" ? "main" : "secondary"}
          click={() => { navigate("/matches/" + match_details.match_id + "/performance") }}
          text="Performance"
        />
        <MatchButton 
          id={"rivals"}
          type={page === "rivals" ? "main" : "secondary"}
          click={() => { navigate("/matches/" + match_details.match_id + "/rivals") }}
          text="Rivals"
        />
        <MatchButton 
          id={"combat"}
          type={page === "combat" ? "main" : "secondary"}
          click={() => navigate("/matches/" + match_details.match_id + "/combat")}
          text="Combat"
        />
        <MatchButton 
          id={"graphs"}
          type={page === "graphs" ? "main" : "secondary"}
          click={() => navigate("/matches/" + match_details.match_id + "/graphs")}
          text="Graphs"
        />
        <MatchButton 
          id={"vision"}
          type={page === "vision" ? "main" : "secondary"}
          click={() => navigate("/matches/" + match_details.match_id + "/vision")}
          text="Vision"
        />
        <MatchButton 
          id={"log"}
          type={page === "log" ? "main" : "secondary"}
          click={() => navigate("/matches/" + match_details.match_id + "/log")}
          text="Log"
        />
      </Box>
    </Box>
  )
}
