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
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Link
} from "@mui/material";
import MatchDetailsHeader from "../../components/MatchDetailsHeader";
import { ItemImageList, LoadHeroIcons } from "../../common/images";
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ProgressBar from "../../components/ProgressBar";


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
  var headers = [
    "Player",
    "Level",
    "K/D/A",
    "LH/DN",
    "Networth",
    "GPM/XPM",
    "HD/TD/HH",
    "Items",
    "Buffs",
  ];
  var ranks = [
    "Unranked",
    "Herald",
    "Guardian",
    "Crusader",
    "Archon",
    "Legend",
    "Ancient",
    "Divine",
    "Immortal"
  ]

  useEffect(() => {
    setPage(location.pathname.split("/").pop());
    if (match_details.match_id !== parseInt(id) && !loading) {   
      dispatch(fetchMatchDetails(id));
    }
    if(match_details.match_id !== 0)
    {
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
                my: 2,
                mx: 5,
                justifyContent: "start",
                width: "85%",
              }}
            >
              <Typography sx={{}}>Radiant Overview</Typography>
              {match_details.radiant_win && (
                <Paper
                  elevation={3}
                  sx={{
                    mx: 3,
                    px: 1,
                    backgroundColor: theme.palette.radiant.text,
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
            <Table sx={{ width: "85%", backgroundColor: "white", mb: 4,}}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <StyledTableCell key={header} sx={{}}>
                      <Typography variant="subtitle2">{header}</Typography>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              {Object.keys(players).length !== 0 &&
                <TableBody>
                  {players.radiant.map((player) => (
                    <StyledTableRow key={player.hero_id} sx={{}}>
                      <StyledTableCell sx={{ minWidth: 120, maxWidth: 120, height: 33}}>
                        <Box sx={{display: "flex"}}>
                          <Box sx={{minWidth: 50, maxWidth: 50, marginRight: 2, display: "flex", alignItems: "center"}}>
                              <img
                                src={LoadHeroIcons(player.hero_id.toString())}
                                style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                              />
                            </Box>
                            <Box sx={{display: "flex", flexDirection: "column", backgroundCol: "red", height: "100%", width: 105, lineHeight: 1.2}}>
                              <Typography variant="caption" sx={{overflow:"hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap", fontWeight: 500, fontSize: 14}}>
                                {player.personaname !== "Unknown" &&
                                  <Link sx={{color: theme.palette.secondary.dark, transition: theme.transitions.create(["color"]), ":hover": {cursor: "pointer", color: theme.palette.secondary.main}}} underline="none">{player.personaname}</Link>
                                }
                                {player.personaname === "Unknown" &&
                                  player.personaname
                                }
                                </Typography>
                                <Typography variant="caption" sx={{}}>{ranks[player.rank_tier/10]}</Typography>
                          </Box>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{}}>
                        <ProgressBar 
                          progress={player.level}
                          size={30}
                          strokeWidth={2}
                          circleOneStroke={alpha(theme.palette.common.white, 0)}
                          circleTwoStroke={alpha("#808080", 0.6)}
                        />
                      </StyledTableCell>
                      <StyledTableCell sx={{}}>
                        <Box sx={{display:"flex"}}>
                          <Typography sx={{color: theme.palette.radiant.text, fontWeight: 500}}>{player.kills}</Typography>
                          <Typography>/</Typography>
                          <Typography sx={{color: theme.palette.dire.main, fontWeight: 500 }}>{player.deaths}</Typography>
                          <Typography>/</Typography>
                          <Typography sx={{color: alpha(theme.palette.common.black, 0.6), fontWeight: 500}}>{player.assists}</Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{}}>
                        <Box sx={{display:"flex"}}>
                          <Typography sx={{fontWeight: 500}}>{player.last_hits}</Typography>
                          <Typography sx={{color: alpha(theme.palette.common.black, 0.6)}}>/</Typography>
                          <Typography sx={{fontWeight: 500}}>{player.denies}</Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{}}>
                        <Typography sx={{color: "gold", fontWeight: 500}}>{player.net_worth}</Typography>
                      </StyledTableCell>
                      <StyledTableCell sx={{}}>
                        <Box sx={{display:"flex"}}>
                          <Typography sx={{fontWeight: 500}}>{player.gpm}</Typography>
                          <Typography sx={{color: alpha(theme.palette.common.black, 0.6)}}>/</Typography>
                          <Typography sx={{fontWeight: 500}}>{player.xpm}</Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{}}>
                        <Box sx={{display:"flex"}}>
                          <Typography sx={{fontWeight: 500}}>{player.hero_damage}</Typography>
                          <Typography sx={{color: alpha(theme.palette.common.black, 0.6)}}> / </Typography>
                          <Typography sx={{fontWeight: 500}}>{player.tower_damage}</Typography>
                          <Typography sx={{color: alpha(theme.palette.common.black, 0.6)}}> / </Typography>
                          <Typography sx={{fontWeight: 500}}>{player.hero_healing}</Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell sx={{}}>
                        {ItemImageList(player)}
                      </StyledTableCell>
                      <StyledTableCell sx={{}}>
                        <Typography>Buffs</Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              }
            </Table>
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
    if(player.is_radiant){
      radiant_players.push(player)
    }
    else{
      dire_players.push(player)
    }
  });
  return {radiant: radiant_players, dire: dire_players};
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: alpha(theme.palette.primary.dark, 0.8),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: theme.transitions.create(["background-color"]),
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "#FFD97F",
  },
}));