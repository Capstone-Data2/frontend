import React from "react";
import theme from "../app/theme.js";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableHead,
    TableRow,
    Link
} from "@mui/material";
import { LoadHeroIcons } from "../common/images";
import { StyledTableCell, StyledTableRow } from "../common/styled.js";

function MatchPerformanceTable({ players, performance }) {
    var headers = [
        "Player",
        "GPM",
        "XPM",
        "KPM",
        "DPM",
        "LHM",
        "DNM",
        "HDM",
        "HHM",
        "KP",
        "TDM",
        "% of Gold @ 10",
        "Lowest GPM",
        "KPM @ 10",
        "LHM @ 10",
        "XPM @ 10",
        "ML Score",
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
                            <Typography sx={{ fontSize: 12 }}>{header}</Typography>
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
                                    <Box sx={{ display: "flex", flexDirection: "column", backgroundCol: "red", height: "100%", width: 70, lineHeight: 1.2 }}>
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
                            {headers.slice(1).map((header) => (
                                <StyledTableCell>
                                    <Typography sx={{ fontSize: 12 }}>{performance[player.hero_id][header]}</Typography>
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            }
        </Table>
    );
}



export default React.memo(MatchPerformanceTable)