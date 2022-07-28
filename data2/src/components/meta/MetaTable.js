import React from "react";
import { Table, TableBody, TableHead, TableSortLabel, TableContainer, Typography, Box } from "@mui/material";
import theme from "../../app/theme";
import { StyledTableCell, StyledTableRow } from "../common/styled";
import { LoadHeroIcons } from "../common/images";
import heroes_json from "../../constants/heroes.json"
import { visuallyHidden } from '@mui/utils';


function MetaTable({ images, data, type }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    var [total_matches, total_immda, total_legarch, total_crugh] = [0, 0, 0, 0]

    var rows = []

    data.forEach(hero => {
        if (type === "professional") {
            total_matches = total_matches + hero.pro_pick
        }
        else if (type === "public") {
            total_matches = total_matches + (hero["1_pick"] + hero["2_pick"] + hero["3_pick"] + hero["4_pick"] + hero["5_pick"] + hero["6_pick"] + hero["7_pick"] + hero["8_pick"])
            total_immda = total_immda + (hero["6_pick"] + hero["7_pick"] + hero["8_pick"])
            total_legarch = total_legarch + (hero["4_pick"] + hero["5_pick"])
            total_crugh = total_crugh + (hero["3_pick"] + hero["2_pick"] + hero["1_pick"])
        }
    });
    total_matches = Math.round(total_matches / 10)
    data.forEach(hero => {
        if (type === "professional" && hero.pro_pick !== 0) {
            rows.push(createData(hero, total_matches, type))
        }
        if (type === "public") {
            rows.push(createData(hero, total_matches, type, total_immda / 10, total_legarch / 10, total_crugh / 10))
        }
    })

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <TableContainer sx={{width: "100%", minWidth: 1100}}>
            <Typography>Sampled from {total_matches} matches</Typography>
            <Table
                sx={{ width: "100%" }}
                aria-labelledby="tableTitle"
            >
                <MetaTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    headCells={type === "professional" ? pro_headers : public_headers}
                />
                <MetaTableBody
                    order={order}
                    orderBy={orderBy}
                    rows={rows}
                    images={images}
                    type={type}
                />
            </Table>
        </TableContainer>
    );
}

function MetaTableHead({ order, orderBy, onRequestSort, headCells }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <StyledTableRow>
                {headCells.map((headCell, i) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sx={{px: headCell.pad === true? 2:0}}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ fontSize: 12 }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </StyledTableRow>
        </TableHead>
    );
}

function MetaTableBody({ order, orderBy, rows, images, type }) {
    return (
        <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
                .map((row, index) => {
                    if (type === "professional") {
                        return (
                            <StyledTableRow
                                tabIndex={-1}
                                key={index}
                                hover
                            >
                                <HeroCell row={row} images={images} width={130} />
                                <StyledTableCell align="right">{row.propb}%</StyledTableCell>
                                <StyledTableCell align="right">{row.prop}%</StyledTableCell>
                                <StyledTableCell align="right">{row.prob}%</StyledTableCell>
                                <StyledTableCell align="right">{row.prow}%</StyledTableCell>
                            </StyledTableRow>
                        );
                    }
                    else if (type === "public") {
                        return (
                            <StyledTableRow
                                hover
                                tabIndex={-1}
                                key={index}
                            >
                                <HeroCell row={row} images={images} width={110} />
                                <StyledTableCell align="right">{row.overallp}%</StyledTableCell>
                                <StyledTableCell align="right">{row.overallw}%</StyledTableCell>
                                <StyledTableCell align="right">{row.immdap}%</StyledTableCell>
                                <StyledTableCell align="right">{row.immdaw}%</StyledTableCell>
                                <StyledTableCell align="right">{row.legarchp}%</StyledTableCell>
                                <StyledTableCell align="right">{row.legarchw}%</StyledTableCell>
                                <StyledTableCell align="right">{row.crughp}%</StyledTableCell>
                                <StyledTableCell align="right">{row.crughw}%</StyledTableCell>
                            </StyledTableRow>
                        );
                    }
                })}
        </TableBody>
    );
}

function HeroCell({ row, images, width }) {
    return (
        <StyledTableCell sx={{ minWidth: 120, height: 33 }}>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ minWidth: 50, maxWidth: 50, marginRight: 2, display: "flex", alignItems: "center" }}>
                    <img
                        src={LoadHeroIcons(row.hero.toString().split(","), images)}
                        alt=""
                        style={{ borderRadius: 2, width: 50, borderRight: "solid" }}
                    />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", backgroundCol: "red", height: "100%", width: width, lineHeight: 1.2 }}>
                    <Typography variant="caption" sx={{ overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: "nowrap", color: theme.palette.secondary.light, fontWeight: 500, fontSize: 14 }}>{heroes_json[row.hero].localized_name}</Typography>
                </Box>
            </Box>
        </StyledTableCell>
    )
}


