import axios from "axios";

const ip = process.env.REACT_APP_BACKEND_IP;

export async function getMatchesList (selected_rank) {
    var response = {}
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
    await axios
        .get(`${ip}/matches/${match_id}`
        )
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

export async function getMatchCombatData(match_id){
    var response
    await axios
        .get(`http://127.0.0.1:8000/matches/${match_id}/combatdata`)
        .then((res) => {
            response = res.data
        })
        .catch((error) => {
            console.log(error);
        });
    return response
}
export async function getMatchPerformance(match_id){
  var response
  await axios
      .get(`${ip}/matches/${match_id}/performance`)
      .then((res) => {
          response = res.data
      })
      .catch((error) =>{
          console.log(error)
      })
  return response
}