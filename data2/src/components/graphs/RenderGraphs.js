import React from "react";
import { Box, Typography } from "@mui/material";
import { NetGoldXPGraph } from "./XPGoldGraph";
import { AllGoldGraph } from "./AllGoldGraph.js";
import { AllXPGraph } from "./AllXPGraph.js";
import { LastHitsGraph } from "./LastHitsGraph";

export function RenderGraphs({ players }) {
    return (
        <Box sx={{ height: 1200, mt: 4, pb: 10 }}>
            <Typography sx={{ ml: 11, mb: 0.2, fontWeight: 600 }}>Radiant Advantage</Typography>
            <Box sx={{ height: "25%" }}>
                <NetGoldXPGraph players={players} />
            </Box>
            <Typography sx={{ ml: 11, mb: 0.2, fontWeight: 600 }}>Gold</Typography>
            <Box sx={{ height: "25%" }}>
                <AllGoldGraph players={players} />
            </Box>
            <Typography sx={{ ml: 11, mb: 0.2, fontWeight: 600 }}>Experience</Typography>
            <Box sx={{ height: "25%" }}>
                <AllXPGraph players={players} />
            </Box>
            <Typography sx={{ ml: 11, mb: 0.2, fontWeight: 600 }}>Last Hits</Typography>
            <Box sx={{ height: "25%" }}>
                <LastHitsGraph players={players} />
            </Box>
        </Box>
    );
}