function getPercent(value, total) {
    return (Math.round((value / total) * 10000) / 100)
}

function createData(hero, total_matches, type, total_immda, total_legarch, total_crugh) {
    if (type === "professional") {
        var propb = getPercent((hero.pro_pick + hero.pro_ban), total_matches)
        var prop = getPercent(hero.pro_pick, total_matches)
        var prob = getPercent(hero.pro_ban, total_matches)
        var prow = getPercent(hero.pro_win, hero.pro_pick)
        var hero = hero.hero_id
        return {
            hero,
            propb,
            prop,
            prob,
            prow,
        };
    }
    else if (type === "public") {
        console.log(total_matches)
        console.log(total_immda)
        console.log(total_legarch)
        console.log(total_crugh)
        var matches = findHeroMatches(hero)
        var overallp = getPercent(matches.pick.overall, total_matches)
        var overallw = getPercent(matches.win.overall, matches.pick.overall)
        var immdap = getPercent(matches.pick.immda, total_immda)
        var immdaw = getPercent(matches.win.immda, matches.pick.immda)
        var legarchp = getPercent(matches.pick.legarch, total_legarch)
        var legarchw = getPercent(matches.win.legarch, matches.pick.legarch)
        var crughp = getPercent(matches.pick.crugh, total_crugh)
        var crughw = getPercent(matches.win.crugh, matches.pick.crugh)
        var hero = hero.hero_id
        return {
            hero,
            overallp,
            overallw,
            immdap,
            immdaw,
            legarchp,
            legarchw,
            crughp,
            crughw
        }
    }

}

function findHeroMatches(hero) {
    var matches = {
        pick: {
            overall: 0,
            crugh: 0,
            legarch: 0,
            immda: 0
        },
        win: {
            overall: 0,
            crugh: 0,
            legarch: 0,
            immda: 0
        }
    }
    var array = [...Array(8)]
    array.forEach((_, i) => {
        if (i > 0) {
            var pick = hero[i + "_pick"]
            var win = hero[i + "_win"]
            matches.pick.overall = matches.pick.overall + pick
            matches.win.overall = matches.win.overall + win
            if (i >= 1 && i <= 3) {
                matches.pick.crugh = matches.pick.crugh + pick
                matches.win.crugh = matches.win.crugh + win
            }
            else if (i >= 4 && i <= 5) {
                matches.pick.legarch = matches.pick.legarch + pick
                matches.win.legarch = matches.win.legarch + win
            }
            else if (i >= 6 && i <= 8) {
                matches.pick.immda = matches.pick.immda + pick
                matches.win.immda = matches.win.immda + win
            }
        }
    });
    return matches
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const pro_headers = [
    {
        id: 'hero',
        numeric: false,
        pad: true,
        label: 'HERO',
    },
    {
        id: 'propb',
        numeric: true,
        pad: false,
        label: 'PRO P+B%',
    },
    {
        id: 'prop',
        numeric: true,
        pad: false,
        label: 'PRO PICK%',
    },
    {
        id: 'prob',
        numeric: true,
        pad: false,
        label: 'PRO BAN%',
    },
    {
        id: 'prow',
        numeric: true,
        pad: true,
        label: 'PRO W%',
    },
];

const public_headers = [
    {
        id: 'hero',
        numeric: false,
        pad: true,
        label: 'HERO',
    },
    {
        id: 'overallp',
        numeric: true,
        pad: false,
        label: 'OVERALL P%',
    },
    {
        id: 'overallw',
        numeric: true,
        pad: false,
        label: 'OVERALL W%',
    },
    {
        id: 'immdap',
        numeric: true,
        pad: false,
        label: 'IMM/DIV/ANC P%',
    },
    {
        id: 'immdaw',
        numeric: true,
        pad: false,
        label: 'IMM/DIV/ANC W%',
    },
    {
        id: 'legarchp',
        numeric: true,
        pad: false,
        label: 'LEGEND/ARCHON P%',
    },
    {
        id: 'legarchw',
        numeric: true,
        pad: false,
        label: 'LEGEND/ARCHON W%',
    },
    {
        id: 'crughp',
        numeric: true,
        pad: false,
        label: 'CRU/GUA/HER P%',
    },
    {
        id: 'crughw',
        numeric: true,
        pad: true,
        label: 'CRU/GUA/HER W%',
    },
];


export default React.memo(MetaTable)