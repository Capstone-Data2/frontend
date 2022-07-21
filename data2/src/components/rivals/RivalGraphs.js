import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import theme from "../../app/theme.js";

export function NetGoldXPGraph({ players }) {
  var sanitized_data = sanitizeGoldXP(players)
  return (
    <ResponsiveContainer width="100%" height="40%">
      <LineChart
        data={sanitized_data}
        margin={{
          right: 15,
          left: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Radiant Gold" stroke={theme.palette.radiant.main} dot={false}  />
        <Line type="monotone" dataKey="Dire Gold" stroke={theme.palette.dire.main} dot={false} />
        <Line type="monotone" dataKey="Radiant XP" stroke={theme.palette.radiant.text} dot={false} />
        <Line type="monotone" dataKey="Dire XP" stroke={theme.palette.dire.dark} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function LastHitsGraph({ players }){
  var sanitized_data = sanitizeLastHits(players)
  return (
    <ResponsiveContainer width="100%" height="40%">
      <LineChart
        data={sanitized_data}
        margin={{
          right: 15,
          left: 15,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Radiant Last Hits" stroke={theme.palette.radiant.main} dot={false}  />
        <Line type="monotone" dataKey="Dire Last Hits" stroke={theme.palette.dire.main} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function sanitizeGoldXP(players){
  var data = []
  var array = [...Array(players[0].gold_t.length)]
  array.forEach((_, i) => {
    data.push({
      name: i,
      "Radiant Gold": players[0].gold_t[i],
      "Dire Gold": players[1].gold_t[i],
      "Radiant XP": players[0].xp_t[i],
      "Dire XP": players[1].xp_t[i],
    })
  });
  return data
}

function sanitizeLastHits(players){
  var data = []
  var array = [...Array(players[0].lh_t.length)]
  array.forEach((_, i) => {
    data.push({
      name: i,
      "Radiant Last Hits": players[0].lh_t[i],
      "Dire Last Hits": players[1].lh_t[i],
    })
  });
  return data
}