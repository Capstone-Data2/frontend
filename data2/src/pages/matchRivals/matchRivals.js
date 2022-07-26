import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchMatchDetails } from "../matchOverview/matchDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../app/theme.js";
import { Box, Typography } from "@mui/material";
import MatchDetailsHeader from "../../components/common/MatchDetailsHeader";
import { Loading } from "../../components/common/loading";
import { getMatchRivals } from "../../functions/api";
import { teamHeroIds } from "../../functions/players";
import { Filter } from "../../components/common/Filter";
import { MatchRank, ItemImageList, BuffImageList } from "../../components/common/images";
import { NetGoldXPGraph, LastHitsGraph } from "../../components/rivals/RivalGraphs";
import { importIcons } from "../../functions/getIcons";

export default function MatchRivals() {
  const match_details = useSelector(
    (state) => state.match_details.match_details
  );
  const loading = useSelector((state) => state.match_details.loading);
  const dispatch = useDispatch();
  const [id, setId] = useState(window.location.href.split("/")[4]);
  const [selectedHeroes, setSelectedHeroes] = useState([])
  const [selectedPlayers, setSelectedPlayers] = useState({})
  let location = useLocation();
  const images = useMemo(
    () => importIcons(),
    []
  );

  useEffect(() => {
    setId(window.location.href.split("/")[4]);
    if (match_details.match_id !== parseInt(id) && !loading) {
      dispatch(fetchMatchDetails(id));
    }
  }, [dispatch, id, location, match_details, loading]);

  async function onClick(hero) {
    var players = await getMatchRivals(match_details.match_id, hero)
    var sel_players = {}
    players.rivals.forEach(player => {
      var rank_tier = player["rank_tier"]
      rank_tier === null ? player["rank_tier"] = "00" : player["rank_tier"] = rank_tier
      player.is_radiant ? sel_players["radiant"] = player : sel_players["dire"] = player
    });
    setSelectedHeroes([String(players.rivals[0].hero_id), String(players.rivals[1].hero_id)])
    setSelectedPlayers(sel_players)
  }
  function onClear() {
    setSelectedHeroes([])
    setSelectedPlayers({})
  }

  return (
    <ThemeProvider theme={theme}>
      {loading && <Loading />}
      {!loading && match_details.match_id !== 0 && (
        <Box sx={{height: 580}}>
          <MatchDetailsHeader page="rivals" />
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
                width: 1000,

                backgroundColor: theme.palette.primary.light,
                borderRadius: 2,

              }}>
              <Filter players={teamHeroIds(match_details.picks_bans)} header={"Match Rivals"} click={onClick} clear={onClear} selected_heroes={selectedHeroes} images={images} />
              {Object.keys(selectedPlayers).length !== 0 &&
                <RenderRivals rivals={selectedPlayers} images={images} />
              }

            </Box>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}


function RenderRivals({ rivals, images }) {
  return (
    <Box sx={{ display: "flex" }}>
      <RivalStats player={rivals.radiant} type={"radiant"} images={images} />
      <RivalGraphs players={rivals}/>
      <RivalStats player={rivals.dire} type={"dire"} images={images} />
    </Box>
  )
}

function RivalStats({ player, type, images }) {
  var align
  if (type === "radiant") {
    align = "start"
  }
  else {
    align = "end"
  }

  return (
    <Box sx={{ width: "33%" }}>
      <RenderStats player={player} align={align} images={images} />
    </Box>
  )
}

function RenderStats({ player, align, images }) {
  var flip = align === "start" ? 0 : 1
  var stats = {
    "User: ": player.name,
    "Rank": MatchRank(player.rank_tier.toString(), images),
    "Position: ": "",
    "ML Score: ": player.predicted_win,
    "Level: ": player.level,
    "KDA: ": player.kills + "/" + player.deaths + "/" + player.assists,
    "GPM: ": "",
    "Lowest GPM: ": "",
    "XPM: ": "",
    "Net Worth: ": player.net_worth,
    "Last Hits: ": "",
    "Last Hits Per Minute: ": "",
    "KPM: ": "",
    "Highest Kill Streak: ": "",
    "Lane Kills: ": "",
    "Lane Performance: ": "",
    "Runes Picked Up: ": "",
    "Max Hero Hit: ": "",
    "Hero Damage: ": player.hero_damage,
    "HDM: ": player.HDM,
    "Hero Healing: ": "",
    "Hero Healing Per Min: ": "",
    "Damage Taken: ": "",
    "Tower Damage: ": "",
    "Tower Damage Per Min: ": "",
    "Stunned Others For: ": "",
    "Seconds Dead: ": player.life_state_dead,
    "Buybacks: ": player.buybacks.length,
    "Deaths Per Minute: ": player.deaths_per_min,
    "Roaming: ": "",
    "Observers Placed: ": "",
    "Sentries Placed: ": "",
    "Items": ItemImageList(player, images, flip),
    "Permanent Buffs": BuffImageList(player, images),
  }

  if(player.ml_lane_role <= 3){
    stats["Last Hits: "] = player.last_hits
    stats["Lane Kills: "] = player.lane_kills
    stats["GPM: "] = player.gpm
    stats["XPM: "] = player.XPM
    stats["Highest Kill Streak: "] = killStreaks(player.kill_streaks)
    stats["Lane Performance: "] = player.lane_performance

    if(player.ml_lane_role <= 2){
      stats["KPM: "] = player.KPM
      stats["Max Hero Hit: "] = maxHeroHit(player.max_hero_hit)
      stats["GPM: "] = player.GPM
      stats["Lowest GPM: "] = player.lowest_gpm[0] + " at minute " + player.lowest_gpm[1]
      stats["Last Hits Per Minute: "] = player.LHM
    }

  }
  if(player.ml_lane_role === 2 || player.ml_lane_role === 4){
    stats["Runes Picked Up: "] = Object.keys(player.runes_picked_up).length
  } 

  switch (player.ml_lane_role) {
    case 1:
      stats["Position: "] = "Safe Lane"
      break;
    case 2:
      stats["Position: "] = "Mid Lane"
      break;
    case 3:
      stats["Position: "] = "Off Lane"
      stats["Tower Damage: "] = player.tower_damage
      stats["Tower Damage Per Min: "] = player.TDM
      stats["Damage Taken: "] = damageTaken(player.damage_taken)
      stats["Stunned Others For: "] = player.stuns + "s"
      break;
    case 4:
      stats["Position: "] = "Soft Support"
      stats["Roaming: "] = player.is_roaming ? "Yes" : "No"
      break;
    case 5:
      stats["Position: "] = "Hard Support"
      stats["Observers Placed: "] = player.obs_placed
      stats["Sentries Placed: "] = player.sen_placed
      stats["Hero Healing: "] = player.hero_healing
      stats["Hero Healing Per Min: "] = player.HHM
      break;
    default:
      break;
  }

  

  return (
    <Box sx={{ display: "flex", flexDirection: "column", textAlign: align, justifyContent: align, mx: 2 }}>
      {Object.keys(stats).map((key, i) => (
        <Box key={i} sx={{ display: "inherit", justifyContent: "inherit" }}>
          {stats[key] !== "" && (
            <Box>
              {typeof stats[key] === "object" && (
                stats[key]
              )}
              {typeof stats[key] !== "object" && (
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ fontWeight: 600 }}>{key}&nbsp;</Typography>
                  <Typography>{stats[key]}</Typography>
                </Box>
              )}
           </Box>
          )
          }
        </Box>
      ))}
    </Box>
  )
}

function killStreaks(streaks){
  if(Object.keys(streaks).length === 0){
    return "0"
  }
  else{
    return Math.max(...Object.keys(streaks))
  }
}

function maxHeroHit(hit){
  var name = hit.key.split("_").splice(3)
  if (name.length > 1){
    name.forEach((word, i) => {
      name[i] = word[0].toUpperCase() + word.slice(1)
    });
    name = name.join(" ")
  }
  else{
    name[0] = name[0][0].toUpperCase() + name[0].slice(1)
  }

  return (name + " for " + hit.value)
}

function damageTaken(damage){
  var total = 0
  Object.values(damage).forEach(instance => {
    total = total + instance
  });
  return total
}

function RivalGraphs({ players }) {
  return (
    <Box sx={{ width: "34%", textAlign: "center", mt: 3 }}>
      <NetGoldXPGraph players={[players.radiant, players.dire]}/>
      <Box sx={{my: 4}}/>
      <LastHitsGraph players={[players.radiant, players.dire]}/>
    </Box>
  )
}

