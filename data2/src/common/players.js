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