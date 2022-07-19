import axios from "axios";

const ip = process.env.REACT_APP_BACKEND_IP;

export async function getMatchesList (selected_rank) {
    var response = {}
    console.log(ip)
    await axios
      .get(`${ip}/matches/`, {
        params: { rank: selected_rank },
      })
      .then(async (res) => {
        response = {match_list: res.data.matches, rank: selected_rank}
      })
      .catch((error) => {
        console.log(error);
      });
    return response
  };

export async function getMatchDetails(match_id){
    var response
    console.log(ip)
    await axios
        .get(`${ip}/matches/${match_id}`)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            console.log(error);
        });
    return response
}

export async function getMatchLog(match_id){
    var response
    await axios
        .get(`${ip}/matches/${match_id}/log`)
        .then((res) => {
            response = res.data
        })
        .catch((error) =>{
            console.log(error)
        })
    return response
}