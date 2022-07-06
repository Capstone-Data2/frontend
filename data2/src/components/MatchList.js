import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { MatchRank, LoadHeroIcons } from "../common/images";
import { TimeDifference, FormatTime } from "../common/time";
import { useNavigate } from "react-router-dom";

const CommonBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Wrapper = styled(CommonBox)(({ theme }) => ({
  flexDirection: "column",
  backgroundColor: theme.palette.primary.main,
  height: "100%",
}));

const BtnWrapper = styled(CommonBox)(({ theme }) => ({
  marginTop: 30,
  marginBottom: 10,
  width: "100%",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: alpha(theme.palette.primary.light, 0.7),
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: theme.transitions.create(["background-color"]),
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.primary.dark,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

function MatchTypeButton({ type, click, text }){
  var current_page = window.location.href.split("/").pop()
  var btn_color = current_page === type ? "main" : "secondary"
  return (
    <Button
      variant="main"
      color={btn_color}
      sx={{ boxShadow: 2 }}
      onClick={click}
    >
      {text}
    </Button>
  );
}

function MatchListTable({ type }) {
  const matches = useSelector((state) => state.matches.value);
  let navigate = useNavigate();

  return (
    <Table sx={{ width: "75%",  }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell sx={{ width: "10%", borderTopLeftRadius: 5 }}>
            <Typography variant="subtitle2">Match ID</Typography>
          </StyledTableCell>
          {type === "public" && (
            <StyledTableCell sx={{ width: "10%" }}>
              <Typography variant="subtitle2">Rank</Typography>
            </StyledTableCell>
          )}
          {type === "professional" && (
            <StyledTableCell sx={{ width: "10%" }}>
              <Typography variant="subtitle2">Teams</Typography>
            </StyledTableCell>
          )}
          <StyledTableCell sx={{ width: "10%" }}>
            <Typography variant="subtitle2">Duration</Typography>
          </StyledTableCell>
          <StyledTableCell sx={{ width: "30%" }}>
            <Typography variant="subtitle2">Radiant</Typography>
          </StyledTableCell>
          <StyledTableCell sx={{ width: "30%", borderTopRightRadius: 5 }}>
            <Typography variant="subtitle2">Dire</Typography>
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {matches[0].map((match) => (
          <StyledTableRow
            key={match.match_id}
            onClick={() => {
              navigate(`/matches/${match.match_id}`);
            }}
            sx={{ ":hover": { cursor: "pointer" } }}
          >
            <StyledTableCell>
              <Typography variant="subtitle1">{match.match_id}</Typography>
              <Typography variant="caption">
                {TimeDifference(match.time_difference)}
              </Typography>
            </StyledTableCell>
            {type === "public" && (
              <StyledTableCell> {MatchRank(match)} </StyledTableCell>
            )}
            {type === "professional" && (
              <StyledTableCell>
                <Typography variant="caption"> Team1 </Typography>
                <Typography variant="caption"> vs </Typography>
                <Typography variant="caption"> Team2 </Typography>
              </StyledTableCell>
            )}
            <StyledTableCell>
              <Typography> {FormatTime(match.duration)} </Typography>
            </StyledTableCell>
            <StyledTableCell sx={{ pt: 0, pb: 0 }}>
              {LoadHeroIcons(match.radiant_team)}
            </StyledTableCell>
            <StyledTableCell sx={{ pt: 0, pb: 0 }}>
              {LoadHeroIcons(match.dire_team)}
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export { Wrapper, BtnWrapper, MatchListTable, MatchTypeButton };
