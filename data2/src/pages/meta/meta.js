import React, { useEffect, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../app/theme.js";
import {
  Box,
} from "@mui/material";
import { Loading } from "../../components/common/loading"
import { importIcons } from "../../functions/getIcons"
import { getMetaData } from "../../functions/api.js";
import { CommonBox } from "../../components/matchesList/MatchList.js";
import { MatchButton } from "../../components/common/Buttons.js";
import { useLocation, useNavigate } from "react-router-dom";
import MetaTable from "../../components/meta/MetaTable.js";

export default function Meta() {
  const [hero_stats, setHeroStats] = useState([])
  const [page, setPage] = useState();
  const images = useMemo(
    () => importIcons(),
    []
  );
  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    setPage(location.pathname.split("/").pop());
    async function fetchData() {
      let data = await getMetaData()
      setHeroStats(data)
    }
    if (hero_stats.length === 0) {
      fetchData()
    }
  }, [location, hero_stats.length]);

  return (
    <ThemeProvider theme={theme}>
      {hero_stats.length === 0 &&
        <Loading />
      }
      {hero_stats.length > 0 && (
        <Box sx={{ backgroundColor: theme.palette.primary.light }}>
          <CommonBox
            sx={{
              pt: 3,
              pb: 3,
              width: "100%",
              backgroundColor: theme.palette.primary.main
            }}
          >
            <MatchButton
              type={page === "professional" ? "main" : "secondary"}
              click={() => {
                navigate("/meta/professional");
              }}
              text="Professional"
            />
            <MatchButton
              type={page === "public" ? "main" : "secondary"}
              click={() => {
                navigate("/meta/public");
              }}
              text="Public Matches"
            />
          </CommonBox>
          <Box sx={{ display: "flex", width: "100%", justifyContent: "center", mt: 4 }}>
            <Box sx={{display: "flex", justifyContent:"center", width: "80%", minWidth: 700}}>
              <MetaTable images={images} data={hero_stats} type={page} />
            </Box>
          </Box>
        </Box>
      )}
    </ThemeProvider>
  );
}