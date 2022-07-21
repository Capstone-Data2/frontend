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