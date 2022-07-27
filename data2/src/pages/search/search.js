import { ThemeProvider } from "@emotion/react";
import theme from "../../app/theme.js";
import {
    Box,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerQuery, postMatch } from "../../functions/api.js";
import { Loading } from "../../components/common/loading.js";
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import { getMatchDetails } from "../../functions/api.js";

export default function Search() {
    let navigate = useNavigate();
    const { query } = useParams()

    const [queries, setQueries] = useState({})
    const [found, setFound] = useState({})
    function getLastPlayed(query) {
        if ('last_match_time' in query) {
            return ('Last Match: ' + String(query.last_match_time).split('T')[0])
        }
        else {
            return ''
        }
    }
    function makeListItems(queries) {
        let res = []
        queries.forEach(query => {
            res.push(
                <ListItem alignItems="flex-start" onClick={() => navigate("/profile/" + query.account_id)}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={query.avatarfull} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={query.personaname}
                        secondary={getLastPlayed(query)}
                    />
                </ListItem>
            )
            res.push(<Divider variant="inset" component="li" />)
        });
        res.pop()
        return res
    }
    function loadPlayerOrMatch(query) {
        if (query.length === 10 && isNaN(query) === false) {
            if(found===false){
                return(
                    <Alert severity="error">The match does not exist or isn't a ranked game.</Alert>
                )
            }
            else{
                return(
                <Alert severity="info">You are being redirected.</Alert>
                )
            }
            
        }
        else {
            return (
                <Box>
                    <Typography
                        sx={{ marginBottom: 1 }}
                    >Player Results</Typography>
                    <List sx={{
                        width: '100%',
                        maxWidth: 360,
                        minWidth: 360,
                        bgcolor: 'background.paper',
                        position: 'relative',
                        overflow: 'auto',
                        maxHeight: 600,
                        '& ul': { padding: 0 },
                        borderRadius: 1
                    }}>
                        {makeListItems(queries)}
                    </List>
                </Box>
            )
        }
    }
    useEffect(() => {
        async function fetchData() {
            var res = await getPlayerQuery(query);
            setQueries(res)
            if (query.length === 10 && isNaN(query) === false) {
                res = await getMatchDetails(query)
                if(res === 'Match Not Found'){
                    res = await postMatch(query)
                    if(res === 'Error with the match'){
                        setFound(false)
                    }
                    else if(res === undefined){
                        setFound(false)
                    }
                    else{
                        setFound(true)
                        navigate('/matches/'+query+'/overview')
                    }
                }
                else{
                    setFound(true)
                    navigate('/matches/'+res.match_id+'/overview')
                }
            }
        }
        fetchData()
    }, [query, navigate])

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{
                width: '100%',
                backgroundColor: theme.palette.primary.main,
                height: '91vh',
                display: "flex",
                justifyContent: "center",

            }}>
                {(Object.keys(queries).length) === 0 && (
                    <Loading />

                )}
                {Object.keys(queries).length !== 0 && (
                    <Box sx={{
                        marginTop: 7,
                    }}>
                        {loadPlayerOrMatch(query)}

                    </Box>
                )}

            </Box>
        </ThemeProvider>
    )
}