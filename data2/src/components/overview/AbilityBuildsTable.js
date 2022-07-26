import React from "react";
import theme from "../../app/theme.js";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Link,
} from "@mui/material";
import { LoadHeroIcons, LoadAbilityIcon } from "../common/images";
import { StyledTableCell, StyledTableRow } from "../common/styled.js";
import { checkHeroAbilities } from "./checkHeroAbilities.js";

function AbilityBuildsTable({ players, images }) {
  var ranks = [
    "Unranked",
    "Herald",
    "Guardian",
    "Crusader",
    "Archon",
    "Legend",
    "Ancient",
    "Divine",
    "Immortal",
  ];

  return (
    <Table sx={{ minWidth: 1160, maxWidth: "100%", backgroundColor: "white", mb: 4 }}>
      <TableHead>
        <TableRow>
          <StyledTableCell key={"player"}>
            <Typography variant="subtitle2">Player</Typography>
          </StyledTableCell>
          {[...Array(25)].map((e, i) => (
            <StyledTableCell key={i} sx={{ textAlign: "start", px: 0 }}>
              <Typography variant="subtitle2">{i + 1}</Typography>
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      {Object.keys(players).length !== 0 && (
        <TableBody>
          {players.map((player) => (
            <StyledTableRow key={player.hero_id} sx={{}}>
              <StyledTableCell
                sx={{ minWidth: 40, maxWidth: 40, height: 33 }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      minWidth: 50,
                      maxWidth: 50,
                      marginRight: 2,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={LoadHeroIcons(player.hero_id.toString().split(","), images)}
                      alt=""
                      style={{
                        borderRadius: 2,
                        width: 50,
                        borderRight: "solid",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundCol: "red",
                      height: "100%",
                      width: 105,
                      lineHeight: 1.2,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontWeight: 500,
                        fontSize: 14,
                      }}
                    >
                      {player.personaname !== "Unknown" && (
                        <Link
                          sx={{
                            color: theme.palette.secondary.dark,
                            transition: theme.transitions.create(["color"]),
                            ":hover": {
                              cursor: "pointer",
                              color: theme.palette.secondary.main,
                            },
                          }}
                          underline="none"
                        >
                          {player.personaname}
                        </Link>
                      )}
                      {player.personaname === "Unknown" && player.personaname}
                    </Typography>
                    <Typography variant="caption" sx={{}}>
                      {ranks[player.rank_tier / 10]}
                    </Typography>
                  </Box>
                </Box>
              </StyledTableCell>
              {(checkHeroAbilities(player).map((ability, i) => (
                <StyledTableCell key={i} sx={{ maxWidth: 25, px: 0 }}>
                  {ability !== undefined &&
                    <Box sx={{":hover": {cursor: "help"}}} >
                      <LoadAbilityIcon ability={ability} images={images}/>
                    </Box>
                  }
                </StyledTableCell>
              )))}
            </StyledTableRow>
          ))}
        </TableBody>
      )}
    </Table>
  );
}

export default React.memo(AbilityBuildsTable)