import { ThemeProvider } from "@emotion/react";
import theme from "../../app/theme.js";
import {
    Box, Typography,
} from "@mui/material";
import heroes_json from "../../constants/heroes.json"
import React, { useState, useMemo } from "react";
import { importIcons } from "../../functions/getIcons.js";
import { LoadHeroIcons } from "../../components/common/images.js";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


export default function TeamBuilder() {
    const images = useMemo(
        () => importIcons(),
        []
    );
    const [radiantSelect, setRadiant] = useState('')
    const [direSelect, setDire] = useState('')
    const [heroclicked, setClick] = useState('')
    const [open, setOpen] = React.useState(false);


    function clickHero(hero_id) {
        setClick(hero_id)
        setOpen(true)
    }
    function checkDoublesandLimit(selection, hero_id) {
        var array_selection = selection.split(',')
        if (array_selection.length === 5) {
            return false
        }
        else if (array_selection.includes(String(hero_id))) {
            return false
        }
        else {
            return true
        }
    }
    function checkDoublesInTeams(hero_id, isRadiant) {
        var radiant_array = radiantSelect.split(',')
        var dire_array = direSelect.split(',')
        if (isRadiant) {
            if (dire_array.includes(String(hero_id))) {
                return false
            }
            else {
                return true
            }
        }
        else {
            if (radiant_array.includes(String(hero_id))) {
                return false
            }
            else {
                return true
            }
        }
    }

    function clickTeam(hero_id, isRadiant) {
        if (isRadiant) {
            if (radiantSelect === '' && checkDoublesInTeams(hero_id, isRadiant)) {
                setRadiant(String(hero_id))
            }
            else {
                if (checkDoublesandLimit(radiantSelect, hero_id) && checkDoublesInTeams(hero_id, isRadiant)) {
                    setRadiant(radiantSelect + ',' + hero_id)
                }
            }
        }
        else {
            if (direSelect === '' && checkDoublesInTeams(hero_id, isRadiant)) {
                setDire(String(hero_id))
            }
            else {
                if (checkDoublesandLimit(direSelect, hero_id) && checkDoublesInTeams(hero_id, isRadiant)) {
                    setDire(direSelect + ',' + hero_id)
                }
            }

        }
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false);
    };

    function loadHeroes() {
        var response = []
        var count = 0
        for (const key in heroes_json) {
            response.push(
                <img
                    key = {count}
                    src={LoadHeroIcons([String(heroes_json[key].id)], images)}
                    style={{ borderRadius: 2, width: 50, borderRight: "solid", borderColor: 'black', marginTop: 8, marginLeft: 8, marginRight: 8 }}
                    alt="Hero"
                    onClick={() => clickHero(heroes_json[key].id)}

                />
            )
            count = count +1
        }
        return response
    }

    function loadPopup() {
        if (heroclicked !== '') {
            return (
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>
                        {heroes_json[String(heroclicked)].localized_name}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => clickTeam(heroclicked, true)}>Radiant</Button>
                        <Button onClick={() => clickTeam(heroclicked, false)}>Dire</Button>
                    </DialogActions>
                </Dialog>
            )
        }

    }

    function removeHero(hero_id, isRadiant) {
        var array = []
        isRadiant ? array = radiantSelect.split(',') : array = direSelect.split(',')
        const index = array.indexOf(String(hero_id));
        if (index > -1) {
            array.splice(index, 1);
        }
        isRadiant ? setRadiant(array.join(',')) : setDire(array.join(','))
    }

    function loadTeams(heroes, isRadiant) {
        var res = []
        
        if (heroes !== '') {
            (heroes.split(',')).forEach((hero, i) => {
                res.push(
                    <Box key ={i}>
                        <img
                            
                            src={LoadHeroIcons([String(hero)], images)}
                            style={{ borderRadius: 2, width: 50, borderRight: "solid", borderColor: 'black', marginTop: 8, marginLeft: 8, marginRight: 8 }}
                            alt="Hero"
                            onClick={() => removeHero(hero, isRadiant)}
                        />
                    </Box>
                )
            });
        }
        return res
    }

    function getStats(isRadiant) {
        if ((isRadiant && radiantSelect.length !== 0) || (!isRadiant && direSelect.length !== 0)) {
            var heroes = ''
            var stats = { 'Carry': 0, 'Support': 0, 'Nuker': 0, 'Disabler': 0, 'Jungler': 0, 'Durable': 0, 'Escape': 0, 'Pusher': 0, 'Initiator': 0 }
            isRadiant ? heroes = radiantSelect : heroes = direSelect
            heroes.split(',').forEach(hero => {
                var array_of_roles = heroes_json[String(hero)].roles
                array_of_roles.forEach(role => {
                    stats[role] = stats[role] + 1
                });
            });
        }

        return stats
    }

    function renderDots(count) {
        var dots = []
        for (var i = 0; i <= count - 1; i++) {
            dots.push(
                <Box key={i}sx={{ width: 10, height: 10, backgroundColor: 'black', marginRight: 1 }}>

                </Box>
            )
        }
        for (var j = count; j <= 4; j++) {
            dots.push(
                <Box key ={j}sx={{ width: 9, height: 9, border: 1, borderColor: 'black', marginRight: 1 }}>

                </Box>
            )
        }
        return dots
    }
    function loadStats(stats) {
        var res = []
        var count = 0
        for (const key in stats) {
            res.push(
                <Box key={count} sx={{ marginTop: 1 }}>
                    <Box>
                        {key}
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        {renderDots(stats[key])}
                    </Box>

                </Box>
            )
            count = count +1
        }
        return res
    }

    function stats(isRadiant) {
        var stats = getStats(isRadiant)
        return (
            <Box>
                {loadStats(stats)}
            </Box>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                width: '100%',
                backgroundColor: theme.palette.primary.main,
                height: '91vh',
            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: 'center',
                }}>
                    <Box sx={{
                        width: 220,
                        height: 300,
                        backgroundColor: '',
                        marginRight: 5,
                        marginLeft: 5,
                        marginTop: 5
                    }}>

                        {stats(true)}
                    </Box>
                    <Box sx={{
                        marginRight: 5,
                        marginTop: 20,
                    }}>
                        <Typography>Radiant</Typography>
                        <Box sx={{
                            width: 500,
                            height: 50,
                            marginRight: 5,

                            display: 'flex',
                            justifyContent: "center",
                            border: 1,
                            borderRadius: 1,
                            borderColor: theme.palette.radiant.dark,
                        }}>

                            {loadTeams(radiantSelect, true)}
                        </Box>
                    </Box>
                    <Box sx={{
                        marginLeft: 5,
                        marginTop: 20,
                    }}>

                        <Typography>Dire</Typography>
                        <Box sx={{
                            width: 500,
                            height: 50,


                            display: 'flex',
                            justifyContent: "center",
                            border: 1,
                            borderRadius: 1,
                            borderColor: theme.palette.dire.dark,
                        }}>
                            {loadTeams(direSelect, false)}
                        </Box>
                    </Box>

                    <Box sx={{
                        width: 220,
                        height: 300,
                        backgroundColor: '',
                        marginLeft: 5,
                        marginRight: 5,
                        marginTop: 5,

                    }}>

                        {stats(false)}
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: 'center',
                }}>


                    <Box
                        sx={{
                            width: '75%',
                            backgroundColor: '',
                            marginTop: 15,
                            height: 400,
                        }}
                    >

                        {loadHeroes()}
                        {loadPopup()}
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    )
}