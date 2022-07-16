import {
    Box,
    Typography,
    Paper,
  } from "@mui/material";
import theme from "../app/theme.js";
import { alpha, styled } from "@mui/material/styles";
import abilities_json from "../constants/abilities.json"
import ability_ids_json from "../constants/ability_ids.json"

export function hoverPaper(type, value, x, y) {
    if (type === "ability") {
        var ability = abilities_json[ability_ids_json[value]]
        var name = ability.dname
    }
    if (type === "talent") {
        var ability = abilities_json[ability_ids_json[value]]
        var name = ability.dname
    }
  
    return (
      <Paper sx={{ position: "absolute", left: x, top: y, color: "black", backgroundColor: alpha(theme.palette.primary.light, 0.8), width: "fit", height: "fit" }}>
        <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
      </Paper>
    )
}