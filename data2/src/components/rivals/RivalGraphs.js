import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import theme from "../../app/theme.js";
import { sanitizeGoldXP, sanitizeLastHits, getHeroNames } from './sanitizeRivalGraphs.js';

export function NetGoldXPGraph({ players }) {
  var names = getHeroNames(players)
  var sanitized_data = sanitizeGoldXP(players, names)
  
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
        <Line type="monotone" dataKey={`${names[0]} Gold`} stroke={theme.palette.radiant.main} dot={false}  />
        <Line type="monotone" dataKey={`${names[1]} Gold`} stroke={theme.palette.dire.main} dot={false} />
        <Line type="monotone" dataKey={`${names[0]} XP`} stroke={theme.palette.radiant.text} dot={false} />
        <Line type="monotone" dataKey={`${names[1]} XP`} stroke={theme.palette.dire.dark} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function LastHitsGraph({ players }){
  var names = getHeroNames(players)
  var sanitized_data = sanitizeLastHits(players, names)
  
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
        <Line type="monotone" dataKey={`${names[0]} Last Hits`} stroke={theme.palette.radiant.main} dot={false}  />
        <Line type="monotone" dataKey={`${names[1]} Last Hits`} stroke={theme.palette.dire.main} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
