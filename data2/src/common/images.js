import React from "react";
import { Box, ImageList, ImageListItem, Radio } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import heroes_json from "../constants/heroes.json";
import items_json from "../constants/items.json";
import item_ids_json from "../constants/item_ids.json"
import theme from "../app/theme";
import { select } from "../pages/matchesList/matchesSlice";
import BackpackIcon from '@mui/icons-material/Backpack';

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
  var srcs = []
  heroes_arr.forEach(hero => {
    srcs.push(images[heroes_json[hero].img])
  });
  return srcs
}

export function HeroImageList(heroes) {
  var srcs = LoadHeroIcons(heroes)
  return (
    <ImageList cols={5} gap={1}>
      {srcs.map((src) => (
        <ImageListItem sx={{ width: "100%" }} key={src}>
          <img
            src={src}
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


export function updateItemImgs(){
  console.log(Object.keys(items_json).length)

  for(const [key, value] of Object.entries(items_json)){
    if(value.dname)
    {
      items_json[key].img = value.dname.replace(/ /g, "_")+"_icon.png"
    }
  }
  console.log(items_json)
}

export function ItemImageList(player){
  var items = getItems(player)
  var srcs = LoadItemIcons(items)
  return (
    <Box sx={{minWidth: 240, display: "flex"}}>
      <Box sx={{ width: 150}}>
        <ImageList cols={3} gap={1} sx={{marginBlock: 0, paddingInline: 0, maxWidth: 120,}}>
          {srcs.active.map((src, i) => (
            <ImageListItem sx={{ width: "60%" }} key={player.hero_id+i}>
              <img
                src={src}
                alt={src}
                style={{ borderRadius: 2, minWidth: 34, maxWidth: 34}}
              />
            </ImageListItem>
          ))}
        </ImageList>

      {srcs.backpack.length !== 0 &&
        <Box sx={{display: "flex", width: "70%", justifyContent: "start", alignItems: "center", mt: 1}}>
          <BackpackIcon sx={{width: "10%"}}/>
          <ImageList cols={3} gap={1} sx={{marginBlock: 0}}>
          {srcs.backpack.map((src, i) => (
            <ImageListItem sx={{ width: "70%" }} key={player.hero_id+i}>
              <img
                src={src}
                alt={src}
                style={{ borderRadius: 2, minWidth: 34, maxWidth: 34 }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      }
      </Box>
      <Box sx={{display:"flex", alignItems: "center", width: 40}}>
        <svg height="50" width="50">
          <defs>
            <clipPath id="circleView">
              <circle cx="20" cy="23" r="16" stroke="black" stroke-width="3" fill="none"/>
            </clipPath>
          </defs>
          
          <image
            className="img-circle"
            xlinkHref={srcs.neutral}
            alt={srcs.neutral}
            height="46" width="46"
            clip-path="url(#circleView)"
          />
        </svg>
      </Box>
    </Box>
  );
}

function getItems(player){
  var active = [player.item_0, player.item_1, player.item_2, player.item_3, player.item_4, player.item_5]
  var neutral = [player.item_neutral]
  var backpack = [player.backpack_0, player.backpack_1, player.backpack_2]
  return {active: active, neutral: neutral, backpack: backpack}
}

function LoadItemIcons(items){
  const images = importImgs(
    require.context("../constants/item_icons", false, /\.(png|jpe?g|svg)$/)
  );
  var active_srcs = []
  items.active.forEach(item => {
    if(item !== 0){
      active_srcs.push(images[items_json[item_ids_json[item]].img])
    }
  });
  console.log(active_srcs)
  console.log("------")
  var neutral_srcs = []
  items.neutral.forEach(item => {
    if(item !== 0){
      neutral_srcs.push(images[items_json[item_ids_json[item]].img])
    }
  });
  var backpack_srcs = []
  items.backpack.forEach(item => {
    if(item !== 0){
      backpack_srcs.push(images[items_json[item_ids_json[item]].img])
    }
  });
  return {active: active_srcs, neutral: neutral_srcs, backpack: backpack_srcs}
}