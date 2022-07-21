import {
    Box,
    Typography,
    Button,
} from "@mui/material";

import { LoadHeroIcons } from "../common/images";
import { useDispatch, useSelector } from "react-redux";
import { toggle, clear } from '../pages/matchLog/matchLogSlice'

export function MatchLogFilter({ players }) {
    const dispatch = useDispatch()
    const selected_heros = useSelector((state) => state.filter.value);

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
                <Typography sx={{}}>Match Filter</Typography>
                <Button size='small' variant='outlined'
                    sx={{ marginLeft: "auto", color: 'black', variant: 'outlined' }} onClick={() => clearSelection()}>Clear selections</Button>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    mx: 10,
                    marginTop: 2,
                }}
            >

                {loadTeamIcons(players[0])}
                <Typography sx={{ marginRight: 2 }}>Verses</Typography>
                {loadTeamIcons(players[1])}
            </Box>
        </Box>

    );

    function clicked(hero) {
        dispatch(toggle(hero))
    }

    function clearSelection() {
        dispatch(clear())
    }

    function loadTeamIcons(players) {
        var response = [];
        for (let i = 0; i <= players.length - 1; i++) {
            if (selected_heros.includes(players[i])) {
                response.push(
                    <Box key={i} sx={{ minWidth: 50, maxWidth: 50, marginRight: 2, display: "flex", alignItems: "center", border: 3 }}>
                        <img
                            src={LoadHeroIcons([players[i]])}
                            style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                            onClick={() => clicked(players[i])}
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
                            onClick={() => clicked(players[i])}
                            alt="Hero Icon"
                        />
                    </Box>
                )
            }


        }
        return (response)
    }
}




