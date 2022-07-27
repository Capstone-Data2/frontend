import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../app/theme.js";
import {
  Box,
  Typography,
} from "@mui/material";
import { Loading } from "../../components/common/loading"
import { importIcons } from "../../functions/getIcons"
import { fetchProfileData } from "./profileSlice.js";
import { alpha } from "@mui/material";
import { MatchRank } from "../../components/common/images.js";
import { RecentMatches } from "../../components/profile/RecentMatches.js";
import { Played } from "../../components/profile/Played.js";
import { useParams } from "react-router-dom";

export default function Profile() {
  const account_id = useParams().id
  const profile = useSelector((state) => state.profile.profile);
  const wl = useSelector((state) => state.profile.wl);
  const peers = useSelector((state) => state.profile.peers);
  const heroes = useSelector((state) => state.profile.heroes);
  const dispatch = useDispatch();
  const images = useMemo(
    () => importIcons(),
    []
  );
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    if ((profile.profile.account_id !== parseInt(account_id) && !loading)) {
      dispatch(fetchProfileData(account_id));
    }
  }, [dispatch, profile, loading, account_id]);

  return (
    <ThemeProvider theme={theme}>
      {loading &&
        <Loading />
      }
      {!loading && profile.profile.account_id !== 0 && (
        <Box>
          <Box sx={{ backgroundColor: theme.palette.primary.main, display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: "flex", pt: 4, width: "60%" }}>
              <Box sx={{ width: "fit", height: "fit" }}>
                <svg height="150" width="150" filter="drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))">
                  <defs>
                    <clipPath id="circleView">
                      <circle
                        cx="56"
                        cy="58"
                        r="56"
                        fill="none"
                      />
                    </clipPath>
                  </defs>

                  <image
                    className="img-circle"
                    xlinkHref={profile.profile.avatarfull}
                    alt={profile.profile.personaname}
                    clipPath="url(#circleView)"
                    width="115"
                  />
                </svg>
              </Box>
              <Box sx={{ width: 250 }}>
                <Box>
                  <Typography variant="h3" sx={{ color: alpha(theme.palette.common.black, 0.7) }}>{profile.profile.personaname}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{}}>WINS</Typography>
                    <Typography variant="h3" sx={{ color: theme.palette.radiant.text }}>{wl.win}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" >LOSSES</Typography>
                    <Typography variant="h3" sx={{ color: theme.palette.dire.main }}>{wl.lose}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" >WINRATE</Typography>
                    <Typography variant="h3">{Math.round((wl.win / (wl.win + wl.lose) * 10000)) / 100}%</Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ ml: "auto" }}>
                {MatchRank(profile.rank_tier.toString(), images, 120, 120)}
              </Box>
            </Box>
          </Box>
          <Box sx={{ backgroundImage: "linear-gradient(to right, rgb(225, 215, 188, 0.7), rgb(215, 205, 178, 0.7));", display: "flex", justifyContent: "center", pt: 2 }}>
            <Box sx={{ width: "90%", display: "flex", justifyContent: "space-between" }}>
              <Box sx={{width: "70%"}}>
                <Typography>Recent Matches</Typography>
                <RecentMatches images={images}/>
              </Box>
              <Box sx={{width: "30%"}}>
                <Typography>Players Played With</Typography>
                <Played type={"peer"} data={peers} images={images}/>
                <Typography sx={{mt: 3}}>Heroes Played With</Typography>
                <Played type={"hero"} data={heroes} images={images}/>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}