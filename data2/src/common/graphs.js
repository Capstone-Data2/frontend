import { Paper, Typography, Box } from '@mui/material';
import theme from "../app/theme.js";
import { alpha } from '@mui/material';
import heroes_json from "../constants/heroes.json"
import player_colors_json from "../constants/player_colors.json"

export const CustomTooltip = ({ active, payload, label, heroes }) => {
    if (active && payload && payload.length) {
        let sortable = [];
        for (var player in payload[0].payload) {
            sortable.push([player, payload[0].payload[player]]);
        }
        sortable.sort(function(a, b) {
            return b[1] - a[1];
        });
        heroes.forEach(hero => {
            sortable.forEach((player, i) => {
                if (hero.name === player[0]){
                    sortable[i].push(hero.color)
                    sortable[i].push(hero.team === "radiant" ? theme.palette.radiant.dark : theme.palette.dire.dark)
                }
            });
        });
        return (
            <Paper sx={{ display: "flex", flexDirection: "column", width: 200, backgroundColor: alpha(theme.palette.common.black, 0.8), p: 1 }}>
                <Typography sx={{ color: "white" }}>{label}</Typography>
                {sortable.map(player => (
                    player.length > 2 &&
                        <Box key={player} sx={{my: 0.2, borderLeft: 5, borderColor: player[2], backgroundImage: `linear-gradient(to right, ${player[3]}, rgb(0, 0, 0))`}}>
                            <Typography sx={{color: "white", ml: 1}}> {player[0] + ": " + player[1]}</Typography>
                        </Box>
                    
                ))}
            </Paper>
        );
    }
    return null;
};

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