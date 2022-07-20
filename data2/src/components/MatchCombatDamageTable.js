import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableHead,
    TableRow,
} from "@mui/material";
import theme from "../app/theme.js";
import { LoadHeroIcons } from "../common/images";
import hero_names from '../constants/hero_names.json'

export default function CombatDamageTable({ players, kills, match_details }) {
    const radiant_players = players[0]
    const dire_players = players[1]
    var kills_array = kills['Kills'];

    function roundDamage(dmg){
        return (Math.round(dmg / 100) * 100)/1000 + 'k';
    }


    function getDamageArray(hero_id, hero_killed_id){
        var players_in_match = match_details.players
        var damageDoneToHero = 0
        for(var j=0; j<=players_in_match.length -1; j++){   
            if(players_in_match[j].hero_id===hero_id){           
                var hero_damage = Object.keys(players_in_match[j].damage)
                hero_damage.forEach(hero_name => {  
                    if(hero_name.substring(0, 13)=== 'npc_dota_hero'){
                        var hero_taking_damage = hero_names[hero_name].id
                        if(hero_taking_damage === hero_killed_id){
                            damageDoneToHero = roundDamage(players_in_match[j].damage[hero_name])
                        }
                    }
                });
            }
        }
        return damageDoneToHero
    }

    

    function heroKilledTimes(hero_killing, hero_slained){
        var kill_counter = 0
        for (var i = 0; i < kills_array.length; i++) {
            var hero = Object.keys(kills_array[i])[0]
            if(hero_killing == hero){
                var array_of_kills_by_hero = kills_array[i][String(hero_killing)]
                for(var k=0; k<=array_of_kills_by_hero.length -1; k++){
                    var slained_hero_id = hero_names[array_of_kills_by_hero[k].key].id
                    if(String(hero_slained) === String(slained_hero_id)){
                        kill_counter = kill_counter +  1
                    }
                }
            }
        }
        return kill_counter
    }
    return (
        <Box>
            <Table sx={{ width: "100%", backgroundColor: theme.palette.primary.main, mb: 4, }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="subtitle2"></Typography>
                        </TableCell>
                        {dire_players.map((player) => (
                            <TableCell>
                                    <img
                                        src={LoadHeroIcons(String(player))}
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid", border: '3px solid', borderColor: theme.palette.dire.dark}}
                                        
                                    />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {radiant_players.map((player) => (
                        <TableRow>
                            <TableCell>
                                <img
                                    src={LoadHeroIcons(String(player))}
                                    style={{ borderRadius: 2, width: 50, borderRight: "solid", border: '3px solid', borderColor: theme.palette.radiant.dark}}
                                />
                            </TableCell>
                            {dire_players.map((dire_player)=>(
                                <TableCell>
                                <Box
                                    sx={{
                                        flexDirection: "row",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            border: 1,
                                            borderRadius: 1,
                                            borderColor: theme.palette.radiant.dark,
                                        }}
                                    >
                                        <Typography>{heroKilledTimes(player, dire_player)} / {getDamageArray(parseInt(player), parseInt(dire_player))}</Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            border: 1,
                                            borderRadius: 1,
                                            borderColor: theme.palette.dire.dark,
                                            marginTop: 1,
                                        }}>

                                        <Typography>{heroKilledTimes(dire_player, player)} / {getDamageArray(parseInt(dire_player), parseInt(player))}</Typography>
                                    </Box>
                                </Box>

                            </TableCell>
                            ))}
                            
                            

                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </Box>
    )
}