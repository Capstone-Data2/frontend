import React, { useEffect, useState } from "react";
import axios from "axios";
import { fill, select } from "./matchesSlice";
import { useDispatch, useSelector } from "react-redux";
import { ListRankImgs } from "../../common/images";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../app/theme.js";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Wrapper,
  BtnWrapper,
  MatchListTable,
  MatchTypeButton
} from "../../components/MatchList";

export default function MatchesList() {
  const matches = useSelector((state) => state.matches.value);
  const selected_rank = useSelector((state) => state.rank.value);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [page, setPage] = useState(window.location.href.split("/").pop());
  let location = useLocation()
  
  useEffect(() => {
    
    const fetchData = async () => {
      await axios
        .get(`http://127.0.0.1:8000/matches/`, {params: {rank: selected_rank}})
        .then(async (res) => {
          dispatch(fill([res.data.matches, selected_rank]));
        })
        .catch((error) => {
          console.log(error);
        });
    };

    setPage(location.pathname.split("/").pop())
    if(page === "professional"){
      dispatch(select("8"))
    }
    else if (selected_rank === "9"){
      dispatch(select("0"))
    }
    if(matches[1] !== selected_rank){
      fetchData().catch(console.error);
    }
    
  }, [dispatch, location, selected_rank, matches, page]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <BtnWrapper>
          <MatchTypeButton
            type="professional"
            click={() => {
              navigate("/matches/professional")
            }}
            text="Professional"
          />
          <MatchTypeButton
            type="public"
            click={() => {
              navigate("/matches/public")
            }}
            text="Public Matches"
          />
        </BtnWrapper>
        {page === "public" 
          && 
          <Wrapper sx={{width: "40%"}}>
            <ListRankImgs/>
          </Wrapper>
        }
        <MatchListTable type={page} />
      </Wrapper>
    </ThemeProvider>
  );
}
