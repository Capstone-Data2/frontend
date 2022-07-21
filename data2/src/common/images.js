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
import abilities_json from "../constants/abilities.json";
import ability_ids_json from "../constants/ability_ids.json";
import theme from "../app/theme";
import { select } from "../pages/matchesList/matchesSlice";
import {
  removeHover,
  setHover,
} from "../pages/matchOverview/matchDetailsSlice";
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

function ImportGameMap() {
  const map = importImgs(
    require.context("../constants/map_icons/", false, /\.(png|jpe?g|svg)$/)
  );
  return map;
}

function ImportHeroMap() {
  const heroes = importImgs(
    require.context("../constants/map_icons/heroes", false, /\.(png|jpe?g|svg)$/)
  );
  return heroes;
}

export function importImgs(r) {
  let images = {};
  r.keys().map((item) => (images[item.replace("./", "")] = r(item)));
  return images;
}

export function importTeamIcons() {
  const team_icons = importImgs(
    require.context("../constants/team_icons/", false, /.(png|jpe?g|svg)$/)
  );
  return team_icons;
}

export function loadTeamIcons(team) {
  var srcs = importTeamIcons()
  return (srcs[team + '_icon.png'])
}

export function LoadHeroIcons(heroes) {
  const images = importImgs(
    require.context("../constants/hero_icons/", false, /\.(png|jpe?g|svg)$/)
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
          <img src={src} alt="" style={{ borderRadius: 2 }} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export function MatchRank(rank) {
  var ranks = importRankImgs();
  rank = rank[1] > "5" ? rank[0] + "5" : rank[0] + rank[1];

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
    return undefined
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
  console.log(Object.keys(abilities_json).length);
  for (const [key, value] of Object.entries(abilities_json)) {
    if (value.img) {
      if (value.dname) {
        abilities_json[key].img = value.dname.replace(/ /g, "_") + "_icon.png";
      }
    }
  }
  console.log(abilities_json);
}

export function ItemImageList(player, transform = 0) {
  var items = getItems(player);
  var srcs = LoadItemIcons(items, player);


  if (transform === 0) {
    return (
      <Box sx={{ minWidth: 240, display: "flex" }}>
        <Box sx={{ width: 130 }}>
          <RenderActive player={player} srcs={srcs.active} />
          <RenderBackpack player={player} srcs={srcs.backpack} />
        </Box>
        <RenderNeutral src={srcs.neutral} />
        <RenderAghs srcs={{ scepter: srcs.scepter, shard: srcs.shard }} />
      </Box>
    );
  }
  else if (transform === 1) {
    return (
      <Box sx={{ minWidth: 240, display: "flex", justifyContent: "end" }}>
        <RenderAghs right={2} srcs={{ scepter: srcs.scepter, shard: srcs.shard }} />
        <RenderNeutral src={srcs.neutral} />
        <Box sx={{ width: 120, display: "flex", flexDirection: "column", alignItems: "end" }}>
          <RenderActive player={player} srcs={srcs.active} />
          <RenderBackpack player={player} srcs={srcs.backpack} align={"end"} />
        </Box>
      </Box>
    );
  }
}

function RenderActive({ player, srcs }) {
  return (
    <ImageList
      cols={3}
      gap={1}
      sx={{ marginBlock: 0, paddingInline: 0, maxWidth: 120 }}
    >
      {srcs.map((src, i) => (
        <ImageListItem sx={{ width: "60%" }} key={player.hero_id + i}>
          <img
            src={src}
            alt={src}
            style={{ borderRadius: 2, minWidth: 34, maxWidth: 34 }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  )
}

function RenderBackpack({ player, srcs, align = "start" }) {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: align,
        alignItems: "center",
        mt: 1,
      }}
    >
      {align === "start" &&
        <BackpackIcon sx={{ width: 20 }} />
      }
      {srcs.length !== 0 && (
        <ImageList cols={3} gap={1} sx={{ marginBlock: 0 }}>
          {srcs.map((src, i) => (
            <ImageListItem sx={{ width: "70%" }} key={player.hero_id + i}>
              <img
                src={src}
                alt={src}
                style={{ borderRadius: 2, minWidth: 28, maxWidth: 28 }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
      {align === "end" &&
        <BackpackIcon sx={{ width: 20 }} />
      }
    </Box>
  )
}

function RenderNeutral({ src }) {
  return (
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
          xlinkHref={src}
          alt={src}
          height="46"
          width="46"
          clipPath="url(#circleView)"
        />
      </svg>
    </Box>
  )
}

function RenderAghs({ srcs, right = 0 }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: 40,
        flexDirection: "column",
        justifyContent: "center",
        ml: 2,
        mr: right
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
  )
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

      <ImageList cols={3} gap={1} sx={{ marginBlock: 0, overflow: "hidden" }}>
        {buffs.length !== 0 &&
          buffs.map((buff) => (
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
          {buffs.length === 0 && "-"}
      </ImageList>
    </Box>
  );
}

export const PicksAndBansList = React.memo(function PicksAndBansList({
  picks_bans,
}) {
  return (
    <Box sx={{ width: "75%", mt: -2 }}>
      <Typography>Picks and Bans</Typography>
      {loadPicks(picks_bans)}
    </Box>
  );
});

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
      <Box sx={{ display: "flex", width: 600, mb: 2, ml: 2 }}>
        {loadBans(bans)}
      </Box>
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
    <Box sx={{ display: "flex" }}>
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

export const LoadAbilityIcon = React.memo(function LoadAbilityIcon({
  ability,
}) {
  const dispatch = useDispatch();
  var srcs = importAbilityImgs();

  return (
    <Box
      sx={{ minWidth: 15, maxWidth: 15 }}
      onMouseLeave={() => dispatch(removeHover())}
    >
      {ability_ids_json[ability].split("_")[0] === "special" && (
        <img
          src={srcs["talent_tree.svg"]}
          style={{
            borderRadius: 2,
            height: 30,
            border: "solid",
            borderWidth: 2,
          }}
          alt=""
          onMouseOver={(event) =>
            dispatch(
              setHover({
                type: "talent",
                hovered: ability,
                location: { x: event.pageX + 30, y: event.pageY },
              })
            )
          }
        />
      )}
      {ability_ids_json[ability].split("_")[0] !== "special" && (
        <img
          src={srcs[abilities_json[ability_ids_json[ability]].img]}
          style={{
            borderRadius: 2,
            width: 30,
            border: "solid",
            borderWidth: 2,
          }}
          alt=""
          onMouseOver={(event) =>
            dispatch(
              setHover({
                type: "ability",
                hovered: ability,
                location: { x: event.pageX + 30, y: event.pageY },
              })
            )
          }
        />
      )}
    </Box>
  );
});

export const GameMap = React.memo(function GameMap({ objectives, players }) {
  var map_srcs = ImportGameMap();
  var hero_srcs = ImportHeroMap()
  var destroyed_obj = []
  objectives.forEach((objective) => {
    if (objective.type === "building_kill") {
      destroyed_obj.push(objective.key);
    }
  });
  return (
    <Box sx={{ display: "flex", position: "relative", width: 300, mb: 4 }}>
      <img src={map_srcs["map_img.png"]} alt="" style={{ borderRadius: 2 }} />
      {renderStructures(map_srcs, destroyed_obj)}
      <RenderHeroes srcs={hero_srcs} players={players} />
    </Box>
  );
});

function renderStructures(srcs, destroyed_obj) {
  var structures = [
    [[45, 135, 205], [27], srcs["badguys_tower.png"], 20, ["npc_dota_badguys_tower1_top", "npc_dota_badguys_tower2_top", "npc_dota_badguys_tower3_top"], [0, 0, 0]],
    [[230, 135, 70], [255], srcs["goodguys_tower.png"], 20, ["npc_dota_goodguys_tower1_bot", "npc_dota_goodguys_tower2_bot", "npc_dota_goodguys_tower3_bot"], [0, 0, 0]],
    [[21], [100, 150, 200], srcs["goodguys_tower.png"], 20, ["npc_dota_goodguys_tower1_top", "npc_dota_goodguys_tower2_top", "npc_dota_goodguys_tower3_top"], [0, 0, 0]],
    [[256], [185, 135, 85], srcs["badguys_tower.png"], 20, ["npc_dota_badguys_tower1_bot", "npc_dota_badguys_tower2_bot", "npc_dota_badguys_tower3_bot"], [0, 0, 0]],
    [[115, 80, 60], [160, 190, 210], srcs["goodguys_tower_angle.png"], 20, ["npc_dota_goodguys_tower1_mid", "npc_dota_goodguys_tower2_mid", "npc_dota_goodguys_tower3_mid"], [0, 0, 0]],
    [[155, 190, 220], [125, 95, 70], srcs["badguys_tower_angle.png"], 20, ["npc_dota_badguys_tower1_mid", "npc_dota_badguys_tower2_mid", "npc_dota_badguys_tower3_mid"], [0, 0, 0]],
    [[18, 30], [215], srcs["goodguys_rax.png"], 15, ["npc_dota_goodguys_melee_rax_top", "npc_dota_goodguys_range_rax_top"], [0, 0]],
    [[60], [252, 264], srcs["goodguys_rax.png"], 15, ["npc_dota_goodguys_melee_rax_bot", "npc_dota_goodguys_range_rax_bot"], [0, 0]],
    [[48, 58], [215, 225], srcs["goodguys_rax_angle.png"], 15, ["npc_dota_goodguys_melee_rax_mid", "npc_dota_goodguys_range_rax_mid"], [0, 0]],
    [[252, 264], [72], srcs["badguys_rax.png"], 15, ["npc_dota_badguys_melee_rax_bot", "npc_dota_badguys_range_rax_bot"], [0, 0]],
    [[220], [22, 34], srcs["badguys_rax.png"], 15, ["npc_dota_badguys_melee_rax_top", "npc_dota_badguys_range_rax_top"], [0, 0]],
    [[225, 235], [58, 68], srcs["badguys_rax_angle.png"], 15, ["npc_dota_badguys_melee_rax_mid", "npc_dota_badguys_range_rax_mid"], [0, 0]],
    [[35, 50], [225, 240], srcs["goodguys_tower.png"], 20, ["npc_dota_goodguys_tower4", "npc_dota_goodguys_tower4"], [0, 0]],
    [[235, 250], [40, 55], srcs["badguys_tower.png"], 20, ["npc_dota_badguys_tower4", "npc_dota_badguys_tower4"], [0, 0]],
    [[23], [240], srcs["goodguys_fort.png"], 30, ["npc_dota_goodguys_fort"], [0]],
    [[250], [27], srcs["badguys_fort.png"], 30, ["npc_dota_badguys_fort"], [0]]
  ]

  structures.forEach(structure => {
    structure[4].forEach((name, i) => {
      destroyed_obj.forEach(obj => {
        if (name === obj) {
          structure[5][i] = 100
        }
      });
    });
  });
  return (
    structures.map((structure, i) => (
      <Box key={i}>
        <RenderStructure structure={structure} />
      </Box>
    ))
  );
}

function RenderStructure(structure) {
  const dispatch = useDispatch();

  return (
    <Box>
      {structure.structure[0].length > structure.structure[1].length &&
        structure.structure[0].map((x, i) => (
          <MapImg
            key={structure.structure[4][i]}
            src={structure.structure[2]}
            width={structure.structure[3]}
            grayscale={structure.structure[5][i]}
            sx={{ left: x, top: structure.structure[1][0] }}
            alt=""
            onMouseOver={(event) =>
              dispatch(
                setHover({
                  type: "tower",
                  hovered: structure.structure[4][i],
                  location: { x: event.pageX + 30, y: event.pageY },
                })
              )
            }
            onMouseLeave={() => dispatch(removeHover())}
          />
        ))}
      {structure.structure[1].length > structure.structure[0].length &&
        structure.structure[1].map((y, i) => (
          <MapImg
            key={structure.structure[4][i]}
            src={structure.structure[2]}
            width={structure.structure[3]}
            grayscale={structure.structure[5][i]}
            sx={{ left: structure.structure[0][0], top: y }}
            alt=""
            onMouseOver={(event) =>
              dispatch(
                setHover({
                  type: "tower",
                  hovered: structure.structure[4][i],
                  location: { x: event.pageX + 30, y: event.pageY },
                })
              )
            }
            onMouseLeave={() => dispatch(removeHover())}
          />
        ))}
      {structure.structure[0].length === structure.structure[1].length &&
        structure.structure[0].map((x, i) => (
          <MapImg
            key={structure.structure[4][i] + i}
            src={structure.structure[2]}
            width={structure.structure[3]}
            grayscale={structure.structure[5][i]}
            sx={{ left: x, top: structure.structure[1][i] }}
            alt=""
            onMouseOver={(event) =>
              dispatch(
                setHover({
                  type: "tower",
                  hovered: structure.structure[4][i],
                  location: { x: event.pageX + 30, y: event.pageY },
                })
              )
            }
            onMouseLeave={() => dispatch(removeHover())}
          />
        ))}
    </Box>
  );
}

const MapImg = styled("img")(({ theme, width, grayscale }) => ({
  position: "absolute",
  width: width,
  filter: `grayscale(${grayscale}%)`,
  ":hover": {
    cursor: "help"
  }
}));

function RenderHeroes({ srcs, players }) {
  const dispatch = useDispatch();
  var x = []
  var y = []
  var all_players = []
  players.radiant.map(player => all_players.push(player))
  players.dire.map(player => all_players.push(player))

  all_players.forEach(player => {
    var new_x_y = []
    if (player.ml_lane_role === 1) {
      new_x_y = player.is_radiant ? [210, 255] : [60, 27]
    }
    if (player.ml_lane_role === 2) {
      new_x_y = player.is_radiant ? [130, 160] : [130, 110]
    }
    if (player.ml_lane_role === 3) {
      new_x_y = player.is_radiant ? [40, 100] : [233, 185]
    }
    if (player.ml_lane_role === 4) {
      new_x_y = player.is_radiant ? [40, 125] : [233, 160]
    }
    if (player.ml_lane_role === 5) {
      new_x_y = player.is_radiant ? [185, 255] : [85, 27]
    }
    x.push(new_x_y[0])
    y.push(new_x_y[1])
  });


  return (
    <Box>
      {all_players.map((player, i) =>
        <MapImg
          key={player.hero_id + 1}
          src={srcs[heroes_json[player.hero_id].icon]}
          width={25}
          grayscale={0}
          sx={{ left: x[i], top: y[i] }}
          onMouseOver={(event) =>
            dispatch(
              setHover({
                type: "hero",
                hovered: player,
                location: { x: event.pageX + 30, y: event.pageY },
              })
            )
          }
          onMouseLeave={() => dispatch(removeHover())}
        />
      )}
    </Box>

  );
}
