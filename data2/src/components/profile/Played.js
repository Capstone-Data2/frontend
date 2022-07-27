import { Table, TableBody, TableHead, Typography, Box } from "@mui/material";
import theme from "../../app/theme";
import { StyledTableCell, StyledTableRow } from "../common/styled";
import { UnixTimeDifference } from "../../functions/time";
import heroes_json from "../../constants/heroes.json"
import { useNavigate } from "react-router-dom";


export function Played({ type, data, images }) {
    const headers = [type, "matches", "win%"]
    var table_data = []
    var imgwidth = 29
    var clickable = false
    let navigate = useNavigate()
    if (type === "hero"){
        [...Array(10)].forEach((_, i) => {
            var hero = data[i]
            var hero_data = {avatar: images[heroes_json[hero.hero_id].img], name: heroes_json[hero.hero_id].localized_name, with_games: hero.games, with_win: hero.win, last_played: hero.last_played}
            table_data.push(hero_data)
            imgwidth = 50
        })
    }
    else if(type === "peer"){
        [...Array(data.length > 5 ? 5: data.length)].forEach((_,i) => {
            var peer = data[i]
            var peer_data = {account_id: peer.account_id, avatar: peer.avatar, name: peer.personaname, with_games: peer.with_games, with_win: peer.with_win, last_played: peer.last_played}
            table_data.push(peer_data)
            clickable = true
        })
    }
    return (
        <Table sx={{ width: "100%", minWidth: 355 }}>
            <TableHead>
                <StyledTableRow>
                    {headers.map(header => (
                        <StyledTableCell key={header}>
                            <Typography variant="subtitle2" sx={{ fontSize: 12 }}>{header.toUpperCase()}</Typography>
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            </TableHead>
            <TableBody>
                {table_data.map(data => (
                    <StyledTableRow key={data.name} onClick={() => clickable ? navigate(`/profile/${data.account_id}`): undefined} sx={{":hover": {cursor: clickable?"pointer":"auto"}}}>
                        <StyledTableCell sx={{ minWidth: 110, height: 33 }}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ minWidth: 30, marginRight: 2, display: "flex", alignItems: "center" }}>
                                    <img
                                        src={data.avatar}
                                        alt=""
                                        style={{ borderRadius: 2, width: imgwidth, borderRight: "solid" }}
                                    />
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", backgroundCol: "red", height: "100%", width: 80, lineHeight: 1.2 }}>
                                    <Typography variant="caption" sx={{ overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap", color: theme.palette.secondary.light, fontWeight: 500, fontSize: 14 }}>{data.name}</Typography>
                                    <Typography variant="caption">
                                        {UnixTimeDifference(data.last_played)}
                                    </Typography>
                                </Box>
                            </Box>
                        </StyledTableCell>
                        <StyledTableCell sx={{ width: 20 }}>
                            <Typography>
                                {data.with_games}
                            </Typography>
                        </StyledTableCell>
                        <StyledTableCell sx={{ width: 20 }}>
                            <Typography>
                                {Math.round((data.with_win / data.with_games * 10000)) / 100}%
                            </Typography>
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
        </Table>
    );
}