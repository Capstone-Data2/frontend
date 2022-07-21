import { Typography, Box, Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import React from "react";
import theme from "../app/theme.js";
import heroes_json from "../constants/heroes.json";
import heroes_abilities_json from "../constants/hero_abilities.json";
import { useDispatch, useSelector } from "react-redux";
import { fill } from '../pages/matchCombat/matchCombatSlice'
import { LoadHeroIcons } from "../common/images";
import { loadAbilityImg } from "../common/images";
export default function TeamFightTable({ team, fight }) {
    const headers = [
        'Player',
        'Deaths',
        'Damage',
        'Healing',
        'Gold',
        'Xp',
        'Abilities',
        'Items'
    ]
    const match_details = useSelector(
        (state) => state.match_details.match_details
    );
    const selected_team_fight = useSelector((state) => state.teamfight.value);

    function abilityUses(abilities_used, target){
        var response = []
        var abilities_names = Object.keys(abilities_used)
        abilities_names.forEach(ability => {
            response.push(
                <Box
                sx={{marginRight: 1}}
                >
                    <img
                        src={loadAbilityImg(ability)}
                        style={{ borderRadius: 2, width: 25, height: 25, borderRight: "solid" }}
                        alt="Radiant"
                    />
                    <Typography>{abilities_used[ability]}</Typography>
                </Box>
            )
        });
        return response
    }

    function loadHeroRows(player) {
        var res = []
        for (var i = 0; i <= match_details.players.length - 1; i++) {
            
            if (player === String(match_details.players[i].hero_id)) {
                res.push(
                    <TableRow>
                        <TableCell>
                            <img
                                src={LoadHeroIcons([String(player)])}
                                style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                            />
                        </TableCell>
                        <TableCell>
                            <Typography>{selected_team_fight.players[i].deaths}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{selected_team_fight.players[i].damage}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{selected_team_fight.players[i].healing}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{selected_team_fight.players[i].gold_delta}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{selected_team_fight.players[i].xp_delta}</Typography>
                        </TableCell>
                        <TableCell>
                            <Box
                            sx={{display: 'flex'}}
                            >{abilityUses(selected_team_fight.players[i].ability_uses)}</Box>
                        </TableCell>
                        <TableCell>
                            <Box
                            sx={{display: 'flex'}}
                            >{abilityUses(selected_team_fight.players[i].item_uses)}</Box>
                        </TableCell>
                    </TableRow>

                )
            }
        }
        return res
    }

    return (
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
                    
                    {team.map((player) => (
                        loadHeroRows(player)
                    ))}

                </TableBody>
            </Table>
        </Box>
    )
}