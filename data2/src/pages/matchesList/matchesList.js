import React, { useEffect, useMemo, useState } from "react";
import { select, fetchMatchesList } from "./matchesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ListRankImgs } from "../../components/common/images";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../app/theme.js";
import { useNavigate, useLocation } from "react-router-dom";
import { CommonBox, MatchListTable } from "../../components/matchesList/MatchList";
import { MatchButton } from "../../components/common/Buttons";
import { Loading } from "../../components/common/loading"
import { importIcons } from "../../functions/getIcons";

export default function MatchesList() {
  const matches = useSelector((state) => state.matches);
  const selected_rank = useSelector((state) => state.rank.value);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [page, setPage] = useState(window.location.href.split("/").pop());
  let location = useLocation();
  const images = useMemo(
    () => importIcons(),
    []
  );

  useEffect(() => {
    setPage(location.pathname.split("/").pop());
    if (page === "professional") {
      dispatch(select("9"));
    } else if (page === "public" && selected_rank === "9") {
      dispatch(select("0"));
    }
    if (matches.selected_rank !== selected_rank) {
      dispatch(fetchMatchesList(selected_rank));
    }
  }, [dispatch, location, selected_rank, matches, page]);

  return (
    <ThemeProvider theme={theme}>
      {matches.loading &&

        <Loading />
      }
      {!matches.loading &&
        <CommonBox
          sx={{
            flexDirection: "column",
            backgroundImage: "linear-gradient(to right, rgb(215, 205, 178), rgb(190, 175, 153));",
            backgroundColor: theme.palette.primary.main,
            height: "100%",
          }}
        >
          <CommonBox
            sx={{
              marginTop: 3,
              marginBottom: 3,
              width: "100%",
            }}
          >
            <MatchButton
              type={page === "professional" ? "main" : "secondary"}
              click={() => {
                navigate("/matches/professional");
              }}
              text="Professional"
            />
            <MatchButton
              type={page === "public" ? "main" : "secondary"}
              click={() => {
                navigate("/matches/public");
              }}
              text="Public Matches"
            />
          </CommonBox>

          {page === "public" && (
            <CommonBox
              sx={{
                flexDirection: "column",
                height: "100%",
                width: "40%",
              }}
            >
              <ListRankImgs images={images} />
            </CommonBox>
          )}
          <MatchListTable type={page} images={images} />
        </CommonBox>
      }
    </ThemeProvider>
  );
}
