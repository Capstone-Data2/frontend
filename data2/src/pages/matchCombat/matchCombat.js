import theme from "../../app/theme.js";
import { ThemeProvider } from "@emotion/react";
import {
    Box, Typography, Button
} from "@mui/material";
import MatchDetailsHeader from "../../components/MatchDetailsHeader";
import CombatDamageTable from '../../components/MatchCombatDamageTable';
import TeamDamageTable from '../../components/MatchTeamDamageTable';

import { useSelector, useDispatch } from "react-redux";
import { alpha } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { getMatchLog } from '../../common/api'
import { getMatchCombatData } from '../../common/api'
import TeamFightsList from "../../components/MatchTeamFightsList.js";
import TeamFightTable from "../../components/MatchTeamFightTable.js";
import TeamMapDeaths from '../../components/MatchCombatTeamDeaths.js'
import TeamFightGraph from "../../components/MatchFightGraph.js";

export default function MatchCombat() {
    const match_details = useSelector(
        (state) => state.match_details.match_details
    );
    
    const selected_team_fight = useSelector((state) => state.teamfight.value);
    
    const [log, setLog] = useState({})
    const [combat, setCombat] = useState({})
    const [teamFight, setTeamFight] = useState({})

    function clickButton(){
        if (teamFight === false){
            setTeamFight(true)
        }
        else{
            setTeamFight(false)
        }
    }

    function getButtonName(){
        if(teamFight===false){
            return ('Teamfights')
        }
        else{
            return ('Combat Overview')
        }
    }
    async function fetchData() {
        var res = await getMatchLog(match_details.match_id);
        setLog(res)

        var resCombat = await getMatchCombatData(match_details.match_id)
        setCombat(resCombat)
    }

    useEffect(() => {
        fetchData()
        
    }, [])

    function getPageDetails(){
        if(teamFight===false){
            return(
                <Box>
                    <Typography sx={{marginTop:2}}>{'Kills / Damage'}</Typography>
                    <CombatDamageTable players={teamHeroIds(match_details.picks_bans)} kills={log} match_details={match_details} />
                    <Typography>Radiant</Typography>
                    <TeamDamageTable players ={teamHeroIds(match_details.picks_bans)[0]} combat = {combat} />
                    <Typography>Dire</Typography>
                    <TeamDamageTable players ={teamHeroIds(match_details.picks_bans)[1]} combat = {combat} />
                </Box>
            )
        }

        else{
            return(
            <Box>
                <Typography>Team Fights</Typography>
                <TeamFightsList teamfights={match_details.teamfights}/>
                
                {Object.keys(selected_team_fight).length !== 0 && 
                
                    <Box
                    sx={{
                        flexDirection: 'row',
                        marginTop: 5,
                    }}
                    >   
                        <Box sx={{display: 'flex', width: '100vh', justifyContent: 'space-between', marginBottom: 4}}>
                            <Box>
                                <TeamMapDeaths  playersDead={selected_team_fight.players}/>
                            </Box>
                            <Box>
                                <TeamFightGraph team= {teamHeroIds(match_details.picks_bans)}/>
                            </Box>
                           
                            
                        </Box>
                        
                        <Box
                        sx={{
                            width: 750,
                            
                        }}
                        >
                            <TeamFightTable team={teamHeroIds(match_details.picks_bans)[0]} fight={selected_team_fight} />
                        </Box>
                    
                        <Box
                        sx={{
                            width: 750
                        }}
                        >
                            <TeamFightTable team={teamHeroIds(match_details.picks_bans)[1]} fight={selected_team_fight} />
                        </Box>
                        
                    </Box>
                
                }
               
            </Box>
            )
        }
        
    }

    return (

        <ThemeProvider theme={theme}>
            <MatchDetailsHeader page='combat' />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "start",
                    width: "100%",

                    flexDirection: "column",
                    backgroundColor: alpha(theme.palette.primary.main, 0.6),
                }}
            >
                <Button
                   
                    sx={{
                        marginTop: 3,
                        color: theme.palette.secondary.main,
                        backgroundColor: theme.palette.primary.light
                    }}
                    onClick={() => clickButton()}
                >{getButtonName()}</Button>
                <Box
                    sx={{
                        display: "flex",
                        mt: 2,
                        mx: 2,
                        justifyContent: "start",
                        flexDirection: "column",
                        width: "70%",
                        borderRadius: 2,

                    }}>

                    {(Object.keys(log).length !== 0 && Object.keys(combat).length !== 0) && 
                   
                    <Box>
                        {getPageDetails()}
                    </Box>   
                        
                        
                    
                    }   
                </Box>

            </Box>
        </ThemeProvider>
    )

    function teamHeroIds(picks_bans) {
        let team1 = []
        let team2 = []
        for (let i = 0; i <= picks_bans.length - 1; i++) {
            if (picks_bans[i].is_pick === true) {
                if (picks_bans[i].team === 0) {
                    team1.push(String(picks_bans[i].hero_id));
                }
                else if (picks_bans[i].team === 1) {
                    team2.push(String(picks_bans[i].hero_id));
                }
            }
        }
        return ([team1, team2])
    }
}