import { Typography, Box } from "@mui/material";
import { loadMap }from "../common/images";
import { loadSmallHeroIcon } from "../common/images";
import { useSelector } from "react-redux";
import heroes_json from "../../constants/heroes.json";
import { MapImg } from "../common/images";
export default function TeamMapDeaths({ playersDead }) {
    const match_details = useSelector(
        (state) => state.match_details.match_details
    );
    
    
    function loadHeroesDead(){
        var i = 0
        var res = []
        playersDead.forEach((player, j) => {
            if(Object.keys(player.deaths_pos).length !== 0){
                Object.keys(player.deaths_pos).forEach(death => {
                    var hero_id = match_details.players[i].hero_id
                    var imgsrc = heroes_json[String(hero_id)].icon
                    var x_coordinate = death
                    var y_coordinate = Object.keys(player.deaths_pos[death])
                    res.push(
                        <Box key={j} sx={{left: parseInt(x_coordinate) , top: parseInt(y_coordinate), position: 'absolute'}}>
                            <MapImg
                                width={25}
                                grayscale={0}
                                src={loadSmallHeroIcon(imgsrc)}
                    
                             />
                        </Box>  
                    )
                });
                
               
            }
            i = i+1
        });
        return res
    }
    return(
        <Box>
            <Typography>Hero Deaths</Typography>
            <Box sx={{ display: "flex", position: "relative", width: 300, mb: 4 }}>
                
                <img src={loadMap()} alt="" style={{ borderRadius: 2 }} />
                {loadHeroesDead()}      
            </Box>
        </Box>
    )
}