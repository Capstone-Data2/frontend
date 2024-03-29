import { Typography, Box, Table, TableBody, TableHead, TableRow, TableCell } from "@mui/material";
import React from "react";
import theme from "../../app/theme.js";
import { useSelector } from "react-redux";
import { LoadHeroIcons } from "../common/images";
import { loadAbilityImg } from "../common/images";
import { styled } from "@mui/material/styles";

export default function TeamFightTable({ team, fight, images }) {
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
    const TableTypography = styled(Typography)(({ theme, width, grayscale }) => ({
        fontSize: 11
    }));

    const match_details = useSelector(
        (state) => state.match_details.match_details
    );
    const selected_team_fight = useSelector((state) => state.teamfight.value);

    function abilityUses(abilities_used, images) {
        var response = []
        var abilities_names = Object.keys(abilities_used)
        abilities_names.forEach((ability, i) => {
            response.push(
                <Box
                    key={i}
                    sx={{ marginRight: 1 }}
                >
                    <img
                        src={loadAbilityImg(ability, images)}
                        style={{ borderRadius: 2, width: 20, height: 20, borderRight: "solid" }}
                        alt=""
                    />
                    <Typography>{abilities_used[ability]}</Typography>
                </Box>
            )
        });
        return response
    }

    function loadHeroRows(player, images) {
        var res = []
        for (var i = 0; i <= match_details.players.length - 1; i++) {

            if (player === String(match_details.players[i].hero_id)) {
                res.push(
                    <TableRow key={i}>
                        <TableCell>
                            <img
                                src={LoadHeroIcons([String(player)], images)}
                                style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                alt=""
                            />
                        </TableCell>
                        <TableCell>
                            <TableTypography
                            >{selected_team_fight.players[i].deaths}</TableTypography>
                        </TableCell>
                        <TableCell>
                            <TableTypography>{selected_team_fight.players[i].damage}</TableTypography>
                        </TableCell>
                        <TableCell>
                            <TableTypography>{selected_team_fight.players[i].healing}</TableTypography>
                        </TableCell>
                        <TableCell>
                            <TableTypography>{selected_team_fight.players[i].gold_delta}</TableTypography>
                        </TableCell>
                        <TableCell>
                            <TableTypography>{selected_team_fight.players[i].xp_delta}</TableTypography>
                        </TableCell>
                        <TableCell>
                            <Box
                                sx={{ display: 'flex' }}
                            >{abilityUses(selected_team_fight.players[i].ability_uses, images)}</Box>
                        </TableCell>
                        <TableCell>
                            <Box
                                sx={{ display: 'flex' }}
                            >{abilityUses(selected_team_fight.players[i].item_uses, images)}</Box>
                        </TableCell>
                    </TableRow>

                )
            }
        }
        return res
    }

    return (
        <Table sx={{ width: 500, backgroundColor: theme.palette.primary.main, mb: 4, }}>
            <TableHead>
                <TableRow>
                    {headers.map((header, i) => (
                        <TableCell key={i}>
                            <TableTypography
                            >{header}</TableTypography>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            <TableBody>

                {team.map((player) => (
                    loadHeroRows(player, images)
                ))}

            </TableBody>
        </Table>
    )
}