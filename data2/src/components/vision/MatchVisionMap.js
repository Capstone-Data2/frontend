import { loadMap } from "../common/images";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useSelector } from "react-redux";
export default function VisionWardMap({vision, time, images }) {
    
    function getColor(isRadiant, isObs){
        return isRadiant ? isObs ? '#00FF00' : '#ADD8E6' : isObs ? '#ff0000' : '#ADD8E6'
    }
    function getDimensions(isObs){
        return isObs ? '50px' : '30px'
    }
    function getOffset(isObs){
        return isObs ? 25 : 15
    }
    
    const match_details = useSelector(
        (state) => state.match_details.match_details
    );
    
    const vision_selection = useSelector(
        (state) => state.vision.value
    );

    function makeWard(isRadiant, isObs, x, y, key) {
        var color=getColor(isRadiant, isObs)
        var dimensions = getDimensions(isObs)
        var offset = getOffset(isObs)
        return (
            <Box key ={key} sx={{ left: ((x-offset)*3)-130, bottom: ((y-offset)*3)-140, position: 'absolute' }}>
                <Box sx={{
                    width: dimensions,
                    height: dimensions,
                    backgroundColor: alpha(color, 0.4),
                    borderRadius: 20,
                    position: 'relative'
                }}>
                    <Box sx={{
                        width: '5px',
                        height: '5px',
                        backgroundColor: "black",
                        borderRadius: 20,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        ml: '-2.5px',
                        marginTop: '-2.5px'

                    }}>
                    </Box>
                </Box>
            </Box>
        )
    }

    function getWardDeath(ward_key, isObs, hero_id, start_time){
        var deathTime = 0
        if(isObs){
            var array_of_dead_obs = vision['obs_left_log'][hero_id]
            array_of_dead_obs.forEach(obs => {
                if(obs['key']===ward_key && obs['time']>start_time){
                    deathTime = obs['time']
                }
            });
        }
        else{
            var array_of_dead_sens = vision['sen_left_log'][hero_id]
            array_of_dead_sens.forEach(sens => {
                if(sens['key']===ward_key  && sens['time']>start_time){
                    deathTime = sens['time']
                }
            });
        }
        return deathTime
    }

    function loadWards() {
        var wards = []
        match_details.players.forEach((player, i) => {
            if(vision_selection['obs']['isToggled'][i]){
                var hero_id = player.hero_id
                var array_of_obs = vision['obs_log'][hero_id]
                array_of_obs.forEach(obs => {
                    wards.push({
                        isRadiant: player.is_radiant,
                        x: obs['x'],
                        y: obs['y'],
                        isObs: true,
                        startTime: obs['time'],
                        deathTime: getWardDeath(obs['key'], true, hero_id, obs['time'])
                    })
                });
            }
            if(vision_selection['sentries']['isToggled'][i]){
                var hero_id_sen = player.hero_id
                var array_of_sentries = vision['sen_log'][hero_id_sen]
                array_of_sentries.forEach(sens => {
                    wards.push({
                        isRadiant: player.is_radiant,
                        x: sens['x'],
                        y: sens['y'],
                        isObs: false,
                        startTime: sens['time'],
                        deathTime: getWardDeath(sens['key'], false, hero_id_sen, sens['time'])
                    })
                });
            }
        });
        return wards
        
    }

    function renderWards(array_of_wards, time){
        var response = []
        array_of_wards.forEach((ward, i) => {
            if(time===-1){
                response.push(makeWard(ward.isRadiant, ward.isObs, ward.x, ward.y, i))
            }
            
            else if(ward.deathTime>(time*60) && ward.startTime<(time*60)){
                response.push(makeWard(ward.isRadiant, ward.isObs, ward.x, ward.y, i))
            }
                
        });
        return response
    }
    
    return (
        <Box sx={{ display: "flex", position: "relative", width:400, }}>
            <img src={loadMap(images)} alt="" style={{ borderRadius: 2, width: 400 }} />
            {renderWards(loadWards(), time)}
        </Box>

    )
}