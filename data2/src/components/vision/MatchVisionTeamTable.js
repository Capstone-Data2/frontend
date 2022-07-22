import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { LoadHeroIcons } from "../../common/images";
import { loadAbilityImg } from "../../common/images";
import { Box, Table, TableBody, TableHead, TableRow, TableCell, Checkbox } from "@mui/material";

import theme from "../../app/theme.js";
import { togglePlayer, toggleTeam } from "../../pages/matchVision/matchVisionSlice";

export default function VisionTeamTable({ isRadiant }) {
    const match_details = useSelector(
        (state) => state.match_details.match_details
    );
    const dispatch = useDispatch()

    const vision = useSelector(
        (state) => state.vision.value
    );
    var player_index = []
    
    function loadTableHeader(player, index) {
        var res = []
        if (player.is_radiant === isRadiant) {
            player_index.push(index)

            res.push(
                <TableCell key={index}>
                    <img
                        src={LoadHeroIcons([String(player.hero_id)])}
                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                        alt=""
                    />
                </TableCell>
            )
        }
        return res
    }

    function loadCheckIcons(isObs) {
        return (
            [...Array(5)].map((_, i) => (
                
                <TableCell key={i}>
                    <Checkbox
                        checked={vision[isObs ? 'obs' : 'sentries']['isToggled'][isRadiant ? i : i + 5]}
                        sx={{
                            color: 'gray',
                            '&.Mui-checked': {
                                color: 'gray',
                            },
                        }}
                        onChange={() => {
                            dispatch(togglePlayer({
                                method: 'toggle',
                                isObs: isObs,
                                player_index: isRadiant ? i : i + 5
                            }))
                        }}
                    />
                </TableCell>
            ))
        )
    }

    return (
        <Box>
            <Typography>{isRadiant ? 'Radiant' : 'Dire'}</Typography>
            <Table sx={{ width: 500, backgroundColor: theme.palette.primary.main, mb: 4, }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Checkbox
                                checked={vision['team'][isRadiant ? "radiant" : "dire"]}
                                sx={{
                                    color: 'gray',
                                    '&.Mui-checked': {
                                        color: 'gray',
                                    },
                                }}
                                onChange={() => 
                                    dispatch(toggleTeam({
                                        isRadiant: isRadiant,
                                    }))
                                    
                                    ([...Array(5)].map((_, i) => (
                                        dispatch(togglePlayer({
                                            method: vision['team'][isRadiant ? "radiant" : "dire"] ? 'turn_off' : 'turn_on',
                                            isObs: true,
                                            player_index: isRadiant ? i : i + 5
                                        }))
                                    )))
                                }

                            />


                        </TableCell>
                        {match_details.players.map((player, index) => (
                            loadTableHeader(player, index)
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell>
                            <img
                                src={loadAbilityImg('ward_observer')}
                                style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                alt=""
                            />

                        </TableCell>
                        {loadCheckIcons(true)}
                    </TableRow>

                    <TableRow>
                        <TableCell>
                            <img
                                src={loadAbilityImg('ward_sentry')}
                                style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                                alt=""
                            />
                        </TableCell>
                        {loadCheckIcons(false)}
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    )
}