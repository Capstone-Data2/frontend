import React, { useEffect, useState } from "react";
import axios from "axios";
import { fill } from "./matchesSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Typography,
  Grid,
  ImageList,
  ImageListItem,
  Divider,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../app/theme.js";
import heroes_json from "../../constants/heroes.json";
import { alpha } from "@mui/material/styles";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProfessionalMatches() {
  const matches = useSelector((state) => state.matches.value);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [redirect_ID, setRedirect_ID] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://127.0.0.1:8000/matches/`)
        .then(async (res) => {
          dispatch(fill(res.data.matches));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData().catch(console.error);
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
        {redirect && (
            <Navigate to={`/match/${redirect_ID}`}/>
        )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: theme.palette.primary.main,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            marginTop: 4,
            marginBottom: 4,
            width: "100%",
          }}
        >
          <Button
            variant="main"
            sx={{ boxShadow: 2 }}
            onClick={async () => {navigate("/matches/professional")}}
          >
            Professional
          </Button>
          <Button
            variant="main"
            color="secondary"
            sx={{ boxShadow: 2 }}
            onClick={async () => {navigate("/matches/public")}}
          >
            Public Matches
          </Button>
        </Box>
        <Grid
          container
          rowSpacing={3}
          columnSpacing={0}
          sx={{
            display: "flex",
            width: "75%",
            height: "90%",
            backgroundColor: theme.palette.primary.light,
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 1,
            paddingRight: 4,
            paddingLeft: 4,
          }}
        >
          <Grid item xs={2} xl={2}>
            <Typography
              variant="subtitle2"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                marginLeft: 4,
              }}
            >
              Match ID
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            xl={2}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="subtitle2">Duration</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            xl={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="subtitle2">Radiant</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            xl={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="subtitle2">Dire</Typography>
          </Grid>
          <Divider variant="middle" sx={{ width: "97%" }} />
          <Grid container spacing={1} sx={{ marginLeft: 2, marginTop: 0.2 }}>
            {matches.map((match, i) => FormRow(match, i, theme))}
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );

  function FormRow(match, i, theme) {
    return (
      <Grid
        container
        onClick={() => {
          setRedirect(true);
          setRedirect_ID(match.match_id);
        }}
        key={match.match_id}
        columnSpacing={3}
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: 0.7,
          marginLeft: 0,
          marginRight: 2.5,
          ":hover": {
            backgroundColor: alpha(theme.palette.primary.dark, 0.2),
            cursor: "pointer",
          },
        }}
      >
        <Grid item xs={2} xl={2}>
          <Typography variant="subtitle1">{match.match_id}</Typography>
          <Typography variant="caption">
            {TimeDifference(match.time_difference)}
          </Typography>
        </Grid>
        <Grid
          item
          xs={2}
          xl={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography>{FormatTime(match.duration)}</Typography>
        </Grid>
        <Grid item xs={4} xl={4}>
          {LoadHeroIcons(match.radiant_team)}
        </Grid>
        <Grid item xs={4} xl={4}>
          {LoadHeroIcons(match.dire_team)}
        </Grid>
        <Divider variant="middle" sx={{ width: "99%" }} />
      </Grid>
    );
  }
}

function FormatTime(totalseconds) {
  const minutes = Math.floor(totalseconds / 60);
  const seconds = totalseconds % 60;
  const result = `${format(minutes)}:${format(seconds)}`;
  return result;

  function format(num) {
    return num.toString().padStart(2, "0");
  }
}

function TimeDifference(time) {
  if (time.includes("day")) {
    return time.split(",")[0] + " ago";
  } else {
    var split = time.split(":");
    if (split[0] === "0") {
      return split[1] + " minutes ago";
    } else {
      if (split[0] === "1") {
        return split[0] + " hour ago";
      } else {
        return split[0] + " hours ago";
      }
    }
  }
}

function importImgs(r) {
  let images = {};
  r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
  return images;
}

function LoadHeroIcons(heroes) {
  var heroes_arr = heroes.split(",");
  const images = importImgs(
    require.context(
      "../../constants/hero_icons/big",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  return (
    <ImageList sx={{ marginBlockStart: 0, marginBlockEnd: 0 }} cols={5} gap={0}>
      {heroes_arr.map((hero) => (
        <ImageListItem sx={{ width: "90%" }} key={hero}>
          <img
            src={images[heroes_json[hero].img]}
            alt={heroes_json[hero].localized_name}
            style={{ borderRadius: 2 }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );

  //console.log(heroes_json[heroes[0]])
}
