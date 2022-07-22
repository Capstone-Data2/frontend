import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, } from 'recharts';
import { findHeroNames, CustomTooltip } from '../../common/graphs.js';

export function LastHitsGraph({ players }) {
    var heroes = findHeroNames(players)
    var sanitized_data = sanitizeLastHits(players, heroes)
    return (
        <ResponsiveContainer width="100%" height="80%">
            <LineChart
                data={sanitized_data}
                label={{ value: "Pages of my website", position: "insidetop" }}
                margin={{
                    right: 30,
                    left: 30,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip heroes={heroes}/>} />
                <Legend />
                <ReferenceLine y={0} stroke="black" strokeWidth={2} />
                {heroes.map((hero, i) => (
                    <Line key={i} type="monotone" dataKey={hero.name} stroke={hero.color} dot={false} />

                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

function sanitizeLastHits(players, heroes) {
    var data = []
    var array = [...Array(players.radiant[0].lh_t.length)]
    array.forEach((_, i) => {
        let hero_data = {}
        heroes.forEach(hero => {
            hero_data[hero.name] = hero.lh_t[i]
        })
        data.push({
            name: i + ":00",
            ...hero_data
        })
    });
    return data
}