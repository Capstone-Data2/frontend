import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, } from 'recharts';
import { CustomTooltip } from '../common/graphs.js';
import { findHeroNames } from '../../functions/players.js';
import { sanitizeGraph } from '../../functions/sanitizeGraph.js';

export function AllXPGraph({ players }) {
    var heroes = findHeroNames(players)
    var sanitized_data = sanitizeGraph(players, heroes, "xp_t")
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