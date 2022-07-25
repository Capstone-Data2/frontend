import { Typography, Box } from "@mui/material";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';
import { useSelector } from "react-redux";

var xpData = []

export default function TeamFightGraph({ team }) {
    const radiant_team = team[0]
    const dire_team = team[1]

    const match_details = useSelector(
        (state) => state.match_details.match_details
    );
    
    const selected_team_fight = useSelector((state) => state.teamfight.value);
    
    const start_minutes = Math.floor(selected_team_fight.start / 60);
    const end_minutes = Math.floor(selected_team_fight.end / 60)
    
    function getXpStartEnd(){
        var radiantxpStart = 0
        var radiantxpEnd = 0

        var direxpStart = 0
        var direxpEnd = 0
        for(var i=0;i<=selected_team_fight.players.length-1;i++){
            var hero_id = String(match_details.players[i].hero_id)
            var xpStart = selected_team_fight.players[i].xp_start
            var xpEnd = selected_team_fight.players[i].xp_end
            if(radiant_team.includes(hero_id)){
                radiantxpStart = radiantxpStart + parseInt(xpStart)
                radiantxpEnd = radiantxpEnd + parseInt(xpEnd)
            }
            else if(dire_team.includes(hero_id)){
                direxpStart = direxpStart + parseInt(xpStart)
                direxpEnd = direxpEnd + parseInt(xpEnd)
            }
        }
        return [radiantxpStart, radiantxpEnd, direxpStart, direxpEnd]
    }

   function getGoldStartEnd(){
        var radiantGoldStart = 0
        var radiantGoldEnd = 0

        var direGoldStart = 0
        var direGoldEnd = 0
        for(var k =0; k<=match_details.players.length-1;k++){
            var hero_id = String(match_details.players[k].hero_id)
            var goldStart = match_details.players[k].gold_t[start_minutes]
            var goldEnd = goldStart + parseInt(selected_team_fight.players[k].gold_delta)
            
            if(radiant_team.includes(hero_id)){
                radiantGoldStart = radiantGoldStart + parseInt(goldStart)
                radiantGoldEnd = radiantGoldEnd + parseInt(goldEnd)
            }
            else if(dire_team.includes(hero_id)){
                direGoldStart = direGoldStart + parseInt(goldStart)
                direGoldEnd = direGoldEnd + parseInt(goldEnd)
            }

        }
        return [radiantGoldStart, radiantGoldEnd, direGoldStart, direGoldEnd]
    }

    function populateData(array_xp, array_gold){
        var start_radiant_adv = array_xp[0] - array_xp[2]
        var end_radiant_adv = array_xp[1] - array_xp[3]
        var start_radiant_gold_adv = array_gold[0] - array_gold[2]
        var end_radiant_gold_adv = array_gold[1] - array_gold[3]
        xpData=[
            {
                time: start_minutes,
                xp: start_radiant_adv,
                gold: start_radiant_gold_adv
            },
            {
                time: end_minutes,
                xp: end_radiant_adv,
                gold: end_radiant_gold_adv
            }]
        }
    

    return(
        <Box>
            {populateData(getXpStartEnd(), getGoldStartEnd())}
            <Typography>Radiant XP and Gold Advantage</Typography>
            <LineChart width={400} height={400} data={xpData}>
                <Line type="monotone" dataKey="xp" stroke="#8884d8" />
                <Line type="monotone" dataKey="gold" stroke="#A38A00" />
                <XAxis dataKey="time" >
                <Label value="Minutes" offset={0} position="ottom" />
                </XAxis>
                <Label value="any" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" />
            </LineChart>
        </Box>
    )


}