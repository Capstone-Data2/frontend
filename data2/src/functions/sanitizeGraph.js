export function sanitizeGraph(players, heroes, param) {
    var data = []
    var array = [...Array(players.radiant[0][param].length)]
    array.forEach((_, i) => {
        let hero_data = {}
        heroes.forEach(hero => {
            hero_data[hero.name] = hero[param][i]
        })
        data.push({
            name: i + ":00",
            ...hero_data
        })
    });
    return data
}