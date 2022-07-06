import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fill } from "./matchDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import theme from "../../app/theme.js";
import axios from "axios";
import {
  Box,
  Typography,
} from "@mui/material";
import MatchDetailsHeader from "../../components/MatchDetailsHeader";

export default function MatchOverview() {
  const { id } = useParams();
  const match_details = useSelector((state) => state.match_details.value);
  const dispatch = useDispatch();
  const [page, setPage] = useState(window.location.href.split("/").pop());
  let location = useLocation()


  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`http://127.0.0.1:8000/matches/${id}`)
        .then(async (res) => {
          dispatch(fill(res.data));
        })
        .catch((error) => {
          console.log(error);
        });
    };
    setPage(location.pathname.split("/").pop());
    if (match_details.match_id !== id) {
      fetchData().catch(console.error);
    }
  }, [dispatch, id, match_details.match_id, location]);

  return (
    <ThemeProvider theme={theme}>
      <MatchDetailsHeader page={page}/>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: alpha(theme.palette.primary.main, 0.6),
        }}
      >
        hi
      </Box>
    </ThemeProvider>
  );
}
