import React from "react";
import { alpha } from "@mui/material/styles";
import theme from "../../app/theme.js";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Link
} from "@mui/material";
import { ItemImageList, LoadHeroIcons, BuffImageList } from "../common/images";
import ProgressBar from "./ProgressBar";
import { StyledTableCell, StyledTableRow } from "../common/styled.js";

function MatchDetailsTable({ players }) {
    var headers = [
        "Player",
        "Level",
        "K/D/A",
        "LH/DN",
        "Networth",
        "GPM/XPM",
        "HD/TD/HH",
        "Items",
        "Buffs",
    ];
    var ranks = [
        "Unranked",
        "Herald",
        "Guardian",
        "Crusader",
        "Archon",
        "Legend",
        "Ancient",
        "Divine",
        "Immortal"
    ]

    return (
        <Table sx={{ minWidth: 1160, maxWidth: "100%", backgroundColor: "white", mb: 4, }}>
            <TableHead>
                <TableRow>
                    {headers.map((header) => (
                        <StyledTableCell key={header} sx={{}}>
                            <Typography variant="subtitle2">{header}</Typography>
                        </StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
            {Object.keys(players).length !== 0 &&
                <TableBody>
                    {players.map((player) => (
                        <StyledTableRow key={player.hero_id} sx={{}}>
                            <StyledTableCell sx={{ minWidth: 120, maxWidth: 120, height: 33 }}>
                                <Box sx={{ display: "flex" }}>
                                    <Box sx={{ minWidth: 50, maxWidth: 50, marginRight: 2, display: "flex", alignItems: "center" }}>
                                        <img
                                            src={LoadHeroIcons(player.hero_id.toString().split(","))}
                                            alt=""
                                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                        />
                                    </Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", backgroundCol: "red", height: "100%", width: 105, lineHeight: 1.2 }}>
                                        <Typography variant="caption" sx={{ overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap", fontWeight: 500, fontSize: 14 }}>
                                            {player.personaname !== "Unknown" &&
                                                <Link sx={{ color: theme.palette.secondary.dark, transition: theme.transitions.create(["color"]), ":hover": { cursor: "pointer", color: theme.palette.secondary.main } }} underline="none">{player.personaname}</Link>
                                            }
                                            {player.personaname === "Unknown" &&
                                                player.personaname
                                            }
                                        </Typography>
                                        <Typography variant="caption" sx={{}}>{ranks[player.rank_tier / 10]}</Typography>
                                    </Box>
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell>
                                <ProgressBar
                                    progress={player.level}
                                    size={30}
                                    strokeWidth={2}
                                    circleOneStroke={alpha(theme.palette.common.white, 0)}
                                    circleTwoStroke={alpha("#808080", 0.6)}
                                />
                            </StyledTableCell>
                            <StyledTableCell sx={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ color: theme.palette.radiant.text, fontWeight: 500 }}>{player.kills}</Typography>
                                    <Typography>/</Typography>
                                    <Typography sx={{ color: theme.palette.dire.main, fontWeight: 500 }}>{player.deaths}</Typography>
                                    <Typography>/</Typography>
                                    <Typography sx={{ color: alpha(theme.palette.common.black, 0.6), fontWeight: 500 }}>{player.assists}</Typography>
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell sx={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ fontWeight: 500 }}>{player.last_hits}</Typography>
                                    <Typography sx={{ color: alpha(theme.palette.common.black, 0.6) }}>/</Typography>
                                    <Typography sx={{ fontWeight: 500 }}>{player.denies}</Typography>
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell sx={{}}>
                                <Typography sx={{ color: "gold", fontWeight: 500 }}>{player.net_worth}</Typography>
                            </StyledTableCell>
                            <StyledTableCell sx={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ fontWeight: 500 }}>{player.gpm}</Typography>
                                    <Typography sx={{ color: alpha(theme.palette.common.black, 0.6) }}>/</Typography>
                                    <Typography sx={{ fontWeight: 500 }}>{player.xpm}</Typography>
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell sx={{}}>
                                <Box sx={{ display: "flex" }}>
                                    <Typography sx={{ fontWeight: 500 }}>{player.hero_damage}</Typography>
                                    <Typography sx={{ color: alpha(theme.palette.common.black, 0.6) }}> / </Typography>
                                    <Typography sx={{ fontWeight: 500 }}>{player.tower_damage}</Typography>
                                    <Typography sx={{ color: alpha(theme.palette.common.black, 0.6) }}> / </Typography>
                                    <Typography sx={{ fontWeight: 500 }}>{player.hero_healing}</Typography>
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell sx={{}}>
                                {ItemImageList(player)}
                            </StyledTableCell>
                            <StyledTableCell sx={{}}>
                                {BuffImageList(player)}
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            }
        </Table>
    );
}

export default React.memo(MatchDetailsTable)