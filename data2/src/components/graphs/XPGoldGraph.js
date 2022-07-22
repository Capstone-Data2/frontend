import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, } from 'recharts';
import theme from "../../app/theme.js";
import { alpha } from '@mui/material';

export function NetGoldXPGraph({ players }) {
    var sanitized_data = sanitizeGoldXP(players)
    return (
        <ResponsiveContainer width="100%" height="80%">
            <LineChart
                data={sanitized_data}
                label={{value:"Pages of my website", position:"insidetop"}}
                margin={{
                    right: 30,
                    left: 30,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name"/>
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <ReferenceLine y={0} stroke="black" strokeWidth={2} />
                <Line type="monotone" dataKey="Gold" stroke="gold" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Experience" stroke={theme.palette.status.blue} strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        var gold_color = payload[0].payload["leader_gold"] === "Radiant" ? theme.palette.radiant.main: theme.palette.dire.main
        var xp_color = payload[0].payload["leader_xp"] === "Radiant" ? theme.palette.radiant.main: theme.palette.dire.main
        return (
            <Paper sx={{ display: "flex", flexDirection: "column", width: 200, backgroundColor: alpha(theme.palette.common.black, 0.8), p: 1 }}>
                <Typography sx={{color: "white"}}>{label}</Typography>
                <Box sx={{ display: "flex" }}>
                    <Typography sx={{color: gold_color}}>{`${payload[0].payload["leader_gold"]}:`}&nbsp;</Typography>
                    <Typography sx={{color: "gold"}}> {`${Math.abs(payload[0].value)}  ${payload[0].dataKey}`}</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                    <Typography sx={{color: xp_color}}> {`${payload[1].payload["leader_xp"]}:`}&nbsp;</Typography>
                    <Typography sx={{color: theme.palette.status.blue}}> {`${Math.abs(payload[1].value)} ${payload[1].dataKey}`}</Typography>
                </Box>
            </Paper>
        );
    }
    return null;
};


function sanitizeGoldXP(players) {
    var data = []
    var array = [...Array(players.radiant[0].gold_t.length)]
    array.forEach((_, i) => {
        var radiant_gold = 0
        var radiant_xp = 0
        var dire_gold = 0
        var dire_xp = 0
        players.radiant.forEach(player => {
            radiant_gold = radiant_gold + player.gold_t[i]
            radiant_xp = radiant_xp + player.xp_t[i]
        });
        players.dire.forEach(player => {
            dire_gold = dire_gold + player.gold_t[i]
            dire_xp = dire_xp + player.xp_t[i]
        });

        var radiant_gold_delta = radiant_gold - dire_gold
        var radiant_xp_delta = radiant_xp - dire_xp

        var leader_gold = radiant_gold_delta > 0 ? "Radiant" : "Dire"
        var leader_xp = radiant_xp_delta > 0 ? "Radiant" : "Dire"


        data.push({
            name: i+":00",
            Gold: radiant_gold_delta,
            Experience: radiant_xp_delta,
            leader_gold: leader_gold,
            leader_xp: leader_xp
        })
    });
    return data
}