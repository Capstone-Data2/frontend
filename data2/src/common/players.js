import heroes_json from "../constants/heroes.json"
import player_colors_json from "../constants/player_colors.json"

export function getPlayerDetails(players) {
    if (players !== undefined) {
      var radiant_players = [];
      var dire_players = [];
      players.forEach((player) => {
        if (player.is_radiant) {
          radiant_players.push(player);
        } else {
          dire_players.push(player);
        }
      });
      return { radiant: radiant_players, dire: dire_players };
    }
}

export function teamHeroIds(picks_bans) {
  let team1 = []
  let team2 = []
  for (let i = 0; i <= picks_bans.length - 1; i++) {
      if (picks_bans[i].is_pick === true) {
          if (picks_bans[i].team === 0) {
              team1.push(String(picks_bans[i].hero_id));
          }
          else if (picks_bans[i].team === 1) {
              team2.push(String(picks_bans[i].hero_id));
          }
      }
  }
  return ([team1, team2])
}

export function findHeroNames(players) {
  let heroes = []
  players.radiant.forEach((player, i) => {
      heroes.push({ name: heroes_json[player.hero_id].localized_name, color: Object.values(player_colors_json)[i], team: "radiant", gold_t: player.gold_t, xp_t: player.xp_t, lh_t: player.lh_t })
  });
  players.dire.forEach((player, i) => {
      heroes.push({ name: heroes_json[player.hero_id].localized_name, color: Object.values(player_colors_json).splice(5)[i], team: "dire", gold_t: player.gold_t, xp_t: player.xp_t, lh_t: player.lh_t })
  })
  return heroes
}