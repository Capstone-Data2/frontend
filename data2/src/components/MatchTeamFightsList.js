import { Typography, Box } from "@mui/material";
import React from "react";
import theme from "../app/theme.js";
import { useDispatch, useSelector } from "react-redux";
import { fill } from '../pages/matchCombat/matchCombatSlice'

export default function TeamFightsList({ teamfights, dire, radiant }) {
    
    const dispatch = useDispatch()
    const selected_team_fight = useSelector((state) => state.teamfight.value);
    
    function getTime(seconds) {
        var minutes = Math.floor(seconds / 60);
        var sec = seconds - minutes * 60;
        if (sec < 10) {
            return (String(minutes) + ':0' + String(sec))
        }
        else {
            return (String(minutes) + ':' + String(sec))
        }

    }

    function clickFight(fight){
        dispatch(fill(fight))
    }
    function listFights(){
        var res = []
        var count = 1
        teamfights.forEach(fight => {
            if(selected_team_fight.start === fight.start){
                res.push(
                    <Box
                    onClick={() => clickFight(fight)}
                    sx={{
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: 2,
                        padding: 2,
                        marginRight: 2,                        
                    }}>
                        
                        <Typography> Start time: {getTime(fight.start)}</Typography>
                        <Typography>Total kills: {fight.deaths}</Typography>
                        
                    </Box>
                )
            }
            else{
                res.push(
                    <Box
                    onClick={() => clickFight(fight)}
                    sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 2,
                        padding: 2,
                        marginRight: 2,
                        ":hover": {
                            cursor: "pointer"
                        }
                    }}>
                        <Typography> Start time: {getTime(fight.start)}</Typography>
                        <Typography>Total kills: {fight.deaths}</Typography>
                        
                    </Box>
                )
            }
            
            count = count + 1
        });
        return res
    }

    return(
        <Box sx={{
            display: 'flex',
            marginTop: 2

            
        }}>
            {listFights()}
        </Box>
    )
}