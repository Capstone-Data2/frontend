import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import theme from "../../app/theme.js";
import heroes_json from "../../constants/heroes.json"

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

function sanitizeGoldXP(players, names){
  var data = []
  var array = [...Array(players[0].gold_t.length)]
  array.forEach((_, i) => {
    data.push({
      name: i,
      [`${names[0]} Gold`]: players[0].gold_t[i],
      [`${names[1]} Gold`]: players[1].gold_t[i],
      [`${names[0]} XP`]: players[0].xp_t[i],
      [`${names[1]} XP`]: players[1].xp_t[i],
    })
  });
  return data
}

function sanitizeLastHits(players, names){
  var data = []
  var array = [...Array(players[0].lh_t.length)]
  array.forEach((_, i) => {
    data.push({
      name: i,
      [`${names[0]} Last Hits`]: players[0].lh_t[i],
      [`${names[1]} Last Hits`]: players[1].lh_t[i],
    })
  });
  return data
}

function getHeroNames(players){
  var rad_name = heroes_json[players[0].hero_id].localized_name
  var dire_name = heroes_json[players[1].hero_id].localized_name
  return [rad_name, dire_name]
}