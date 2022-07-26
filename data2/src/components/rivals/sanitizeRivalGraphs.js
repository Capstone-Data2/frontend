import heroes_json from "../../constants/heroes.json"

export function sanitizeGoldXP(players, names) {
    var data = []
    var array = [...Array(players[0].gold_t.length)]
    array.forEach((_, i) => {
        data.push({
            name: i,
            [`${names[0]} Gold`]: players[0].gold_t[i],
            [`${names[1]} Gold`]: players[1].gold_t[i],
            [`${names[0]} XP`]: players[0].xp_t[i],
            [`${names[1]} XP`]: players[1].xp_t[i],
        })
    });
    return data
}

export function sanitizeLastHits(players, names) {
    var data = []
    var array = [...Array(players[0].lh_t.length)]
    array.forEach((_, i) => {
        data.push({
            name: i,
            [`${names[0]} Last Hits`]: players[0].lh_t[i],
            [`${names[1]} Last Hits`]: players[1].lh_t[i],
        })
    });
    return data
}

export function getHeroNames(players) {
    var rad_name = heroes_json[players[0].hero_id].localized_name
    var dire_name = heroes_json[players[1].hero_id].localized_name
    return [rad_name, dire_name]
}