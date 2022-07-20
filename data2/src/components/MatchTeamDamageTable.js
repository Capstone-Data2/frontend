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
import { loadAbilityImg } from "../common/images";
import { loadSmallHeroIcon } from "../common/images";

import heroes_json from "../constants/heroes.json";
import hero_names_json from "../constants/hero_names.json";



var headers = [
    'PLAYERS',
    'DEALT',
    'RECEIVED'
]

export default function TeamDamageTable({ players, combat}) {


    function loadHeroWithDamage(heros_hit, abilities_damage, ability ){
        var response = []
        heros_hit.forEach(hero => {
            var hero_id = hero_names_json[hero].id
            var dmg = abilities_damage[ability][hero]
            response.push(
                <Box>
                <img
                src={loadSmallHeroIcon(heroes_json[hero_id].icon)}
                style={{ borderRadius: 2, width: 25, borderRight: "solid" }}
                alt="Radiant"
                /> 
                <Typography sx={{
                    fontSize: 10
                }}>{dmg}</Typography>
                </Box>
            
        )
        })
        return response
    }

    function getDamageDealt(abilities_damage, player){
        var res = []
        var abilities = Object.keys(abilities_damage)
        abilities.forEach(ability => {
            var heros_hit = Object.keys(abilities_damage[ability])
            if(ability !== 'null'){
                res.push(
                    <Box sx={{
                        display: 'flex',
                        marginTop: 1
                    }}> 
                        <img
                            src={loadAbilityImg(ability)}
                            style={{ borderRadius: 2, width: 25, height: 25, borderRight: "solid" }}
                            alt="Radiant"
                        />
                        <Typography> {'-->'}</Typography>
                        
                        <Box
                        sx={{
                        display: 'flex',
                        }}
                        >
                            {loadHeroWithDamage(heros_hit, abilities_damage, ability)}
                        </Box>
                        
                        
                        
                        
                    </Box>
                )
            }
            
        });
       return res
    }

    function getDamageRecieved(abilities_dmg, player){
        var res = []
        console.log(abilities_dmg)
        var abilities = Object.keys(abilities_dmg)
        abilities.forEach(ability => {
            var dmg = abilities_dmg[ability]
            if(ability !== 'null'){
                res.push(
                    <Box sx={{
                        
                        marginRight: 1
                    }}> 
                        <img
                            src={loadAbilityImg(ability)}
                            style={{ borderRadius: 2, height: 25, borderRight: "solid" }}
                            alt="Radiant"
                        />
                        <Typography> {dmg}</Typography>
                    </Box>

                )
            }
        });
        return res
    }

    return(
        <Box>
            <Table sx={{ width: "100%", backgroundColor: theme.palette.primary.main, mb: 4, }}>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell>
                                <Typography>{header}</Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {players.map((player) => (
                        <TableRow>
                            <TableCell>
                            <img
                                    src={LoadHeroIcons(String(player))}
                                    style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                />
                            </TableCell>

                            <TableCell>
                                <Box
                                sx={{flexDirection: 'column'}}
                                >
                                    <Box>
                                    {getDamageDealt(combat.damage_targets[String(player)], player)}
                                    </Box>
                                </Box>
                            </TableCell>

                            <TableCell>
                                <Box
                                sx={{display: 'flex'}}
                                >
                                    {getDamageRecieved(combat.damage_inflictor_received[String(player)], player)}
                                </Box>
                        
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>

                </Table>
                
        </Box>
    )
}