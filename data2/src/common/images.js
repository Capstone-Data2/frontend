import React from "react";
import {
  Box,
  ImageList,
  ImageListItem,
  Radio,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import heroes_json from "../constants/heroes.json";
import items_json from "../constants/items.json";
import item_ids_json from "../constants/item_ids.json";
import permanent_buffs_json from "../constants/permanent_buffs.json";
import abilities_json from "../constants/abilities.json"
import ability_ids_json from "../constants/ability_ids.json"
import theme from "../app/theme";
import { select } from "../pages/matchesList/matchesSlice";
import BackpackIcon from "@mui/icons-material/Backpack";
import { alpha, styled } from "@mui/material/styles";

export function importRankImgs() {
  const ranks = importImgs(
    require.context("../constants/rank_icons/", false, /\.(png|jpe?g|svg)$/)
  );
  return ranks;
}

export function importAbilityImgs() {
  const abilities = importImgs(
    require.context("../constants/ability_icons/", false, /\.(png|jpe?g|svg)$/)
  );
  return abilities;
}

export function importImgs(r) {
  let images = {};
  r.keys().map((item) => (images[item.replace("./", "")] = r(item)));
  return images;
}

export function LoadHeroIcons(heroes) {
  const images = importImgs(
    require.context("../constants/hero_icons/big", false, /\.(png|jpe?g|svg)$/)
  );
  var srcs = [];
  heroes.forEach((hero) => {
    srcs.push(images[heroes_json[hero].img]);
  });
  return srcs;
}

export function HeroImageList(heroes) {
  var srcs = LoadHeroIcons(heroes.split(","));
  return (
    <ImageList cols={5} gap={1}>
      {srcs.map((src) => (
        <ImageListItem sx={{ width: "100%" }} key={src}>
          <img src={src} style={{ borderRadius: 2 }} />
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

export function ListRankImgs() {
  const selected_rank = useSelector((state) => state.rank.value);
  const dispatch = useDispatch();

  var ranks = importRankImgs();
  var rank_icons = Object.keys(ranks).filter((rank) => {
    if (rank.split("-")[1] === "0.png") {
      return rank;
    }
  });

  const handleChange = (event) => {
    dispatch(select(event.target.value));
  };

  return (
    <ImageList cols={9} gap={4}>
      {rank_icons.map((rank) => (
        <ImageListItem sx={{ width: "100%" }} key={rank}>
          <img src={ranks[rank]} alt={"ranks"} style={{ borderRadius: 2 }} />
          <Radio
            checked={selected_rank === rank.split("-")[0].split("k")[1]}
            onChange={handleChange}
            value={rank.split("-")[0].split("k")[1]}
            name="radio-buttons"
            inputProps={{ "aria-label": rank }}
            sx={{
              "&.Mui-checked": {
                color: theme.palette.secondary.main,
              },
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export function updateAbilityImgs() {
  console.log(Object.keys(abilities_json).length)
  for (const [key, value] of Object.entries(abilities_json)) {
    if (value.img) {
      if (value.dname){
        abilities_json[key].img = value.dname.replace(/ /g, "_") + "_icon.png";
      }
    }
  }
  console.log(abilities_json);
}

export function ItemImageList(player) {
  var items = getItems(player);
  var srcs = LoadItemIcons(items, player);

  return (
    <Box sx={{ minWidth: 240, display: "flex" }}>
      <Box sx={{ width: 130 }}>
        <ImageList
          cols={3}
          gap={1}
          sx={{ marginBlock: 0, paddingInline: 0, maxWidth: 120 }}
        >
          {srcs.active.map((src, i) => (
            <ImageListItem sx={{ width: "60%" }} key={player.hero_id + i}>
              <img
                src={src}
                alt={src}
                style={{ borderRadius: 2, minWidth: 34, maxWidth: 34 }}
              />
            </ImageListItem>
          ))}
        </ImageList>

        {srcs.backpack.length !== 0 && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "start",
              alignItems: "center",
              mt: 1,
            }}
          >
            <BackpackIcon sx={{ width: 20 }} />
            <ImageList cols={3} gap={1} sx={{ marginBlock: 0 }}>
              {srcs.backpack.map((src, i) => (
                <ImageListItem sx={{ width: "70%" }} key={player.hero_id + i}>
                  <img
                    src={src}
                    alt={src}
                    style={{ borderRadius: 2, minWidth: 28, maxWidth: 28 }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", width: 40 }}>
        <svg height="50" width="50">
          <defs>
            <clipPath id="circleView">
              <circle
                cx="20"
                cy="23"
                r="16"
                stroke="black"
                strokeWidth={3}
                fill="none"
              />
            </clipPath>
          </defs>

          <image
            className="img-circle"
            xlinkHref={srcs.neutral}
            alt={srcs.neutral}
            height="46"
            width="46"
            clipPath="url(#circleView)"
          />
        </svg>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: 40,
          flexDirection: "column",
          justifyContent: "center",
          ml: 2,
        }}
      >
        <img
          src={srcs.scepter}
          alt={srcs.scepter}
          style={{ borderRadius: 2, minWidth: 34, maxWidth: 34 }}
        />
        <img
          src={srcs.shard}
          alt={srcs.shard}
          style={{ borderRadius: 2, minWidth: 34, maxWidth: 34 }}
        />
      </Box>
    </Box>
  );
}

function getItems(player) {
  var active = [
    player.item_0,
    player.item_1,
    player.item_2,
    player.item_3,
    player.item_4,
    player.item_5,
  ];
  var neutral = [player.item_neutral];
  var backpack = [player.backpack_0, player.backpack_1, player.backpack_2];
  return { active: active, neutral: neutral, backpack: backpack };
}

function LoadItemIcons(items, player) {
  const images = importImgs(
    require.context("../constants/item_icons", false, /\.(png|jpe?g|svg)$/)
  );
  var active_srcs = [];
  items.active.forEach((item) => {
    if (item !== 0) {
      active_srcs.push(images[items_json[item_ids_json[item]].img]);
    }
  });
  var neutral_srcs = [];
  items.neutral.forEach((item) => {
    if (item !== 0) {
      neutral_srcs.push(images[items_json[item_ids_json[item]].img]);
    }
  });
  var backpack_srcs = [];
  items.backpack.forEach((item) => {
    if (item !== 0) {
      backpack_srcs.push(images[items_json[item_ids_json[item]].img]);
    }
  });
  var scepter = false;
  var shard = false;

  if (items.active.includes(108)) {
    scepter = images["ultimate_scepter_activated.png"];
  } else {
    scepter = images["ultimate_scepter.png"];
  }
  if (player.permanent_buffs.length !== 0) {
    player.permanent_buffs.forEach((buff) => {
      if (buff.permanent_buff === 12) {
        shard = images["aghanims_shard_active.png"];
      } else if (buff.permanent_buff === 2) {
        scepter = images["ultimate_scepter_activated.png"];
      } else {
        shard = images["aghanims_shard.png"];
      }
    });
  } else {
    shard = images["aghanims_shard.png"];
  }
  return {
    active: active_srcs,
    neutral: neutral_srcs,
    backpack: backpack_srcs,
    scepter,
    shard,
  };
}

export function BuffImageList(player) {
  const images = importImgs(
    require.context("../constants/buff_icons", false, /\.(png|jpe?g|svg)$/)
  );
  var buffs = [];
  player.permanent_buffs.forEach((buff) => {
    if (buff.permanent_buff !== 12 && buff.permanent_buff !== 2) {
      var name = permanent_buffs_json[buff.permanent_buff];
      buffs.push({
        permanent_buff: name,
        count: buff.stack_count,
        src: images[name + ".png"],
      });
    }
  });
  return (
    <Box
      sx={{
        display: "flex",
        width: 80,
        justifyContent: "start",
        alignItems: "center",
        mt: 1,
      }}
    >
      {buffs.length !== 0 && (
        <ImageList cols={3} gap={1} sx={{ marginBlock: 0, overflow: "hidden" }}>
          {buffs.map((buff) => (
            <ImageListItem
              sx={{ width: "70%" }}
              key={player.hero_id + buff.permanent_buff}
            >
              <img
                src={buff.src}
                alt={buff.permanent_buff}
                style={{ borderRadius: 2, minWidth: 40, maxWidth: 40 }}
              />
              <Typography
                sx={{
                  position: "absolute",
                  fontWeight: 600,
                  color: "white",
                  right: -10,
                  bottom: -5,
                }}
              >
                {buff.count}
              </Typography>
            </ImageListItem>
          ))}
        </ImageList>
      )}
      {buffs.length === 0 && "-"}
    </Box>
  );
}

export function PicksAndBansList({ picks_bans }) {
  return (
    <Box sx={{ width: "75%", mt: -2 }}>
      <Typography>Picks and Bans</Typography>
      {loadPicks(picks_bans)}
    </Box>
  );
}

function loadPicks(picks_bans) {
  var radiant_picks = [];
  var dire_picks = [];
  var bans = [];
  picks_bans.forEach((pick_ban) => {
    if (pick_ban.is_pick) {
      pick_ban.team === 0
        ? radiant_picks.push(pick_ban.hero_id)
        : dire_picks.push(pick_ban.hero_id);
    } else {
      bans.push(pick_ban.hero_id);
    }
  });

  return (
    <Box
      sx={{
        display: "flex",
        displayDirection: "column",
        width: 1200,
        mt: 1,
        alignItems: "center",
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: 720 }}>
        {loadRadiantPicks(radiant_picks)}
        {loadDirePicks(dire_picks)}
      </Box>
      <Box sx={{ display: "flex", width: 600,  mb: 2, ml: 2 }}>{loadBans(bans)}</Box>
    </Box>
  );
}

function loadRadiantPicks(radiant_picks) {
  var srcs = LoadHeroIcons(radiant_picks);
  return PickImages(640, 255, 255, 120, srcs);
}

function loadDirePicks(dire_picks) {
  var srcs = LoadHeroIcons(dire_picks);
  return PickImages(640, 255, 195, 60, srcs, 16);
}

function PickImages(w1, w2, w3, w4, srcs, mleft = 0) {
  return (
    <Box sx={{ display: "flex", width: w1, mb: 1 }}>
      <Box sx={{ display: "flex", width: w2, ml: mleft }}>
        {PickImage(srcs[0], "Pick 1")}
        {PickImage(srcs[1], "Pick 2")}
      </Box>
      <Box sx={{ display: "flex", width: w3 }}>
        {PickImage(srcs[2], "Pick 3")}
        {PickImage(srcs[3], "Pick 4")}
      </Box>
      <Box sx={{ display: "flex", width: w4 }}>
        {PickImage(srcs[4], "Pick 5")}
      </Box>
    </Box>
  );
}

function loadBans(bans) {
  var srcs = LoadHeroIcons(bans);
  return (
    <Box sx={{ display: "flex", }}>
      {srcs.map((src, i) => PickImage(src, "Ban " + (i + 1)))}
    </Box>
  );
}

function PickImage(src, text) {
  return (
    <Box key={src} sx={{ display: "flex", flexDirection: "column" }}>
      <PickBanImg src={src} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
          backgroundColor: alpha(theme.palette.common.black, 0.7),
          width: 60,
        }}
      >
        <Typography sx={{ color: alpha(theme.palette.common.white, 0.8) }}>
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

const PickBanImg = styled("img")(({ theme, src }) => ({
  borderTopLeftRadius: 4,
  borderTopRightRadius: 4,
  width: 60,
  marginRight: 2,
  backgroundImage: src,
  marginBottom: 0,
}));


export function LoadAbilityIcon(ability){
  var srcs = importAbilityImgs()
  return(
    <Box sx={{ minWidth: 15, maxWidth: 15}}>
      {ability_ids_json[ability].split("_")[0] === "special" && 
        <img
          src={srcs["talent_tree.svg"]}
          style={{ borderRadius: 2, height: 30, border: "solid", borderWidth: 2 }}
        />
      }
      {ability_ids_json[ability].split("_")[0] !== "special" && 
        <img
            src={srcs[abilities_json[ability_ids_json[ability]].img]}
            style={{ borderRadius: 2, width: 30, border: "solid", borderWidth: 2 }}
        />
      }
    </Box>
  );
}