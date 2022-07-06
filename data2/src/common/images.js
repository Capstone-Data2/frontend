import React from "react";
import { Box, ImageList, ImageListItem, Radio } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import heroes_json from "../constants/heroes.json";
import theme from "../app/theme";
import { select } from "../pages/matchesList/matchesSlice";

export function importRankImgs() {
  const ranks = importImgs(
    require.context("../constants/rank_icons/", false, /\.(png|jpe?g|svg)$/)
  );
  return ranks;
}

export function importImgs(r) {
  let images = {};
  r.keys().map((item, index) => (images[item.replace("./", "")] = r(item)));
  return images;
}

export function LoadHeroIcons(heroes) {
  var heroes_arr = heroes.split(",");
  const images = importImgs(
    require.context("../constants/hero_icons/big", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <ImageList cols={5} gap={1}>
      {heroes_arr.map((hero) => (
        <ImageListItem sx={{ width: "100%" }} key={hero}>
          <img
            src={images[heroes_json[hero].img]}
            alt={heroes_json[hero].localized_name}
            style={{ borderRadius: 2 }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export function MatchRank(match) {
  var rank = match.avg_rank_tier.toString();
  rank = rank[1] > "5" ? rank[0] + "5" : rank[0] + rank[1];
  var ranks = importRankImgs();
  var img = "SeasonalRank" + rank[0] + "-" + rank[1] + ".png";
  return (
    <Box
      component="img"
      sx={{
        height: 50,
        width: 50,
      }}
      alt={img}
      src={ranks[img]}
    />
  );
}

export function ListRankImgs(){
  const selected_rank = useSelector((state) => state.rank.value);
  const dispatch = useDispatch();

  var ranks = importRankImgs()
  var rank_icons = Object.keys(ranks).filter((rank) => {if(rank.split("-")[1] === "0.png" ){return rank}})

  const handleChange = (event) => {
    dispatch(select(event.target.value))
  };

  return(
    <ImageList cols={9} gap={4}>
      {rank_icons.map((rank) => (
        <ImageListItem sx={{ width: "100%" }} key={rank}>
          <img
            src={ranks[rank]}
            alt={"ranks"}
            style={{ borderRadius: 2 }}
          />
          <Radio
            checked={selected_rank === rank.split("-")[0].split("k")[1]}
            onChange={handleChange}
            value={rank.split("-")[0].split("k")[1]}
            name="radio-buttons"
            inputProps={{ 'aria-label': rank }}
            sx={{

              '&.Mui-checked': {
                color: theme.palette.secondary.main,
              }
            }}
          />
        </ImageListItem>
        
      ))}
    </ImageList>
  );
}


