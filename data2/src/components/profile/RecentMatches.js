import { Table, TableBody, TableHead, Typography, Box } from "@mui/material";
import theme from "../../app/theme";
import { StyledTableCell, StyledTableRow } from "../common/styled";
import { LoadHeroIcons } from "../common/images";
import { FormatTime } from "../../functions/time";
import heroes_json from "../../constants/heroes.json"
import { useSelector } from "react-redux";
import { alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";


export function RecentMatches({ images }) {
    const recent_matches = useSelector((state) => state.profile.recent_matches);
    const headers = [
        "hero",
        "result",
        "duration",
        "k",
        "d",
        "a",
    ]
    let navigate = useNavigate()
    return (
        <Table sx={{ width: "95%", minWidth: 550 }}>
            <TableHead>
                <StyledTableRow>
                    {headers.map(header => (
                        <StyledTableCell key={header}>
                            <Typography variant="subtitle2" sx={{ fontSize: 14 }}>{header.toUpperCase()}</Typography>
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {recent_matches.map(match => (
                    <StyledTableRow key={match.match_id} sx={{":hover":{cursor: (match.lobby_type >= 5 && match.lobby_type <=7)? "pointer" : "auto"}}} onClick={() => (match.lobby_type >= 5 && match.lobby_type <=7)? navigate(`/search/${match.match_id}`) : undefined}>
                        <StyledTableCell sx={{ minWidth: 150, height: 33 }}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ minWidth: 50, maxWidth: 50, marginRight: 2, display: "flex", alignItems: "center" }}>
                                    <img
                                        src={LoadHeroIcons(match.hero_id.toString().split(","), images)}
                                        alt=""
                                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                    />
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", backgroundCol: "red", height: "100%", width: 105, lineHeight: 1.2 }}>
                                    <Typography variant="caption" sx={{ overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap", color: theme.palette.secondary.light, fontWeight: 500, fontSize: 14 }}>{heroes_json[match.hero_id].localized_name}</Typography>
                                </Box>
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell>
                            {match.radiant_win
                                ? (match.player_slot < 5
                                    ? <Typography sx={{ color: theme.palette.radiant.main }}>Won Match {'>'} </Typography>
                                    : <Typography sx={{ color: theme.palette.dire.main }}>Lost Match {'>'} </Typography>
                                )
                                : (match.player_slot > 5
                                    ? <Typography sx={{ color: theme.palette.radiant.main }}>Won Match {'>'}</Typography>
                                    : <Typography sx={{ color: theme.palette.dire.main }}>Lost Match {'>'}</Typography>
                                )
                            }
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography>{FormatTime(match.duration)}</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography sx={{ color: theme.palette.radiant.main }}>{match.kills}</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography sx={{ color: theme.palette.dire.main }}>{match.deaths}</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                            <Typography sx={{ color: alpha(theme.palette.common.black, 0.6) }}>{match.assists}</Typography>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    );
}