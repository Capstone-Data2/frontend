import { ThemeProvider } from "@emotion/react";
import theme from "../../app/theme.js";
import MatchDetailsHeader from "../../components/MatchDetailsHeader";

import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import {
    Box, Typography, Button, Slider
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { fetchMatchDetails } from "../matchOverview/matchDetailsSlice";
import { getMatchVision } from '../../common/api'

import VisionWardMap from "../../components/vision/MatchVisionMap.js";
import VisionTeamTable from '../../components/vision/MatchVisionTeamTable.js';

export default function MatchVision() {
    const dispatch = useDispatch()

    const match_details = useSelector(
        (state) => state.match_details.match_details
    );
    const loading = useSelector((state) => state.match_details.loading);
    const [vision, setVision] = useState({})
    const [time, setTime] = useState({})
    const [id, setId] = useState(window.location.href.split("/")[4]);
    const minutes = Math.floor(match_details.duration / 60);
    
    useEffect(() => {
        async function fetchData() {
            var res = await getMatchVision(match_details.match_id);
            setVision(res)
        }

        setId(window.location.href.split("/")[4])
        if (match_details.match_id !== parseInt(id) && !loading) {
            dispatch(fetchMatchDetails(id));
        }
        if(match_details.match_id === parseInt(id)){
            setTime(-1)
            fetchData()
        }
    }, [match_details, loading, id, dispatch])

    const getValue=(e, data)=>{
        setTime(data)
    }

    return(
        <ThemeProvider theme={theme}>
            <MatchDetailsHeader page='vision' />
            {!loading && match_details.match_id !== 0 && (
                   
                <Box sx={{
                    width: "100%",
                    
                    display: 'flex',
                    backgroundColor: alpha(theme.palette.primary.main, 0.6),
                }}>
                      <Box sx={{
                        width: '35%',
                        backgroundColor: 'red',
                        padding: 2
                      }}>
                        <VisionWardMap  />
                        <h1>asd</h1>
                      </Box>
                      
                      <Box sx={{
                        width: '65%',
                        backgroundColor: 'green'
                      }}>
                        <Slider
                            sx={{width: 200}}
                            size="small"
                            defaultValue={-1}
                            aria-label="Small"
                            valueLabelDisplay="auto"
                            onChangeCommitted={getValue}
                            min={-1}
                            max={minutes}
                        />
                        <h1>asd</h1>
                        <VisionTeamTable isRadiant={true} />
                        <VisionTeamTable isRadiant={false} />
                      </Box>
                      {console.log(time)}
                   </Box>   
                       
                       
                   
            )}   
        </ThemeProvider>
    )
}