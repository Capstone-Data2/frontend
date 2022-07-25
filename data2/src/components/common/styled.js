import { alpha, styled } from "@mui/material/styles";
import {
    TableCell,
    tableCellClasses,
    TableRow,
} from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: alpha(theme.palette.primary.dark, 0.8),
    },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    transition: theme.transitions.create(["background-color"]),
    "&:last-child td, &:last-child th": {
        border: 0,
    },
    "&:hover": {
        backgroundColor: "#FFD97F",
    },
}));