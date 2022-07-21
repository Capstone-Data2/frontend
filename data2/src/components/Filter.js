import {
    Box,
    Typography,
    Button,
} from "@mui/material";

import { LoadHeroIcons } from "../common/images";
import { useDispatch, useSelector } from "react-redux";

export function Filter({ players, header, click, clear, selected_heroes }) {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    mt: 2,
                    mx: 2,
                    justifyContent: "start",
                    flexDirection: "row",
                    height: '40px',

                }}>
                <Typography sx={{}}>{header}</Typography>
                <Button size='small' variant='outlined'
                    sx={{ marginLeft: "auto", color: 'black', variant: 'outlined' }} onClick={() => clear()}>Clear selections</Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginTop: 2,
                    width: "100%",
                    mx: 2
                }}
            >
                <Box sx={{display: "flex", width: "44%", right: "auto"}}>
                    {loadTeamIcons(players[0])}
                </Box>
                <Box sx={{width: "10%", textAlign: "center"}}>
                    <Typography sx={{ marginRight: 2}}>Versus</Typography>
                </Box>
                <Box sx={{display: "flex", width: "44%", justifyContent: "end"}}>
                    {loadTeamIcons(players[1])}
                </Box>
            </Box>
        </Box>

    );



    function loadTeamIcons(players) {
        var response = [];
        for (let i = 0; i <= players.length - 1; i++) {
            if (selected_heroes.includes(players[i])) {
                response.push(
                    <Box key={i} sx={{ minWidth: 50, maxWidth: 50, marginRight: 2, display: "flex", alignItems: "center", border: 3 }}>
                        <img
                            src={LoadHeroIcons([players[i]])}
                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                            onClick={() => click(players[i])}
                            alt="Hero Icon"
                        />
                    </Box>
                )
            }
            else {
                response.push(
                    <Box key={i} sx={{ minWidth: 50, maxWidth: 50, marginRight: 2, display: "flex", alignItems: "center" }}>
                        <img
                            src={LoadHeroIcons([players[i]])}
                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                            onClick={() => click(players[i])}
                            alt="Hero Icon"
                        />
                    </Box>
                )
            }


        }
        return (response)
    }
}




