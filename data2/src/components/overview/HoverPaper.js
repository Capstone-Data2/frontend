import {
    Typography,
    Paper,
  } from "@mui/material";
import theme from "../../app/theme.js";
import { alpha } from "@mui/material/styles";
import abilities_json from "../../constants/abilities.json"
import ability_ids_json from "../../constants/ability_ids.json"
import heroes_json from "../../constants/heroes.json"

export function hoverPaper(type, value, x, y) {
  var name = ""
  var ability = ""
    if (type === "ability") {
        ability = abilities_json[ability_ids_json[value]]
        name = ability.dname
    }
    if (type === "talent") {
        ability = abilities_json[ability_ids_json[value]]
        name = value === 730 ? "+2 Attribute" : ability.dname
    }
    if (type === "tower") {
      value = value.split("_")
      value[2] = value[2] === "goodguys" ? "radiant" : "dire"
      name = value.splice(2).join(" ")

    }
    if (type === "hero") {
      var hero = heroes_json[value.hero_id]
      name = hero.localized_name + " " + value.ml_lane_role
    }
  
    return (
      <Paper sx={{ position: "absolute", left: x, top: y, color: "black", backgroundColor: alpha(theme.palette.primary.light, 0.8), width: "fit", height: "fit", zIndex: 3 }}>
        <Typography sx={{ fontWeight: 700 }}>{name}</Typography>
      </Paper>
    )
}