import {
    Box,
    CircularProgress,
} from "@mui/material";
import theme from "../app/theme.js";

export function Loading() {
    return (
        <Box
            flexGrow={1}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "91.3vh",
                width: "100wh",
                backgroundColor: theme.palette.primary.main,
            }}
        >
            <CircularProgress sx={{ color: "black" }} />
        </Box>
    );
}
