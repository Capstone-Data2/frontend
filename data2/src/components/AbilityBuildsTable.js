import React, {useState, useMemo} from "react";
import theme from "../app/theme.js";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Link,
  Paper,
} from "@mui/material";
import { LoadHeroIcons, LoadAbilityIcon } from "../common/images";
import { StyledTableCell, StyledTableRow } from "../common/styled.js";
import hero_abilities_json from "../constants/hero_abilities.json";
import ability_ids_json from "../constants/ability_ids.json";
import heroes_json from "../constants/heroes.json";
import { alpha, styled } from "@mui/material/styles";

function AbilityBuildsTable({ players }) {
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

  function checkHeroAbilities(hero) {
    var hero_ab = hero_abilities_json[heroes_json[hero.hero_id].name];
    var upgrade_arr = [];
    var ultiCount = 0;
    var talentCount = 0;
    var count = 0;
    while (25 > count) {
      if (count < hero.ability_upgrades_arr.length) {
        var element = hero.ability_upgrades_arr[count];
        var length = upgrade_arr.length;
        if (
          ability_ids_json[element] ===
          hero_ab.abilities[hero_ab.abilities.length - 1]
        ) {
          if (length >= 5 && ultiCount == 0) {
            ultiCount++;
            count++;
            upgrade_arr.push(element);
          } else if (length >= 11 && ultiCount == 1) {
            ultiCount++;
            count++;
            upgrade_arr.push(element);
          } else if (length >= 17) {
            ultiCount++;
            count++;
            upgrade_arr.push(element);
          } else {
            upgrade_arr.push(undefined);
          }
        } else if (ability_ids_json[element].split("_")[0] === "special") {
          if (length >= 9 && talentCount == 0) {
            talentCount++;
            count++;
            upgrade_arr.push(element);
          } else if (length >= 14 && talentCount == 1) {
            talentCount++;
            count++;
            upgrade_arr.push(element);
          } else if (length >= 19) {
            talentCount++;
            count++;
            upgrade_arr.push(element);
          } else {
            upgrade_arr.push(undefined);
          }
        } else {
          count++;
          upgrade_arr.push(element);
        }
      } else {
        count++;
        upgrade_arr.push(undefined);
      }
    }
    return upgrade_arr
  }

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
                      src={LoadHeroIcons(player.hero_id.toString().split(","))}
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
                      <LoadAbilityIcon ability={ability}/>
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